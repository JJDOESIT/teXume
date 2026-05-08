"use client";

import styles from "./browse.module.css";

import Loading from "../../../components/loading/loading";
import Link from "next/link";
import { getAll } from "../../../api/template";
import { useState, useEffect } from "react";

export default function Browse() {
  const [templates, setTemplates] = useState(null);
  const [filteredTemplates, setFilteredTemplates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch templates
  async function getTemplates() {
    const response = await getAll();
    const data = await response.json();
    setTemplates(data);
    setFilteredTemplates(data);
    setIsLoading(false);
  }

  // Filter the templates
  function filter(text) {
    const filtered = templates.filter((template) =>
      template.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredTemplates(filtered);
  }

  // Fetch templates on render
  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <section className={styles.container}>
      {!isLoading ? (
        <div>
          <div className={styles.filter}>
            <div className={`primaryEmeraldInput`}>
              <input
                onChange={(event) => filter(event.target.value)}
                placeholder="Filter"
              ></input>
            </div>
          </div>

          <div className={styles.gridContainer}>
            {filteredTemplates != null &&
              filteredTemplates.map((item, index) => {
                return (
                  <Link
                    key={index}
                    className={styles.template}
                    href={"/template/" + item["name"]}
                  >
                    <img src={`data:image/png;base64,${item["preview"]}`}></img>
                    <div
                      className={`${styles.useTemplate} secondaryEmeraldButton`}
                    >
                      <p>Use this template</p>
                    </div>
                    <p>{item["name"]}</p>
                  </Link>
                );
              })}
          </div>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </section>
  );
}
