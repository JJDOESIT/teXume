import styles from "./question.module.css";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

export default function Question({ question, answer }) {
  const [isPreview, setIsPreview] = useState(true);
  const answerHeight = useRef(0);
  const answerRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (answerRef.current != null) {
        answerHeight.current = answerRef.current.scrollHeight;
      }
    });
    observer.observe(answerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.preview}
        onClick={() => setIsPreview((prev) => !prev)}
      >
        <div className={styles.question}>
          <p>{question}</p>
        </div>
        {isPreview ? (
          <ChevronDownIcon></ChevronDownIcon>
        ) : (
          <ChevronUpIcon></ChevronUpIcon>
        )}
      </div>

      <div
        ref={answerRef}
        className={styles.answer}
        style={
          isPreview ? { maxHeight: "0" } : { maxHeight: answerHeight.current }
        }
      >
        {answer}
      </div>
    </div>
  );
}
