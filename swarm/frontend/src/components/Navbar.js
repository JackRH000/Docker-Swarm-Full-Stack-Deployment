import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faWrench, faHouse, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function Navigation({id, logout}) {

  const [active, SetActive] = useState({
    'home': true,
    'create': false,
    'login': false
  })

  const handleChange = (field) => {
    let noActive = {
      'home': false,
      'create': false,
      'login': false    
    }
    noActive[field] = true
    console.log(noActive)
    SetActive(noActive)
  }
  return (
    <Navbar expand="lg" className="navbar-dark bg-primary">
      <Container>
        <Navbar.Brand to="/" as={Link} onClick={() => handleChange('home')}>FixIt <FontAwesomeIcon icon={faWrench} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link to="/" as={Link} className={active.home ? 'active' : ''} onClick={() => handleChange('home')}> Home <FontAwesomeIcon icon={faHouse} /></Nav.Link>
          <Nav.Link to="/solve" as={Link} disabled={id ? false : true} className={active.create ? 'active' : ''} onClick={() => handleChange('create')} > Solve ! </Nav.Link>
          {!id ?
            <Nav.Link to="/login"
             as={Link} className={active.login ? 'active' : ''}
            onClick={() => handleChange('login')}
            >Login &nbsp;<FontAwesomeIcon icon={faRightToBracket} /> </Nav.Link>
            : <Nav.Link to="/" as={Link} onClick={logout} > Logout &nbsp;<FontAwesomeIcon icon={faDoorOpen} /> </Nav.Link>
          }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;