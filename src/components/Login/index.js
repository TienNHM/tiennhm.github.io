import React, { useState } from "react";
import Link from "@docusaurus/Link";
import { auth, googleProvider } from "@site/src/config/firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";
import { AVATAR_URL, BASE } from "@site/src/utils/constants";
import "./styles.css";

export function Login() {
  const [user, setUser] = useState(auth?.currentUser || null);

  const handleLogin = async () => {
    if (!auth || !googleProvider) {
      console.error("Firebase not initialized");
      return;
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    if (!auth) {
      console.error("Firebase not initialized");
      return;
    }
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "100vh",
      }}
    >
      <div className="auth-wrapper">
        <img className="login-avatar" src={AVATAR_URL} alt="TienNHM" />
        <h3 className="auth-title">
          {user ? `Welcome, ${user.displayName}` : "Sign in to continue"}
        </h3>

        {!user ? (
          <button onClick={handleLogin}>Sign in with Google</button>
        ) : (
          <button onClick={handleLogout}>Sign out</button>
        )}

        <Link to={BASE} className="back-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
