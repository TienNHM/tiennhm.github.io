// src/utils/utils.js

import React, { useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import { onAuthStateChanged } from "firebase/auth";
import { useThemeConfig } from "@docusaurus/theme-common";
import { auth } from "../components/Auth";

import {
  LOGIN_BUTTON,
  LOGIN_PATH,
  LOGOUT_BUTTON,
  LOGOUT_PATH,
} from "./constants";

export function useNavbarItems() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  });

  // TODO temporary casting until ThemeConfig type is improved
  // return useThemeConfig().navbar.items;
  let items = useThemeConfig().navbar.items;


  if (user) {
    items.push({
      type: "html",
      label: "User",
      value: `<img src=${user.photoURL} style="width: 30px; height: 30px; border-radius: 50%;" />`,
      position: "right",
      navkey: LOGOUT_BUTTON,
    });
    items.push({
      label: 'Account',
      position: "right",
      navkey: LOGOUT_BUTTON,
      items: [
        {
          label: "Profile",
          to: "/profile",
        },
        {
          label: "Settings",
          to: "/settings",
        },
        {
          label: LOGOUT_BUTTON,
          to: LOGOUT_PATH,
        },
      ]
    });
  } else {
    items.push({
      label: 'Account',
      position: "right",
      navkey: LOGIN_BUTTON,
      items: [
        {
          label: LOGIN_BUTTON,
          to: LOGIN_PATH,
        }
      ]
    });
  }

  // remove irrelevant items
  if (user) {
    items = items.filter((x) => x.navkey !== LOGIN_BUTTON);
  }
  else {
    items = items.filter((x) => x.navkey !== LOGOUT_BUTTON);
  }

  const uniqueItems = [...new Map(items.map((x) => [x.label, x])).values()];
  // console.log(uniqueItems);
  return uniqueItems;
}