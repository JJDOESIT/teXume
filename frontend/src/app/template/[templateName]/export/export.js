import styles from "./export.module.css";

import { useState } from "react";
import { ArrowDownOnSquareStackIcon } from "@heroicons/react/24/solid";
import Popup from "../../../../../components/popup/popup";

export default function Export() {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <section className={styles.container}>
      <div
        className="secondaryEmeraldButton"
        onClick={() => {
          setOptionsVisible((prev) => !prev);
        }}
        style={
          optionsVisible
            ? { borderTopLeftRadius: "0", borderTopRightRadius: "0" }
            : {}
        }
      >
        <p>Export</p>
      </div>
      {optionsVisible && (
        <Popup close={() => setOptionsVisible(false)}>
          <div className={styles.exportPopupContainer}>
            <div className={styles.options}>
              <div className={styles.optionsTitle}>
                <p>Export Resume</p>
              </div>
              <div className={styles.exportOptions}>
                <div
                  className={`${selectedOption != "pdf" ? styles.disabledOption : ""} secondaryGrayButton`}
                  onClick={() => setSelectedOption("pdf")}
                >
                  <p>PDF</p>
                  <ArrowDownOnSquareStackIcon></ArrowDownOnSquareStackIcon>
                </div>
                <div
                  className={`${selectedOption != "latex" ? styles.disabledOption : ""} secondaryGrayButton`}
                  onClick={() => setSelectedOption("latex")}
                >
                  <p>LaTeX</p>
                  <ArrowDownOnSquareStackIcon></ArrowDownOnSquareStackIcon>
                </div>
              </div>
              <div className={styles.line}></div>
              <div className={styles.download}>
                <div
                  className={`${selectedOption == null ? styles.disabledDownload : ""} primaryEmeraldButton`}
                >
                  <p>Download</p>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </section>
  );
}
