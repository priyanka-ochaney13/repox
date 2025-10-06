import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RepositoriesPage from './pages/Repositories.jsx';
import RepoDocsPage from './pages/RepoDocs.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RepoProvider } from './store/repoStore.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

function PrivateRoute({ children }) {
  const { user, setAuthModalOpen, setAuthModalTab } = useAuth();
  if (!user) {
    setAuthModalTab('login');
    setAuthModalOpen(true);
    return <App />;
  }
  return children;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <RepoProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/repositories" element={<PrivateRoute><RepositoriesPage /></PrivateRoute>} />
            <Route path="/docs/:owner/:name" element={<PrivateRoute><RepoDocsPage /></PrivateRoute>} />
          </Routes>
        </RepoProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
