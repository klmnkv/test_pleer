import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/LoginPage';
import UploadPage from './components/UploadPage';
import PlayerPage from './components/PlayerPage';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Маршрут для страницы входа */}
          <Route
            path="/login"
            element={<LoginPage setAuth={setIsAuthenticated} />}
          />

          {/* Маршрут для страницы воспроизведения */}
          <Route
            path="/play"
            element={<PlayerPage />}
          />

          {/* Защищенный маршрут для страницы загрузки */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute auth={isAuthenticated}>
                <UploadPage />
              </ProtectedRoute>
            }
          />

          {/* Перенаправление на страницу входа по умолчанию */}
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          {/* Обработка всех остальных маршрутов */}
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;