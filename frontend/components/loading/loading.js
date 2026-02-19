import styles from "./loading.module.css";

export default function Loading() {
  return (
    <section className={styles.container}>
      <img src="/loading.svg" alt="loading"></img>
    </section>
  );
}
