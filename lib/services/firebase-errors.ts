import { FirebaseError } from "firebase/app";

export function getReadableFirebaseError(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return error instanceof Error ? error.message : "Something went wrong. Please try again.";
  }

  switch (error.code) {
    case "permission-denied":
      return "Firebase permissions blocked this action. Update your Firestore or Storage rules to allow the signed-in user to create household records.";
    case "unauthenticated":
      return "Your session is not authenticated for this Firebase action. Please sign in again.";
    case "not-found":
      return "A required Firebase record was not found.";
    case "failed-precondition":
      return "Firebase rejected this request because a required collection, index, or configuration step is missing.";
    case "storage/unauthorized":
      return "Storage permissions blocked this upload. Update your Storage rules for signed-in household users.";
    case "storage/canceled":
      return "The file upload was canceled.";
    case "storage/unknown":
      return "Storage returned an unknown error while uploading the file.";
    default:
      return error.message;
  }
}
