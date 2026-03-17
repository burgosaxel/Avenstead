# Avenstead

Avenstead is a calm household life-admin app built with Next.js App Router, TypeScript, Tailwind CSS, Firebase Authentication, Firestore, and Firebase Storage.

## What is wired now

- Email/password sign up and login with Firebase Auth
- Protected household routes for `/dashboard`, `/items`, `/documents`, `/household`, and `/settings`
- Onboarding writes `users`, `households`, `householdMembers`, and seeded `items` documents
- Items are read from Firestore and support create, update, and recurring completion logic
- Documents upload to Firebase Storage and store metadata in Firestore
- Existing Avenstead UI, layout, dashboard, items, documents, household, and settings pages are preserved

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Firebase Authentication
- Firestore
- Firebase Storage

## Local setup

1. Install dependencies.

```bash
npm install
```

2. Create `.env.local` from [`.env.example`](/c:/Users/burgo/FamilyLifeAdminAutopilot%20v2/.env.example).

3. Add your Firebase web app credentials to `.env.local`.

Required variables:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` if your Firebase app uses Analytics

4. In Firebase Console, enable:

- Authentication with Email/Password
- Firestore
- Storage

5. Start the app.

```bash
npm run dev
```

6. Build-check the production app if needed.

```bash
npm run typecheck
npm run build
```

## Live deployment

GitHub Pages is not the right host for this app. Avenstead is a real Next.js application with Firebase-backed auth and app routes, so GitHub Pages can end up showing repo content or a static fallback instead of the actual web app.

Deploy the site with Firebase Hosting instead.

1. Install the Firebase CLI if needed.

```bash
npm install -g firebase-tools
```

2. Log in to Firebase.

```bash
firebase login
```

3. Confirm this repo is linked to the correct Firebase project.

```bash
firebase use avenstead
```

4. Deploy Hosting.

```bash
firebase deploy --only hosting
```

The repo now includes:

- [`firebase.json`](/c:/Users/burgo/FamilyLifeAdminAutopilot%20v2/firebase.json): Firebase Hosting config for the Next.js app
- [`.firebaserc`](/c:/Users/burgo/FamilyLifeAdminAutopilot%20v2/.firebaserc): default Firebase project mapping for `avenstead`

If you previously enabled GitHub Pages for this repo, disable it in GitHub Settings so the public repo URL does not point to the wrong site.

## Firebase collections

Top-level collections used by the app:

- `users`
- `households`
- `householdMembers`
- `items`
- `documents`

Every household-scoped record includes `householdId`.

Storage path pattern:

- `households/{householdId}/documents/{category}/{documentId}/{filename}`

Recommended Firestore and Storage rules for the current app are documented in [docs/firebase-rules.md](/c:/Users/burgo/FamilyLifeAdminAutopilot%20v2/docs/firebase-rules.md).

## Main implementation files

- [components/providers/app-provider.tsx](/c:/Users/burgo/FamilyLifeAdminAutopilot%20v2/components/providers/app-provider.tsx): auth state, route-ready app state, Firestore subscriptions, and mutations
- [lib/firebase/client.ts](/c:/Users/burgo/FamilyLifeAdminAutopilot%20v2/lib/firebase/client.ts): Firebase app, auth, Firestore, and Storage client setup
- [lib/services/auth.ts](/c:/Users/burgo/FamilyLifeAdminAutopilot%20v2/lib/services/auth.ts): Firebase Auth service layer
- [lib/services/users.ts](/c:/Users/burgo/FamilyLifeAdminAutopilot%20v2/lib/services/users.ts): user profile reads and writes
- [lib/services/households.ts](/c:/Users/burgo/FamilyLifeAdminAutopilot%20v2/lib/services/households.ts): onboarding household creation and household subscriptions
- [lib/services/items.ts](/c:/Users/burgo/FamilyLifeAdminAutopilot%20v2/lib/services/items.ts): Firestore item CRUD and completion logic
- [lib/services/documents.ts](/c:/Users/burgo/FamilyLifeAdminAutopilot%20v2/lib/services/documents.ts): Storage uploads and Firestore document records
- [lib/utils/recurrence.ts](/c:/Users/burgo/FamilyLifeAdminAutopilot%20v2/lib/utils/recurrence.ts): next due date calculation for recurring items

## Notes

- Route protection is handled in the existing app shell, so protected pages keep the same layout while unauthenticated users are redirected to login.
- New accounts are created on the login page, then finish household setup on onboarding.
- If an authenticated user has no household yet, the app routes them to onboarding.
- Document uploads store the file in Storage and the metadata record in Firestore, with optional item linking and expiration support.

## Still future-facing

- Scheduled reminders and weekly summary delivery
- Invite acceptance flow
- OCR and AI assistance
- Email parsing
- Military-specific modules later
