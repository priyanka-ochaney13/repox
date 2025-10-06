import React from 'react';
import { Link } from 'react-router-dom';
import './layout.css';

export function Header() {
  return (
    <header className="rx-header">
      <div className="rx-container rx-header-inner">
        <Link to="/repositories" className="rx-logo" aria-label="Go to repositories">
          RepoX
        </Link>
        <nav className="rx-nav" aria-label="Main navigation">
          <Link to="/repositories" className="rx-nav-link">Get Started</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
