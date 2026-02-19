"use client";

import { createContext, useState } from "react";

export const navbarAlertContext = createContext(null);

export default function NavbarAlertProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  // Show navbar alert
  async function showNavbarAlert(type, message, delay) {
    setType(type);
    setMessage(message);
    setVisible(true);

    if (delay != null) {
      setTimeout(() => {
        setVisible(false);
      }, delay);
    }
  }

  return (
    <navbarAlertContext.Provider
      value={{
        showNavbarAlert: showNavbarAlert,
        navbarAlertVisible: visible,
        navbarAlertType: type,
        navbarAlertMessage: message,
      }}
    >
      {children}
    </navbarAlertContext.Provider>
  );
}
