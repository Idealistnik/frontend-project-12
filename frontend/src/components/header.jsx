import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => (
  <Navbar className="navbar-light bg-white shadow-sm navbar-expand-lg">
    <Container>
      <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
    </Container>
  </Navbar>
);

export default Header;
