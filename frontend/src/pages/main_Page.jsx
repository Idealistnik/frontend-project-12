/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import BodyContainer from '../components/bodyContainer';

const MainPage = () => {
  const navigate = useNavigate();
  // localStorage.clear();
  useEffect(() => {
    if (localStorage.length === 0) {
      navigate('/login');
    }
  }, [navigate]);

  const vdom = (
    <BodyContainer>
      <Header />
      <div className="text-center">
        <p>Тут будет чат</p>
      </div>
    </BodyContainer>
  );

  return localStorage.length === 0 ? null : vdom;
};

export default MainPage;
