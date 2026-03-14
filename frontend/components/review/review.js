import styles from "./review.module.css";

export default function Review({ name, message, date, width, height }) {
  return (
    <div className={styles.container} style={{ width: width, height: height }}>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <div className={styles.name}>
            <p>{name}</p>
          </div>
          <div className={styles.stars}>
            <img src="/star.svg" alt="Star"></img>
            <img src="/star.svg" alt="Star"></img>
            <img src="/star.svg" alt="Star"></img>
            <img src="/star.svg" alt="Star"></img>
            <img src="/star.svg" alt="Star"></img>
          </div>
          <div className={styles.message}>
            <p>{message}</p>
          </div>
        </div>
        <div className={styles.date}>
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
}
