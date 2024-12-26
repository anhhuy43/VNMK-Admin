import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import AdminPostManager from '../pages/AdminPostManager';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/posts" element={<AdminPostManager />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
