import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
// import Layout from "./pages/_layouts/Layout";
import App from "./App";

import ErrorPage from "./pages/ErrorPage";
import ChainSitesPage from "./pages/maps/ChainSitesPage";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: DashboardLayout,
        children: [
          // {
          //   path: "",
          //   Component: HomePage,
          // },
          {
            path: "/sites/chainsites",
            Component: ChainSitesPage,
          },
          { path: "*", Component: ErrorPage },
        ],
      },
    ],
  },
]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, element: <HomePage /> },
//       { path: "sites", element: <SitesPage /> },
//       { path: "sign-up", element: <AboutPage /> },
// ]}
// ]);

export default router;
