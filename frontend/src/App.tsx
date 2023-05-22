import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './core/components/Navbar/Navbar';
import { useAppDispatch, useAppSelector } from './core/hooks/redux';
import { updateToken } from './core/reducers/userReducer';
import { AppRoutes } from './pages/AppRoutes';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateToken());
  }, []);

  const role = useAppSelector((state) => state.user.role);

  return (
    <BrowserRouter>
      {role && <Navbar />}
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
