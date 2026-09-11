import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import Toast from "../common/Toast";
import Header from "./Header";
import MainContent from "./MainContent";

import styles from "./Layout.module.css";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === ROUTES.HOME;

  const [toast, setToast] = useState(null);

  const showToast = (variant, message) => {
    setToast({ variant, message, key: Date.now() });
  };

  return (
    <div className={styles.layoutWrapper}>
      <Header showCreateButton={isHome} />
      <MainContent>
        <Outlet context={{ showToast }} />
      </MainContent>

      {toast && (
        <Toast
          key={toast.key}
          points={toast.points}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
export default Layout;
