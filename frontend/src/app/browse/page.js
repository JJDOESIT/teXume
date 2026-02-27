"use client";

import styles from "./browse.module.css";

import Loading from "../../../components/loading/loading";
import Link from "next/link";
import { getAll } from "../../../api/template";
import { useState, useEffect } from "react";

export default function Browse() {
  const [templates, setTemplates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch templates
  async function getTemplates() {
    const response = await getAll();
    const data = await response.json();
    setTemplates(data);
    setIsLoading(false);
  }

  // Fetch templates on render
  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <section className={styles.container}>
      {!isLoading ? (
        <div className={styles.gridContainer}>
          {templates != null &&
            templates.map((item, index) => {
              return (
                <Link
                  key={index}
                  className={styles.template}
                  href={"/template/" + item["name"]}
                >
                  <img src={`data:image/png;base64,${item["preview"]}`}></img>
                  <div className={`${styles.useTemplate} primaryEmeraldButton`}>
                    <p>Use this template</p>
                  </div>
                </Link>
              );
            })}
        </div>
      ) : (
        <Loading></Loading>
      )}
    </section>
  );
}
