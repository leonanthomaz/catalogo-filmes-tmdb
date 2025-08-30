// src/routes/AppRouter.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MovieDetailPage from '../components/MovieDetailPage';
import MainPortal from '../pages/MainPortal';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPortal />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
    </Routes>
  );
};

export default AppRouter;