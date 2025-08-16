// src/components/Auth/index.js

import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Redirect, useLocation } from "@docusaurus/router";

import { firebaseConfig } from "../../config/firebase-config";
import { Login } from "../Login";
import Loading from "../Loading";
import { BASE, LOGOUT_PATH, LOGIN_PATH, PROTECTED_PATHS } from "@site/src/utils/constants";

// Initialize Firebase (chỉ 1 lần duy nhất)
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function AuthCheck({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Subscribe lắng nghe trạng thái đăng nhập
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });

    // Cleanup subscription khi unmount
    return () => unsubscribe();
  }, []);

  const location = useLocation();
  let from = location.pathname;

  if (authLoading) return <Loading />;

  if (user?.email) {
    if (from === LOGOUT_PATH) {
      signOut(auth);
      return <Redirect to={BASE} from={LOGOUT_PATH} />;
    } else if (from === LOGIN_PATH) {
      return <Redirect to={BASE} from={from} />;
    }

    return children;
  } else {
    if (from === LOGOUT_PATH) {
      return <Redirect to={BASE} from={from} />;
    } else if (PROTECTED_PATHS.some((x) => from.includes(x))) {
      return <Login />;
    } else if (from === LOGIN_PATH) {
      return <Login />;
    }
    return children;
  }
}
