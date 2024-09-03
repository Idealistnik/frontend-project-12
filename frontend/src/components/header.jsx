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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectorLoggedIn);

  const classes = isLoggedIn ? 'd-block' : 'd-none';
  const handleLogOut = () => {
    dispatch(setLoggedOut());
    dispatch(removeUserInfo());
    navigate('/login');
  };

  return (
    <Navbar className="bg-white shadow-sm" expand="lg">
      <Container>
        <Navbar.Brand href="/">{t('hexletChat')}</Navbar.Brand>
        <ButtonGroup>
          <Button onClick={handleLogOut} className={classes}>
            {t('logout')}
          </Button>
        </ButtonGroup>
      </Container>
    </Navbar>
  );
};

export default Header;
