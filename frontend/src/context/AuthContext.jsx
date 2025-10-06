import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  auth,
  googleProvider,
  githubProvider,
} from '../firebase/firebaseConfig';
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');
  const [redirectPath, setRedirectPath] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const loginWithEmail = async (email, password) => {
    setError('');
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signupWithEmail = async (email, password) => {
    setError('');
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    // Optionally set a default display name from email
    if (cred.user && !cred.user.displayName) {
      await updateProfile(cred.user, { displayName: email.split('@')[0] });
    }
  };

  const loginWithGoogle = async () => {
    setError('');
    await signInWithPopup(auth, googleProvider);
  };

  const loginWithGithub = async () => {
    setError('');
    await signInWithPopup(auth, githubProvider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = useMemo(() => ({
    user,
    loading,
    error,
    setError,
    isAuthModalOpen,
    setAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    redirectPath,
    setRedirectPath,
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    loginWithGithub,
    logout,
  }), [user, loading, error, isAuthModalOpen, authModalTab, redirectPath]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


