import styles from "./navbarAlert.module.css";

import { useContext } from "react";
import { navbarAlertContext } from "../navbarAlertProvider/navbarAlertProvider";

export default function NavbarAlert() {
  const { navbarAlertVisible, navbarAlertType, navbarAlertMessage } =
    useContext(navbarAlertContext);

  return (
    <>
      {navbarAlertVisible && (
        <div
          className={`${styles.container} ${navbarAlertType == "warning" ? styles.warning : navbarAlertType == "error" ? styles.error : styles.success}`}
        >
          <p>{navbarAlertMessage}</p>
        </div>
      )}
    </>
  );
}
