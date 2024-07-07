// src/components/Login/index.js

import React from "react";
import Link from "@docusaurus/Link";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/compat/auth";
import { firebaseUiConfig } from "@site/src/config/firebase-config";
import { auth } from "@site/src/components/Auth";
import { AVATAR_URL, BASE } from "@site/src/utils/constants";
import "./styles.css";

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
        <img className="login-avatar" src={AVATAR_URL} alt="TienNHM" />
        <h3 className="auth-title">Sign in to continue</h3>
        <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={auth} />
        <Link to={BASE} className="back-link">Back to Home</Link>
      </div>
    </div>
  );
}