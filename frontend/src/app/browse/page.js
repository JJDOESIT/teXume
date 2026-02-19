"use client";

import { useState, useEffect } from "react";
import styles from "./browse.module.css";
import { getAll } from "../../../api/template";

export default function Browse() {
  const [templates, setTemplates] = useState(null);

  async function getTemplates() {
    const response = await getAll();
    const data = await response.json();
    setTemplates(data);
  }
  useEffect(() => {
    getTemplates();
  }, []);
  return (
    <section className={styles.container}>
      <div className={styles.gridContainer}>
        {templates != null &&
          templates.map((item, index) => {
            return (
              <div key={index} className={styles.template}>
                <img src={`data:image/png;base64,${item["preview"]}`}></img>
                <div className={`${styles.useTemplate} primaryEmeraldButton`}>
                  <p>Use this template</p>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
