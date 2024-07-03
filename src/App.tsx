import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import routes from "./routes";
import Loader from "./components/common/Loader";

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
      <Routes>
        {/*     <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} /> */}
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
