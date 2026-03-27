import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import ProtectedRoute from './features/shared/ProtectedRoute';
import MarketerLogin from './features/marketers/MarketerLogin';
import MarketerDashboard from './features/marketers/MarketerDashboard';
import SetMarketerPassword from './features/marketers/SetMarketerPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MarketerLogin />} />

        <Route path="/plotconnectmarketers" element={<Navigate to="/" replace />} />
        <Route
          path="/set-password"
          element={
            <ProtectedRoute role="marketer" redirectTo="/">
              <SetMarketerPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="marketer" redirectTo="/">
              <MarketerDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/plotconnectmarketers/set-password" element={<Navigate to="/set-password" replace />} />
        <Route path="/plotconnectmarketers/dashboard" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/user-login" element={<Navigate to="/" replace />} />
        <Route path="/admin-login" element={<Navigate to="/" replace />} />
        <Route path="/admin" element={<Navigate to="/" replace />} />
        <Route path="/plotconnect" element={<Navigate to="/" replace />} />
        <Route path="/plotconnect/admin" element={<Navigate to="/" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
