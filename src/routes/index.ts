import { lazy } from "react";

const coreRoutes = [
  {
    path: "/playground/buttons",
    title: "Buttons",
    component: lazy(() => import("../pages/Dashboard/Dashboard")),
  },
  {
    path: "/users",
    title: "Users List",
    component: lazy(() => import("../pages/Users/UserList")),
  },

];
const routes = [...coreRoutes];
export default routes;