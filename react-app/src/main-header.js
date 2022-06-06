import { Container, Nav, Navbar,  } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import logo from './imagenes/logo.svg';
import { LoginComponent } from './utilidades/security';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectIsInRole } from './store/auth-slice';

export default function MainHeader() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isEmpleado = useSelector(selectIsInRole('Empleados'))
  const isAdministrador = useSelector(selectIsInRole('Administradores'))

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand><Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item><NavLink className="nav-link" to="/">inicio</NavLink></Nav.Item>
              {isAuthenticated && <Nav.Item><NavLink className="nav-link" to="/contactos">contactos</NavLink></Nav.Item>}
              {isAdministrador && <Nav.Item><NavLink className="nav-link" to="/personas">personas</NavLink></Nav.Item>}
              {isEmpleado && <Nav.Item><NavLink className="nav-link" to="/blog">blog</NavLink></Nav.Item>}
              <Nav.Item><NavLink className="nav-link" to="/chisme/de/hacer/numeros">calculadora</NavLink></Nav.Item>
              <Nav.Item><NavLink className="nav-link" to="/muro">muro</NavLink></Nav.Item>
              <Nav.Item><NavLink className="nav-link" to="/formularios">formulario</NavLink></Nav.Item>
              <Nav.Item><NavLink className="nav-link" to="/falsa.html">html</NavLink></Nav.Item>
              <Nav.Item><NavLink className="nav-link" to="/cont">cont</NavLink></Nav.Item>
            </Nav>
            <LoginComponent />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}