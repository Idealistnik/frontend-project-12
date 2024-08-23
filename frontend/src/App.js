import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login_Page';
import Page404 from './pages/404_Page';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);

export default App;
