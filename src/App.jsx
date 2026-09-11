import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LogLayout from "./components/layout/LogLayout";
import CreateLog from "./pages/createLog/CreateLog";
import UpdateLog from "./pages/createLog/UpdateLog";
import HomePage from "./pages/HomePage";
import LogDetail from "./pages/LogDetail";
import SamplePage from "./pages/SamplePage";
import TodayFocus from "./pages/TodayFocus";
import TodayHabits from "./pages/todayHabits/TodayHabits";

import { ROUTES } from "./constants/routes";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.SAMPLE, element: <SamplePage /> },
      { path: ROUTES.CREATE_LOG, element: <CreateLog /> },
      { path: ROUTES.LOG_DETAIL, element: <LogDetail /> },

      { path: ROUTES.UPDATE_LOG, element: <UpdateLog /> },
      {
        path: ROUTES.LOG,
        element: <LogLayout />,
        children: [
          { index: true, element: <></> },
          { path: "habits", element: <TodayHabits /> },
          { path: "focus", element: <TodayFocus /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
