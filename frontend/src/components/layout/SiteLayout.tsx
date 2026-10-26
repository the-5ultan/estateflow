import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "../common/Brand";
import { brand } from "../../config";

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container nav-inner">
          <Brand />
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav
            id="site-navigation"
            className={menuOpen ? "navigation is-open" : "navigation"}
            aria-label="Main navigation"
            onClick={() => setMenuOpen(false)}
          >
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/properties">Find a property</NavLink>
            <NavLink to="/agents/register">For agents</NavLink>
          </nav>
          <Link to="/login" className="button button-dark nav-signin">
            Sign in <ArrowUpRight size={16} />
          </Link>
        </div>
      </header>
      <Outlet />
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Brand light />
              <p>
                {brand.tagline}
                <br />
                Built around the way Pakistan moves.
              </p>
            </div>
            <div className="footer-links">
              <Link to="/properties">Find a property</Link>
              <Link to="/agents/register">Become an agent</Link>
              <Link to="/login">Sign in</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {brand.name}. All rights reserved.
            </span>
            <div>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <span>PAKISTAN ↗</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
