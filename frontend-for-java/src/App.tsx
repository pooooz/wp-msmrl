import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './core/components/Navbar/Navbar';
import { AppRoutes } from './pages/AppRoutes';

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
