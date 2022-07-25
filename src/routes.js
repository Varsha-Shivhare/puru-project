import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layout/dashboardLayout/dashboard";
//
import NotFound from "./pages/Page404";
import DashboardApp from "./pages/DashboardApp";
import ScoreCardApp from "./pages/ScoreCardApp";
import { WithoutSideLayout } from "./layout";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "/", element: <Navigate to="/scoreCard" /> },
        {
          path: "executionReport",
          element: <DashboardApp />,
        },
        {
          path: "scoreCard",
          element: <ScoreCardApp />,
        },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/scoreCard",
      element: <WithoutSideLayout />,
      children: [
        { path: "executionReport", element: <DashboardApp /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
