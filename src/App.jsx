import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import SamplePage from "./pages/SamplePage";

import { ROUTES } from "./constants/routes";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: ROUTES.HOME, element: <>홈</> },
      { path: ROUTES.SAMPLE, element: <SamplePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
