// src/routes/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPortal } from '../pages/MainPortal';
// import MovieDetailPage from '../components/MovieDetailPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPortal />} />
        {/* <Route path="/movie/:id" element={<MovieDetailPage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
