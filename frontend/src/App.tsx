import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './core/hooks/redux';
import { updateToken } from './core/reducers/userReducer';
import { AppRoutes } from './pages/AppRoutes';
import { DefaultTemplate } from './templates/DefaultTemplate';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateToken());
  }, []);

  const role = useAppSelector((state) => state.user.role);

  return (
    <BrowserRouter>
      {role
        ? (
            <DefaultTemplate>
              <AppRoutes />
            </DefaultTemplate>
          )
        : <AppRoutes />
      }
    </BrowserRouter>
  );
};

export default App;
