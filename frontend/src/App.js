import './App.css';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
}
  from 'react-router-dom';
import LoginPage from './pages/login_Page';
import Page404 from './pages/404_Page';
import MainPage from './pages/main_Page';
import SignUpPage from './pages/signup_Page';
import { selectorLoggedIn } from './slices/userSlice';

const MainRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectorLoggedIn);

  return (
    isLoggedIn ? children : <Navigate to="/login" />
  );
};

const LoginRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectorLoggedIn);

  return (
    isLoggedIn ? <Navigate to="/" /> : children
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>

      <Route
        path="/login"
        element={(
          <LoginRoute>
            <LoginPage />
          </LoginRoute>
        )}
      />

      <Route
        path="/"
        element={(
          <MainRoute>
            <MainPage />
          </MainRoute>
        )}
      />

      <Route path="*" element={<Page404 />} />
      <Route path="/signup" element={<SignUpPage />} />

    </Routes>
  </BrowserRouter>
);

export default App;
