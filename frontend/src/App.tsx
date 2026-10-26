import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import SiteLayout from "./components/layout/SiteLayout";
import HomePage from "./pages/public/HomePage";
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const FoundationPage = lazy(() => import("./pages/public/FoundationPage"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="page-loading" role="status">
            Opening your next chapter…
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="properties"
              element={<FoundationPage page="properties" />}
            />
            <Route
              path="agents/register"
              element={<FoundationPage page="agent" />}
            />
            <Route path="privacy" element={<FoundationPage page="privacy" />} />
            <Route path="terms" element={<FoundationPage page="terms" />} />
            <Route path="*" element={<FoundationPage page="404" />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
