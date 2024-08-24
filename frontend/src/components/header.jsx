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
import { removeChannels } from '../slices/channelSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectorLoggedIn);

  const classes = isLoggedIn ? 'd-block' : 'd-none';
  const handleLogOut = () => {
    dispatch(setLoggedOut());
    // localStorage.clear();
    dispatch(removeUserInfo());
    dispatch(removeChannels());
    navigate('/login');
  };

  return (
    <Navbar className="navbar-light bg-white shadow-sm navbar-expand-lg">
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
