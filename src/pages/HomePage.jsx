import LogsList from "../components/homepage/LogsList";
import RecentStudies from "../components/homepage/RecentStudies";

import styles from "./Home.module.css";

function HomePage() {
  return (
    <main className={styles.homePage}>
      <RecentStudies />
      <LogsList />
    </main>
  );
}

export default HomePage;
