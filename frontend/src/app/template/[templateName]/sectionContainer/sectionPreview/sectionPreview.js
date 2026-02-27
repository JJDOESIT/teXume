import styles from "./sectionPreview.module.css";

import {
  Bars2Icon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

export default function SectionPreview(props) {
  const [isPreview, setIsPreview] = useState(true);

  return (
    <section
      className={`${styles.container} ${isPreview ? styles.preview : ""}`}
    >
      <div
        className={styles.header}
        style={!isPreview ? { marginBottom: "10px" } : {}}
      >
        <div className={styles.draggableIcon}>
          <Bars2Icon></Bars2Icon>
        </div>

        <section className={styles.previewContainer}>
          <div className={styles.icon}>{props.icon}</div>
          <p>{props.sectionName}</p>
        </section>

        <div className={styles.rightIcons}>
          <div
            className={styles.chevronIcon}
            onClick={() => setIsPreview((prev) => !prev)}
          >
            {isPreview ? (
              <ChevronDownIcon></ChevronDownIcon>
            ) : (
              <ChevronUpIcon></ChevronUpIcon>
            )}
          </div>
          <div className={styles.trashIcon}>
            <EyeIcon></EyeIcon>
          </div>
        </div>
      </div>
      {!isPreview && props.section}
    </section>
  );
}
