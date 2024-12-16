import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/Pages/LoginPage.jsx';
import MainPage from './components/Pages/MainPage.jsx';
import ProfilePage from './components/Pages/ProfilePage.jsx';
import RegisterPage from './components/Pages/RegisterPage.jsx';
import { auth } from './components/auth/firebase.js';
import EntryPage from './components/Pages/EntryPage.jsx';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/explore" /> : <EntryPage />} />
        <Route path="/login" element={user ? <Navigate to="/explore" /> : <LoginPage />} />
        <Route path="/explore/*" element={<MainPage />} />
        <Route path="/register/*" element={user ? <Navigate to="/explore" /> : <RegisterPage />} />
        <Route path="/myProfile/*" element={user ? <ProfilePage /> : <Navigate to='/'></Navigate>} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById('root')).render(<App />);
