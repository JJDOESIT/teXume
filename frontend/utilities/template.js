"use client";

import UserInfoModel from "../models/UserInfoModel";

import { getUserInfo } from "../api/account";
import { deleteCookie, getCookie } from "./cookies";
import { compile, initialize } from "../api/template";

// Fetch user info
export async function fetchUserInfo(setUserInfo, showNavbarAlert) {
  const cookie = await getCookie("token");

  if (cookie == null) {
    setUserInfo(new UserInfoModel());
    return;
  }

  const token = cookie["value"];
  const response = await getUserInfo(token);

  if (!response.ok) {
    await deleteCookie("token");
    if (response.status == 403) {
      showNavbarAlert(
        "error",
        "Oops! Your session expired. Refresh the page or log back in.",
      );
    } else {
      showNavbarAlert(
        "error",
        "Something went wrong! Please refresh and try again.",
      );
    }
    return;
  }

  const data = await response.json();
  setUserInfo(new UserInfoModel(data.userInfo));
}

// Initialize template
export async function initializeTemplate(
  template,
  setSession,
  showNavbarAlert,
) {
  const response = await initialize(template);

  if (!response.ok) {
    showNavbarAlert(
      "error",
      "Something went wrong! Please refresh and try again.",
    );
    return;
  }

  const data = await response.json();
  setSession(data["session"]);
}

// Compile template
export async function compileTemplate(
  userInfo,
  session,
  pdfTimestamp,
  setPdfUrl,
  checkIfLoggedIn,
  showNavbarAlert,
) {
  checkIfLoggedIn();

  const timestamp = Date.now();
  const response = await compile(userInfo, session);

  if (!response.ok) {
    if (response.status == 401) {
      showNavbarAlert(
        "warning",
        "Oops! Your session expired. Refresh the page to pick up where you left off.",
      );
    } else {
      showNavbarAlert(
        "error",
        "Something went wrong! Please refresh and try again.",
      );
    }
    return;
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  if (timestamp >= pdfTimestamp.current) {
    pdfTimestamp.current = timestamp;
    setPdfUrl(url);
  }
}
