import styles from "./MainContent.module.css";

function MainContent({ children }) {
  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>{children}</div>
    </main>
  );
}
export default MainContent;
