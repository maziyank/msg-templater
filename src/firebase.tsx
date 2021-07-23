import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import React from "react";
import { Template } from "./types/types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_MSG_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const firebaseApp: firebase.app.App = firebase.initializeApp(firebaseConfig);
firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
firebaseApp.analytics();

// provider
const googleProvider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
const twitterProvider: firebase.auth.TwitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const FirebaseContext : React.Context<any> = React.createContext({});
const FirebaseProvider : React.Provider<any> = FirebaseContext.Provider;

const signInUsingGoogle = () => {
  firebaseApp.auth().signInWithRedirect(googleProvider);
  firebaseApp.auth()
    .getRedirectResult()
    .then((result: firebase.auth.UserCredential) => {
      console.log(result)
    }).catch((error: any) => {
      console.log(error)
    });
}

const signOut = () => {
  firebaseApp.auth().signOut().then(() => {
    console.log('Sign-out successful.')
  }).catch((error) => {
    console.log(error)
  });
}

export const writeTemplate = (userId: string, data: Template) => {
    firebaseApp.database().ref('template/' + userId).push(data);
}

export const updateTemplate = (userId: string, data: Template) => {
  firebaseApp.database().ref('template/' + userId + '/' + data.keyField).set(data);
}

export const deleteTemplate = (userId: string, data: Template) => {
  firebaseApp.database().ref('template/' + userId+ '/'+ data.keyField).remove();
}



export { firebaseApp, signInUsingGoogle, signOut, FirebaseContext, FirebaseProvider, googleProvider, twitterProvider }