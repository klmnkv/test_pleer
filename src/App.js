import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UploadPage from './components/UploadPage';
import PlayerPage from './components/PlayerPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [auth, setAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/uploads/') && path.endsWith('.mp3')) {
      const audioUrl = `http://server-pleer.onrender.com${path}`;
      navigate(`/play?url=${encodeURIComponent(audioUrl)}`);
    }
  }, [location, navigate]);

  console.log('Current auth state:', auth);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Audio Player App</h1>
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
          <Route
            path="/upload"
            element={
              <ProtectedRoute auth={auth}>
                <UploadPage />
              </ProtectedRoute>
            }
          />
          <Route path="/play" element={<PlayerPage />} />
          <Route
            path="/"
            element={
              auth ? <Navigate to="/upload" /> : <Navigate to="/login" />
            }
          />
          <Route path="/uploads/*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer>
        <p>© 2024 Audio Player App</p>
      </footer>
    </div>
  );
}

export default App;
