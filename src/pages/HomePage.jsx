import LogsList from "../components/homepage/LogsList";
import RecentLogs from "../components/homepage/RecentLogs";

import styles from "./Home.module.css";

function HomePage() {
  return (
    <main className={styles.homePage}>
      <RecentLogs />
      <LogsList />
    </main>
  );
}

export default HomePage;
