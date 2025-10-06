import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import '../App.css';

// Temporary in-memory data source (mirrors SAMPLE_REPOS structure)
const ALL_REPOS = [
  { name: 'DSA-prac', owner: 'priyanka-ochaney13', desc: 'Practice data structures & algorithms.', stars: 0, lang: 'JavaScript', updated: 'Oct 4, 2025', status: 'Ready', readme: `# DSA-prac\n\nThis repository contains data structure & algorithm practice solutions.\n\n## Contents\n- Arrays\n- Linked Lists\n- Trees\n- Graphs\n\n## Automation\nGenerated documentation sample.` },
  { name: 'repox', owner: 'priyanka-ochaney13', desc: 'RepoX core service.', stars: 0, lang: 'TypeScript', updated: 'Oct 4, 2025', status: 'Ready', readme: `# RepoX\nCore service powering automated documentation.` },
  { name: 'api-gateway', owner: 'acme', desc: 'Scalable API gateway with rate limiting and authentication', stars: 156, lang: 'Go', updated: 'Jan 14, 2024', status: 'Ready', readme: `# API Gateway\n\nHigh-performance gateway written in Go.` },
  { name: 'ml-toolkit', owner: 'opensource', desc: 'Machine learning toolkit for data scientists', stars: 0, lang: 'Python', updated: 'Sep 22, 2025', status: 'Ready', readme: `# ML Toolkit\nMachine learning helper utilities.` },
  { name: 'react-dashboard', owner: 'acme', desc: 'Modern React dashboard with analytics and data', stars: 0, lang: 'TypeScript', updated: 'Jun 01, 2025', status: 'Ready', readme: `# React Dashboard\nAnalytics dashboard components.` },
];

const DOC_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'readme', label: 'README' },
  { id: 'summary', label: 'Code Summary' },
  { id: 'changelog', label: 'Changelog' },
];

export default function RepoDocsPage() {
  const { owner, name } = useParams();
  const repo = useMemo(() => ALL_REPOS.find(r => r.owner === owner && r.name === name), [owner, name]);

  if (!repo) {
    return (
      <>
        <Header />
        <main className="docs-page" style={{padding:"4rem 1.5rem"}}>
          <div className="docs-container">
            <p style={{opacity:.7}}>Repository not found.</p>
            <Link to="/repositories" className="btn-primary" style={{display:'inline-block',marginTop:'1.25rem'}}>← Back</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="docs-page">
        <div className="docs-container">
          <div className="docs-header-meta">
            <div className="repo-icon large" aria-hidden>📄</div>
            <div>
              <h1 className="docs-title">{repo.name}</h1>
              <div className="docs-sub">{repo.owner} • {repo.lang} {repo.stars ? `• ⭐ ${repo.stars}`: ''}</div>
            </div>
            <div className="docs-header-actions">
              <Link to="/repositories" className="btn-secondary small-btn">← Repositories</Link>
            </div>
          </div>
          <div className="docs-layout">
            <nav className="docs-nav" aria-label="Documentation sections">
              <ul>
                {DOC_SECTIONS.map(s => (
                  <li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>
                ))}
              </ul>
            </nav>
            <div className="docs-content">
              <section id="overview" className="doc-section">
                <h2>Overview</h2>
                <p>{repo.desc || 'No description provided.'}</p>
                <div className="meta-row">
                  <span className="status-badge ready">{repo.status}</span>
                  <span className="tiny-meta">Updated {repo.updated}</span>
                </div>
              </section>
              <section id="readme" className="doc-section">
                <h2>README</h2>
                <pre className="md-block"><code>{repo.readme}</code></pre>
              </section>
              <section id="summary" className="doc-section">
                <h2>Code Summary</h2>
                <p>Automated high-level summary of core modules (placeholder).</p>
                <ul className="summary-list">
                  <li><strong>src/algorithms/</strong> — Data structure & algorithm implementations.</li>
                  <li><strong>tests/</strong> — Unit tests for core logic.</li>
                  <li><strong>scripts/</strong> — Utility scripts.</li>
                </ul>
              </section>
              <section id="changelog" className="doc-section">
                <h2>Changelog</h2>
                <ul className="changelog">
                  <li><span className="chg-date">2025-10-04</span> Added new graph algorithms.</li>
                  <li><span className="chg-date">2025-09-20</span> Refactored tree traversal utilities.</li>
                  <li><span className="chg-date">2025-09-01</span> Initial auto-generated docs.</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
