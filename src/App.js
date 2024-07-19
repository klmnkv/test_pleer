import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UploadPage from './components/UploadPage';
import PlayerPage from './components/PlayerPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <Router>
      <AppContent auth={auth} setAuth={setAuth} />
    </Router>
  );
}

function AppContent({ auth, setAuth }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const audioUrl = params.get('url');
    if (audioUrl) {
      navigate(`/play?url=${encodeURIComponent(audioUrl)}`);
    }
  }, [location, navigate]);

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
          <Route path="/" element={auth ? <UploadPage /> : <LoginPage setAuth={setAuth} />} />
        </Routes>
      </main>
      <footer>
        <p>© 2024 Audio Player App</p>
      </footer>
    </div>
  );
}

export default App;