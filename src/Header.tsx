//import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
const Header = () => {
  const headerStyle = {
    backgroundColor: '#3498db', // Header background color
    color: 'white', // Text color
    width:'100%',
    padding: '10px', // Padding
  };

  return (
    <Navbar bg="light" expand="lg" style={headerStyle} >
      <div className='container-fluid'>
      <LinkContainer to="/">
        <Navbar.Brand>Your App Name</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/dashboard/">
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create-event/">
            <Nav.Link>Create/Edit Event</Nav.Link>
          </LinkContainer>
          {/* <LinkContainer to="/schedule-meeting/">
            <Nav.Link>Schedule a Meeting</Nav.Link>
          </LinkContainer> */}
          <LinkContainer to="/registration/">
            <Nav.Link>Register</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/signin/">
            <Nav.Link>Sign in</Nav.Link>
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
          {/* <LinkContainer to="/document-upload">
            <Nav.Link>Document Upload</Nav.Link>
          </LinkContainer> */}
          <LinkContainer to="/user-profile/">
            <Nav.Link>User Profile</Nav.Link>
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
