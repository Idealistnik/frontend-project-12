import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
}
  from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import LoginPage from './pages/login_Page';
import Page404 from './pages/404_Page';
import MainPage from './pages/main_Page';
import SignUpPage from './pages/signup_Page';
import { selectorLoggedIn } from './slices/userSlice';
import routes from './routes/routes';

const MainRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectorLoggedIn);

  return (
    isLoggedIn ? children : <Navigate to={routes.loginPage()} />
  );
};

const LoginRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectorLoggedIn);

  return (
    isLoggedIn ? <Navigate to={routes.mainPage()} /> : children
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>

      <Route
        path={routes.loginPage()}
        element={(
          <LoginRoute>
            <LoginPage />
          </LoginRoute>
        )}
      />

      <Route
        path={routes.mainPage()}
        element={(
          <MainRoute>
            <MainPage />
          </MainRoute>
        )}
      />

      <Route path={routes.page404()} element={<Page404 />} />
      <Route path={routes.signupPage()} element={<SignUpPage />} />

    </Routes>
    <ToastContainer />
  </BrowserRouter>

);

export default App;
