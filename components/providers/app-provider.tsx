"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";

import { EMPTY_APP_STATE } from "@/lib/services/demo-data";
import { getWeeklyBriefing } from "@/lib/services/dashboard";
import { getReadableFirebaseError } from "@/lib/services/firebase-errors";
import {
  getReadableAuthError,
  logInWithEmailPassword,
  logOut,
  signUpWithEmailPassword,
  subscribeToAuthState
} from "@/lib/services/auth";
import { uploadDocumentRecord, subscribeToDocuments } from "@/lib/services/documents";
import { createHouseholdSetup, subscribeToHousehold, subscribeToHouseholdMembers } from "@/lib/services/households";
import { createItemRecord, markItemCompleteRecord, subscribeToItems, updateItemRecord } from "@/lib/services/items";
import { buildUserProfile, subscribeToUserProfile } from "@/lib/services/users";
import { AppState, DocumentFormInput, HouseholdType, Item, ItemFormInput, User } from "@/types";

interface AppContextValue {
  state: AppState;
  ready: boolean;
  authResolved: boolean;
  profileResolved: boolean;
  isAuthenticated: boolean;
  hasHousehold: boolean;
  firebaseUser: FirebaseUser | null;
  error: string | null;
  weeklyBriefing: ReturnType<typeof getWeeklyBriefing>;
  login: (email: string, password: string) => Promise<void>;
  signup: (input: { fullName: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  createHousehold: (input: {
    householdName: string;
    householdType: HouseholdType;
    inviteEmail?: string;
    selectedTemplateGroups: string[];
  }) => Promise<void>;
  createItem: (input: ItemFormInput) => Promise<void>;
  updateItem: (itemId: string, updates: Partial<Item>) => Promise<void>;
  markItemComplete: (itemId: string) => Promise<void>;
  addDocument: (input: DocumentFormInput) => Promise<void>;
  clearError: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function deriveFallbackUser(firebaseUser: FirebaseUser): User {
  const now = new Date().toISOString();

  return buildUserProfile({
    id: firebaseUser.uid,
    email: firebaseUser.email ?? "",
    fullName: firebaseUser.displayName ?? firebaseUser.email?.split("@")[0] ?? "Avenstead User",
    householdId: null
  });
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(EMPTY_APP_STATE);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [authResolved, setAuthResolved] = useState(false);
  const [profileResolved, setProfileResolved] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return subscribeToAuthState(
      (nextUser) => {
        setFirebaseUser(nextUser);
        setAuthResolved(true);
        setError(null);

        if (!nextUser) {
          setProfileResolved(true);
          setDataLoading(false);
          setState(EMPTY_APP_STATE);
        } else {
          setProfileResolved(false);
          setDataLoading(true);
          setState((current) => ({
            ...current,
            user: deriveFallbackUser(nextUser)
          }));
        }
      },
      (authError) => {
        setError(getReadableAuthError(authError));
        setAuthResolved(true);
      }
    );
  }, []);

  useEffect(() => {
    if (!firebaseUser) return;

    setDataLoading(true);

    return subscribeToUserProfile(
      firebaseUser.uid,
      (profile) => {
        setState((current) => ({
          ...current,
          user: profile ?? deriveFallbackUser(firebaseUser),
          onboardingCompleted: Boolean(profile?.householdId)
        }));
        setProfileResolved(true);
        setDataLoading(false);
      },
      (profileError) => {
        setError(getReadableFirebaseError(profileError));
        setProfileResolved(true);
        setDataLoading(false);
      }
    );
  }, [firebaseUser]);

  useEffect(() => {
    if (!state.user.householdId) {
      setState((current) => ({
        ...current,
        household: null,
        members: [],
        items: [],
        documents: []
      }));
      return;
    }

    setDataLoading(true);
    const unsubscribers = [
      subscribeToHousehold(
        state.user.householdId,
        (household) => {
          setState((current) => ({
            ...current,
            household,
            settings: {
              ...current.settings,
              householdName: household?.name ?? current.settings.householdName
            }
          }));
          setDataLoading(false);
        },
        (householdError) => {
          setError(getReadableFirebaseError(householdError));
          setDataLoading(false);
        }
      ),
      subscribeToHouseholdMembers(
        state.user.householdId,
        (members) => {
          setState((current) => ({
            ...current,
            members
          }));
        },
        (membersError) => setError(getReadableFirebaseError(membersError))
      ),
      subscribeToItems(
        state.user.householdId,
        (items) => {
          setState((current) => ({
            ...current,
            items
          }));
        },
        (itemsError) => setError(getReadableFirebaseError(itemsError))
      ),
      subscribeToDocuments(
        state.user.householdId,
        (documents) => {
          setState((current) => ({
            ...current,
            documents
          }));
        },
        (documentsError) => setError(getReadableFirebaseError(documentsError))
      )
    ];

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [state.user.householdId]);

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      ready: authResolved && profileResolved && !dataLoading,
      authResolved,
      profileResolved,
      isAuthenticated: Boolean(firebaseUser),
      hasHousehold: Boolean(state.user.householdId),
      firebaseUser,
      error,
      weeklyBriefing: getWeeklyBriefing(state),
      login: async (email, password) => {
        setError(null);
        try {
          await logInWithEmailPassword(email, password);
        } catch (loginError) {
          const message = getReadableAuthError(loginError);
          setError(message);
          throw loginError;
        }
      },
      signup: async (input) => {
        setError(null);
        try {
          await signUpWithEmailPassword(input);
        } catch (signupError) {
          const message = getReadableAuthError(signupError);
          setError(message);
          throw signupError;
        }
      },
      logout: async () => {
        setError(null);
        try {
          await logOut();
        } catch (logoutError) {
          const message = getReadableAuthError(logoutError);
          setError(message);
          throw logoutError;
        }
      },
      createHousehold: async ({ householdName, householdType, inviteEmail, selectedTemplateGroups }) => {
        if (!firebaseUser) {
          throw new Error("You need to sign in before setting up a household.");
        }

        setError(null);
        setDataLoading(true);

        try {
          await createHouseholdSetup({
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? "",
            fullName: firebaseUser.displayName ?? state.user.fullName,
            householdName,
            householdType,
            inviteEmail,
            selectedTemplateGroups
          });
        } catch (setupError) {
          const message = getReadableFirebaseError(setupError);
          setError(message);
          throw setupError;
        } finally {
          setDataLoading(false);
        }
      },
      createItem: async (input) => {
        if (!state.user.householdId) {
          throw new Error("No household is connected to this account yet.");
        }

        setError(null);
        try {
          await createItemRecord(input, state.user.householdId, state.user.id);
        } catch (createItemError) {
          const message = getReadableFirebaseError(createItemError);
          setError(message);
          throw createItemError;
        }
      },
      updateItem: async (itemId, updates) => {
        setError(null);
        try {
          await updateItemRecord(itemId, updates);
        } catch (updateItemError) {
          const message = getReadableFirebaseError(updateItemError);
          setError(message);
          throw updateItemError;
        }
      },
      markItemComplete: async (itemId) => {
        const item = state.items.find((entry) => entry.id === itemId);
        if (!item) throw new Error("Item not found.");
        setError(null);
        try {
          await markItemCompleteRecord(item, state.user.id);
        } catch (completeError) {
          const message = getReadableFirebaseError(completeError);
          setError(message);
          throw completeError;
        }
      },
      addDocument: async (input) => {
        if (!state.user.householdId) {
          throw new Error("No household is connected to this account yet.");
        }

        setError(null);
        try {
          const document = await uploadDocumentRecord(input, state.user.householdId, state.user.id);

          if (input.linkedItemId) {
            const linkedItem = state.items.find((item) => item.id === input.linkedItemId);

            if (linkedItem) {
              const nextAttachmentIds = Array.from(new Set([...linkedItem.attachmentIds, document.id]));
              await updateItemRecord(linkedItem.id, { attachmentIds: nextAttachmentIds });
            }
          }
        } catch (documentError) {
          const message = getReadableFirebaseError(documentError);
          setError(message);
          throw documentError;
        }
      },
      clearError: () => setError(null)
    }),
    [authResolved, dataLoading, error, firebaseUser, profileResolved, state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppState must be used inside AppProvider.");
  }

  return context;
}
