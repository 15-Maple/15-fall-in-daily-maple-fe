import { Outlet } from "react-router-dom";

import Header from "./Header";
import MainContent from "./MainContent";

import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.layoutWrapper}>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  );
}
export default Layout;
