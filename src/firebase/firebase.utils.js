import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDLSJerm12hs8LWm99E_0a9tVBV_Qc42OU",
  authDomain: "ecommercedb-f008e.firebaseapp.com",
  databaseURL: "https://ecommercedb-f008e.firebaseio.com",
  projectId: "ecommercedb-f008e",
  storageBucket: "ecommercedb-f008e.appspot.com",
  messagingSenderId: "543184318261",
  appId: "1:543184318261:web:914bc832931c0e140e267c",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
