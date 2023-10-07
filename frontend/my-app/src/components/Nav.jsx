import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/images/logo-1.png'
function NavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
        <img src={logo}
          width="60"
          height="60"
          alt="Logo"/>
          <Navbar.Brand href="#">Delitos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
            <Nav.Link href="/registro">Registrarse</Nav.Link>
            <Nav.Link href="/denuncia-anonima">Hacer denuncia anonima</Nav.Link>
          </Nav>
        </Container>
      </Navbar>  
     
  );
}

export default NavBar;