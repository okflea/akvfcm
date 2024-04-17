import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
let firebase_app: FirebaseApp | undefined;
if (getApps().length === 0 || getApps()[0] === undefined) {
  firebase_app = initializeApp(FirebaseCredentials);
} else {
  firebase_app = getApps()[0];
}

export const auth = getAuth(firebase_app);
export const storage = getStorage(firebase_app);

export default firebase_app;

// export const getUserToken = (
//   setTokenFound: React.Dispatch<React.SetStateAction<boolean>>,
// ) => {
//   if (messaging !== undefined || messaging !== null) {
//     return getToken(messaging, {
//       vapidKey:
//         "BPveaCggNO9hF7EImRc8O6Ssm74jPcbnrfxDCSlhm80nGzzumtu5wopcOIpkDsDgcOe4fpXVjh7DKwwhMLvY_bo",
//     })
//       .then((currentToken) => {
//         if (currentToken) {
//           console.log("current token for client: ", currentToken)
//           setTokenFound(true)
//           // Track the token -> client mapping, by sending to backend server
//           // show on the UI that permission is secured
//         } else {
//           console.log(
//             "No registration token available. Request permission to generate one.",
//           )
//           setTokenFound(false)
//           // shows on the UI that permission is required
//         }
//       })
//       .catch((err) => {
//         console.log("An error occurred while retrieving token. ", err)
//         // catch error while creating client token
//       })
//   }
// }
