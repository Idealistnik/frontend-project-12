/* eslint-disable functional/no-expression-statement */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectorLoggedIn,
  setLoggedOut,
  removeUserInfo,
} from '../slices/userSlice';

const Header = () => {
  const { t, i18n } = useTranslation();
  const en = 'en';
  const ru = 'ru';
  const [currentLang, setLang] = useState(ru); // удалить позже
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectorLoggedIn);

  const classes = isLoggedIn ? 'd-block' : 'd-none';
  const handleLogOut = () => {
    dispatch(setLoggedOut());
    dispatch(removeUserInfo());
    navigate('/login');
  };

  const handleChangeLang = () => {
    const newLang = currentLang === ru ? en : ru;
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <Navbar className="bg-white shadow-sm" expand="lg">
      <Container>
        <Navbar.Brand href="/">{t('hexletChat')}</Navbar.Brand>
        <ButtonGroup>
          <Button onClick={handleChangeLang} className="me-2">
            {currentLang}
          </Button>
          <Button onClick={handleLogOut} className={classes}>
            {t('logout')}
          </Button>
        </ButtonGroup>
      </Container>
    </Navbar>
  );
};

export default Header;
