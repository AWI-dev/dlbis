import { lazy } from "react";

const coreRoutes = [
  {
    path: "/dashboard",
    title: "Data",
    component: lazy(() => import("../pages/Dashboard/Dashboard")),
  },
  {
    path: "/dashboard/view-data/:id?",
    title: "Data",
    component: lazy(() => import("../pages/Dashboard/ViewData")),
  },
  {
    path: "/users",
    title: "Users List",
    component: lazy(() => import("../pages/Users/UserList")),
  },

];
const routes = [...coreRoutes];
export default routes;