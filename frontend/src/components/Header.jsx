import React from 'react';
import './layout.css';

export function Header() {
  return (
    <header className="rx-header">
      <div className="rx-container rx-header-inner">
        <div className="rx-logo">RepoX</div>
        <nav className="rx-nav" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#problem">Problem</a>
          <a href="#cta">Get Started</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
