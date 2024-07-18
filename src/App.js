import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/LoginPage';
import UploadPage from './components/UploadPage';
import PlayerPage from './components/PlayerPage';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setAuth={setIsAuthenticated} />} />
        <Route path="/play" element={<PlayerPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute auth={isAuthenticated}>
              <UploadPage />
            </ProtectedRoute>
          }
        />
        {/* Default route to login page */}
        <Route path="*" element={<LoginPage setAuth={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
};

export default App;