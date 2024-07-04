import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import routes from "./routes";
import Loader from "./components/common/Loader";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ForgotSuccess from "./pages/Auth/ForgotSuccess";
import CreatePassword from "./pages/Auth/CreatePassword";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DefaultLayout = lazy(() => import("./components/layout/DefaultLayout"));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer
        hideProgressBar
        stacked
        bodyClassName="font-body text-xs"
      />
      <Routes>
        <Route index element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route
          path="/password/forgot/:email?/success"
          element={<ForgotSuccess />}
        />
        <Route path="/password/create/:token?" element={<CreatePassword />} />
        <Route path="/password/reset/:token?" element={<CreatePassword />} />
        <Route element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />
          {routes.map((route, index) => {
            const { path, component: Component } = route;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
