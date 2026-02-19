"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "../../utilities/cookies";
import { isLoggedIn as isUserLoggedIn } from "../../api/authentication";
import { usePathname } from "next/navigation";
import { navbarAlertContext } from "../navbarAlertProvider/navbarAlertProvider";

export const accountContext = createContext(null);

export default function AccountProvider({ children }) {
  const { showNavbarAlert } = useContext(navbarAlertContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const pathname = usePathname();

  // Determine if the user is logged in
  async function checkIfLoggedIn() {
    const cookie = await getCookie("token");

    if (cookie == null) {
      setIsLoggedIn(false);
      return;
    }

    const token = cookie["value"];
    const response = await isUserLoggedIn(token);

    if (!response.ok) {
      setIsLoggedIn(false);
      return;
    }

    const data = await response.json();
    setIsLoggedIn(data);
    return data;
  }

  // Check if the user is logged in whenever the pathname changes
  useEffect(() => {
    checkIfLoggedIn();
  }, [pathname]);

  // Set the first render flag to false
  useEffect(() => {
    setFirstRender(false);
  }, []);

  // Alert the user that they have been logged out
  useEffect(() => {
    if (!isLoggedIn && !firstRender) {
      showNavbarAlert("warning", "You have been logged out.", 2000);
    }
  }, [isLoggedIn]);

  return (
    <accountContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        checkIfLoggedIn: checkIfLoggedIn,
      }}
    >
      {children}
    </accountContext.Provider>
  );
}
