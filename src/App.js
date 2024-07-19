import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UploadPage from './components/UploadPage';
import PlayerPage from './components/PlayerPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [auth, setAuth] = useState(false);

  console.log('Current auth state:', auth);

  return (
    <Router>
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
          </Routes>
        </main>
        <footer>
          <p>© 2024 Audio Player App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;