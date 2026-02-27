"use client";

import { createContext, useEffect, useState } from "react";

export const navbarAlertContext = createContext(null);

export default function NavbarAlertProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [delay, setDelay] = useState(null);

  // Show navbar alert
  async function showNavbarAlert(type, message, delay) {
    setType(type);
    setMessage(message);
    setDelay(delay);
    setVisible(true);
  }

  // Debounce visibility delay
  useEffect(() => {
    const id = setTimeout(() => {
      if (delay != null) {
        setVisible(false);
        setDelay(null);
      }
    }, delay);

    return () => clearTimeout(id);
  }, [delay]);

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
