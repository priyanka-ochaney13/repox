import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RepositoriesPage from './pages/Repositories.jsx';
import RepoDocsPage from './pages/RepoDocs.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
  <Route path="/repositories" element={<RepositoriesPage />} />
  <Route path="/docs/:owner/:name" element={<RepoDocsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
