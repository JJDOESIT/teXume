import { XCircleIcon } from "@heroicons/react/24/solid";
import styles from "./popup.module.css";

import React from "react";

export default function Popup(props) {
  return (
    <section className={styles.container}>
      <div className={styles.xIcon}>
        <XCircleIcon onClick={() => props.close()}></XCircleIcon>
      </div>
      <div className={styles.childContainer}>{props.children}</div>
    </section>
  );
}
