import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    setAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    loginWithGithub,
    error,
    setError,
    redirectPath,
  } = useAuth();
  const navigate = (path) => {
    try { window.history.pushState({}, '', path); } catch {}
    // No hard navigation here; routing handled in app. This is just a soft push.
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const close = () => {
    if (submitting) return;
    setError('');
    setAuthModalOpen(false);
    if (redirectPath) navigate(redirectPath);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await loginWithEmail(email, password);
      close();
    } catch (err) {
      setError(mapFirebaseError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const onSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await signupWithEmail(email, password);
      close();
    } catch (err) {
      setError(mapFirebaseError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const onGoogle = async () => {
    setSubmitting(true);
    setError('');
    try {
      await loginWithGoogle();
      close();
    } catch (err) {
      setError(mapFirebaseError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const onGithub = async () => {
    setSubmitting(true);
    setError('');
    try {
      await loginWithGithub();
      close();
    } catch (err) {
      setError(mapFirebaseError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-panel">
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-icon">★</span>
            <h2>Welcome to RepoX</h2>
          </div>
          <button onClick={close} className="modal-close">✕</button>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.5rem',background:'#0c1524',border:'1px solid #1f2b3b',borderRadius:'.6rem',padding:'.25rem',marginBottom:'1rem'}}>
          <button onClick={() => setAuthModalTab('login')} style={tabStyle(authModalTab==='login')}>Login</button>
          <button onClick={() => setAuthModalTab('signup')} style={tabStyle(authModalTab==='signup')}>Sign Up</button>
        </div>

        {error && (
          <div style={{marginBottom:'.8rem',background:'#220e10',border:'1px solid #3f1d20',color:'#f87171',borderRadius:'.6rem',padding:'.5rem .7rem',fontSize:'.8rem'}}>{error}</div>
        )}

        {authModalTab === 'login' ? (
          <form onSubmit={onLogin} className="modal-form">
            <div className="field-group">
              <label className="field-label">Email</label>
              <div className="input-wrapper">
                <span className="input-prefix">@</span>
                <input type="email" required placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
            </div>
            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="input-wrapper">
                <span className="input-prefix">•••</span>
                <input type="password" required placeholder="••••••" value={password} onChange={(e)=>setPassword(e.target.value)} />
              </div>
            </div>
            <div className="modal-actions" style={{justifyContent:'stretch'}}>
              <button disabled={submitting} className="btn-primary" style={{width:'100%', justifyContent:'center'}}>{submitting? 'Signing in...' : 'Sign In'}</button>
            </div>
            <div style={{textAlign:'center',opacity:.6,fontSize:'.7rem'}}>OR</div>
            <div className="field-row">
              <button type="button" onClick={onGoogle} className="modal-cancel" style={{width:'100%'}}>Login with Google</button>
              <button type="button" onClick={onGithub} className="modal-cancel" style={{width:'100%'}}>Login with GitHub</button>
            </div>
          </form>
        ) : (
          <form onSubmit={onSignup} className="modal-form">
            <div className="field-group">
              <label className="field-label">Email</label>
              <div className="input-wrapper">
                <span className="input-prefix">@</span>
                <input type="email" required placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
            </div>
            <div className="field-row">
              <div className="field-group">
                <label className="field-label">Password</label>
                <div className="input-wrapper">
                  <span className="input-prefix">•••</span>
                  <input type="password" required placeholder="••••••" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
              </div>
              <div className="field-group">
                <label className="field-label">Confirm Password</label>
                <div className="input-wrapper">
                  <span className="input-prefix">•••</span>
                  <input type="password" required placeholder="••••••" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="modal-actions" style={{justifyContent:'stretch'}}>
              <button disabled={submitting} className="btn-primary" style={{width:'100%', justifyContent:'center'}}>{submitting? 'Creating...' : 'Create Account'}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function mapFirebaseError(err) {
  const code = err?.code || '';
  if (code.includes('invalid-credential') || code.includes('wrong-password')) return 'Invalid email or password';
  if (code.includes('user-not-found')) return 'No account found for this email';
  if (code.includes('email-already-in-use')) return 'Email already in use';
  if (code.includes('weak-password')) return 'Password should be at least 6 characters';
  return err?.message || 'Something went wrong';
}

function tabStyle(active){
  return {
    borderRadius:'.45rem',
    padding:'.55rem .75rem',
    border:'1px solid #1f2b3b',
    background: active ? '#0f1724' : 'transparent',
    color:'#d0d7e2',
    fontWeight: active ? 600 : 500,
    cursor:'pointer'
  };
}


