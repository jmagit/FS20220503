import { Container, Nav, Navbar,  } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import logo from './logo.svg';

export default function MainHeader() {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand><Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item><NavLink className="nav-link" to="/">inicio</NavLink></Nav.Item>
              <Nav.Item><NavLink className="nav-link" to="/contactos">contactos</NavLink></Nav.Item>
              <Nav.Item><NavLink className="nav-link" to="/personas">personas</NavLink></Nav.Item>
              <Nav.Item><NavLink className="nav-link" to="/chisme/de/hacer/numeros">calculadora</NavLink></Nav.Item>
              <Nav.Item><NavLink className="nav-link" to="/calculadora">calculadora</NavLink></Nav.Item>
              <Nav.Item><NavLink className="nav-link" to="/muro">muro</NavLink></Nav.Item>
              <Nav.Item><NavLink className="nav-link" to="/formularios">formulario</NavLink></Nav.Item>
              <Nav.Item><NavLink className="nav-link" to="/falsa.html">html</NavLink></Nav.Item>
              <Nav.Item><NavLink className="nav-link" to="/cont">cont</NavLink></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}