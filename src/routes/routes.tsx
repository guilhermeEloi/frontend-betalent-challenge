import { BrowserRouter as Router, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../pages/home/HomePage"));

const NotFoundPage = lazy(() => import("../pages/notFound/NotFoundPage"));

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
