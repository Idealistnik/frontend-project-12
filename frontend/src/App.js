import './App.css';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
}
  from 'react-router-dom';
import LoginPage from './pages/login_Page';
import Page404 from './pages/404_Page';
import MainPage from './pages/main_Page';
import { selectorLoggedIn } from './slices/userSlice';

const MainRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectorLoggedIn);
  const location = useLocation();
  return (
    isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={(
          <MainRoute>
            <MainPage />
          </MainRoute>
        )}
      />

      <Route path="*" element={<Page404 />} />

    </Routes>
  </BrowserRouter>
);

export default App;
