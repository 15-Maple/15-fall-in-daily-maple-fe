import { Outlet, useLocation } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import Header from "./Header";
import MainContent from "./MainContent";

import styles from "./Layout.module.css";

function Layout() {
  const location = useLocation();

  const isHome = location.pathname === ROUTES.HOME;
  return (
    <div className={styles.layoutWrapper}>
      <Header showCreateButton={isHome} />
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  );
}
export default Layout;
