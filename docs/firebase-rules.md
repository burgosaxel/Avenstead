# Firebase Rules

These rules are tightened to match the current Avenstead app behavior.

## Important implementation details

- Owner membership records use the document ID format: `{uid}_{householdId}`
- Onboarding creates `users`, `households`, and `householdMembers` first
- Starter `items` are seeded in a second write after membership exists
- Document uploads use this Storage path:
  `households/{householdId}/documents/{category}/{documentId}/{filename}`

## Firestore rules

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    function memberDocId(uid, householdId) {
      return uid + "_" + householdId;
    }

    function isHouseholdMember(householdId) {
      return isSignedIn() &&
        exists(/databases/$(database)/documents/householdMembers/$(memberDocId(request.auth.uid, householdId)));
    }

    match /users/{userId} {
      allow read, write: if isOwner(userId);
    }

    match /households/{householdId} {
      allow create: if isSignedIn() && request.resource.data.createdBy == request.auth.uid;
      allow read, update: if isHouseholdMember(householdId);
      allow delete: if false;
    }

    match /householdMembers/{memberId} {
      allow create: if isSignedIn() &&
        (
          request.resource.data.userId == request.auth.uid ||
          isHouseholdMember(request.resource.data.householdId)
        );

      allow read: if isSignedIn() &&
        (
          resource.data.userId == request.auth.uid ||
          isHouseholdMember(resource.data.householdId)
        );

      allow update: if isSignedIn() && isHouseholdMember(resource.data.householdId);
      allow delete: if false;
    }

    match /items/{itemId} {
      allow create: if isSignedIn() && isHouseholdMember(request.resource.data.householdId);
      allow read, update: if isHouseholdMember(resource.data.householdId);
      allow delete: if false;
    }

    match /documents/{documentId} {
      allow create: if isSignedIn() && isHouseholdMember(request.resource.data.householdId);
      allow read, update: if isHouseholdMember(resource.data.householdId);
      allow delete: if false;
    }

    match /notifications/{notificationId} {
      allow create: if isSignedIn() && request.auth.uid == request.resource.data.userId;
      allow read, update: if isSignedIn() && request.auth.uid == resource.data.userId;
      allow delete: if false;
    }

    match /activityLog/{activityId} {
      allow create: if isSignedIn() && isHouseholdMember(request.resource.data.householdId);
      allow read: if isHouseholdMember(resource.data.householdId);
      allow update, delete: if false;
    }
  }
}
```

## Storage rules

These rules keep uploads limited to authenticated members of the same household by checking Firestore membership.

```txt
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    function isSignedIn() {
      return request.auth != null;
    }

    function memberDocId(uid, householdId) {
      return uid + "_" + householdId;
    }

    function isHouseholdMember(householdId) {
      return isSignedIn() &&
        firestore.exists(
          /databases/(default)/documents/householdMembers/$(memberDocId(request.auth.uid, householdId))
        );
    }

    match /households/{householdId}/documents/{category}/{documentId}/{fileName} {
      allow read, write: if isHouseholdMember(householdId);
    }
  }
}
```

## Notes

- The current app does not implement household leave/remove flows yet, so deletes are denied.
- Invite acceptance is not fully built yet. These rules allow existing household members to create invited member records.
- If you later add server-side admin writes through Cloud Functions, the Admin SDK bypasses these client rules.
