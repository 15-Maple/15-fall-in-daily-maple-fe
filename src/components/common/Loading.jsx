import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.dot}>
        <span></span>
        <span></span>
        <span className={styles.right}></span>
      </div>
      <p>L O A D I N G</p>
    </div>
  );
}
export default Loading;
