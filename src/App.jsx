import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import CreateLog from "./pages/createLog/CreateLog";
import LogDetail from "./pages/LogDetail";
import SamplePage from "./pages/SamplePage";

import { ROUTES } from "./constants/routes";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: ROUTES.HOME, element: <>홈</> },
      { path: ROUTES.SAMPLE, element: <SamplePage /> },
      { path: ROUTES.CREATELOG, element: <CreateLog /> },
      { path: ROUTES.LOG_DETAIL, element: <LogDetail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
