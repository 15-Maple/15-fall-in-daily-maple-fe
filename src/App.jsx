import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import CreateLog from "./pages/createLog/CreateLog";
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
      { path: ROUTES.CREATELOG, element: <CreateLog /> },
      { path: ROUTES.LOG_DETAIL, element: <LogDetail /> },
      { path: ROUTES.TODAY_HABITS, element: <TodayHabits /> },
      { path: ROUTES.TODAY_FOCUS, element: <TodayFocus /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
