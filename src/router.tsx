import { createBrowserRouter, Outlet } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";
import CatViewerPage from "@pages/CatViewerPage";
import WorkingHourPage from "@pages/WorkingHourPage";
import Header from "@pages/Header";

export const routers: RemixRouter = createBrowserRouter([
  {
    path: "/",
    element: <LayOutWrapper />,
    // errorElement: <ErrorRedirect />,
    children: [
      {
        path: "/cat-viewer",
        element: <CatViewerPage />,
      },
      {
        path: "/working-hour",
        element: <WorkingHourPage />,
      },
    ],
  },
  //   {
  //     path: "error",
  //     element: <ErrorPage />,
  //   },
]);

function LayOutWrapper() {
  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}
