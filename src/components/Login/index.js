// src/components/Login/index.js

import React from "react";

import { auth } from "../Auth";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import "./styles.css";
import { BASE } from "@site/src/utils/constants";
import Link from "@docusaurus/Link";

// Configure FirebaseUI.
export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: BASE,
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

export function Login() {
  return (
    <div style={
      {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "100vh",
      }
    }>
      <div className="auth-wrapper">
        <img className="login-avatar" src="https://github.com/TienNHM.png" alt="TienNHM" />
        <h3 className="auth-title">Sign in to continue</h3>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        <Link to={BASE} className="back-link">Back to Home</Link>
      </div>
    </div>
  );
}