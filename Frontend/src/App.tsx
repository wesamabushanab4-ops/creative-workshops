import { NavLink, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import WorkshopFormPage from "./pages/WorkshopFormPage";
import WorkshopsPage from "./pages/WorkshopsPage";

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span>
            <strong>Maker House</strong>
            <small>COMMUNITY CREATIVE CENTER</small>
          </span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/workshops">Workshops</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <NavLink className="header-action" to="/workshops/new">
          <span aria-hidden="true">+</span> New workshop
        </NavLink>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/workshops" element={<WorkshopsPage />} />
          <Route path="/workshops/new" element={<WorkshopFormPage />} />
          <Route path="/workshops/:id/edit" element={<WorkshopFormPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <span>Maker House · A place for hands and ideas</span>
        <span>Meet · Make · Learn</span>
      </footer>
    </div>
  );
}
