import styles from "./export.module.css";

import Popup from "../../../../../components/popup/popup";
import { useState } from "react";
import { ArrowDownOnSquareStackIcon } from "@heroicons/react/24/solid";

export default function Export({ download }) {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("pdf");

  // Handle the download
  async function handleDownload() {
    download(selectedOption);
  }

  return (
    <div className={styles.container}>
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
                <p>Select export type</p>
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
                <div className="primaryEmeraldButton" onClick={handleDownload}>
                  <p>Download</p>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
}
