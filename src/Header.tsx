//import React from 'react';
import { Navbar, Nav,  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from './assets/worksphere-high-resolution-logo-transparent.png';
const Header = () => {
  const headerStyle = {
    backgroundColor: '#3887BE', // Header background color
    color: 'white', // Text color
    width:'100%',
    padding: '10px', // Padding
  };

  return (
    <Navbar  expand="lg" style={headerStyle} >
      <div className='container-fluid'>
      <LinkContainer to="/">
        <Navbar.Brand>
        <img
          src={Logo}
          width="170px"
          height="30"
          className="d-inline-block align-top"
          alt="Your Logo"
         />

        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/homepage/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create-event/">
            <Nav.Link>Schedule Event</Nav.Link>
          </LinkContainer>
          {/* <LinkContainer to="/schedule-meeting/">
            <Nav.Link>Schedule a Meeting</Nav.Link>
          </LinkContainer> */}
          <LinkContainer to="/registration/">
            <Nav.Link>Register</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/">
            <Nav.Link>
               Sign in</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/calendar/">
            <Nav.Link>Calendar</Nav.Link>
          </LinkContainer>
          {/* <LinkContainer to="/roles/">
            <Nav.Link>Roles Management</Nav.Link>
          </LinkContainer> */}
          {/* <LinkContainer to="/participant-list/">
            <Nav.Link>Participant List</Nav.Link>
          </LinkContainer> */}
          <LinkContainer to="/view-event/">
            <Nav.Link>View Events</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/edit-event/">
            <Nav.Link>Edit Event</Nav.Link>
          </LinkContainer>
          {/* <LinkContainer to="/settings/">
            <Nav.Link>Settings</Nav.Link>
          </LinkContainer> */}
        </Nav>
        {/* <Nav className="ml-auto">
          {user ? (
            <NavDropdown title={`Welcome, ${user.username}`} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          )}
        </Nav> */}
      </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
