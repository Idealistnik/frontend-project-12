/* eslint-disable functional/no-expression-statement */

import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectorLoggedIn,
  setLoggedOut,
  removeUserInfo,
} from '../slices/userSlice';

const Header = () => {
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
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        <Button onClick={handleLogOut} className={classes}>
          Выйти
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
