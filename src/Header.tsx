//import React from 'react';
import { Navbar, Nav,  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from './assets/worksphere-high-resolution-logo-transparent.png';
import './Header.css';
import { useNavigate } from 'react-router-dom';
// import SignIn from './Registration/SignIn';
import { useEffect, useState } from 'react';
import { useAuth } from './Auth';
const Header = () => {
  const { authState, logout } = useAuth();

  const headerStyle = {
    backgroundColor: '#3887BE', // Header background color
    color: 'white', // Text color
    width:'100%',
    padding: '10px', // Padding
    
  };
  const [ loggedin , setLoggedIn] = useState(false);
  const [userRole,setUserRole]=useState<string|null>(null);
  
  const navigate=useNavigate();
  const checkToken=()=>{
    const isSignedIn=localStorage.getItem("token");
    console.log("Token present:", isSignedIn);
    setTimeout(() => {
      setLoggedIn(!!isSignedIn);
    }, 0);
    //setLoggedIn(!!isSignedIn);    
  }
  
  const handleSignOut=()=>{
    console.log("handleSignOut is called");
    console.log("correct");
    localStorage.removeItem("token");
    logout();
    //setLoggedIn(false);
    //setUserRole(null);
    navigate('/');
    //window.location.reload();

  }

  useEffect(()=>{
    checkToken();
    const user=localStorage.getItem("userLoggedIn");
    
    if(user){
      const {role}=JSON.parse(user);
      console.log("Role:",role);
      setUserRole(role);
      setLoggedIn(true);
    }
    return () => {
      // Cleanup when the component unmounts
      setLoggedIn(false);
      setUserRole(null);
    };
    
  },[]);
  //console.log("LoggedIn:", loggedin);
  console.log("UserRole:", userRole);
  
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

        
      
             
             {authState.loggedIn && (
              <>
                <LinkContainer to="/homepage/" activeClassName="NavLink-active">
                <Nav.Link className="NavLink-hover">Home</Nav.Link>
              </LinkContainer>
              {authState.role === "organizer" && (
            <>
              <LinkContainer to="/create-event/" activeClassName="NavLink-active">
                <Nav.Link className="NavLink-hover">Schedule Event</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/edit-event/" activeClassName="NavLink-active">
                <Nav.Link className="NavLink-hover">Edit Event</Nav.Link>
              </LinkContainer>
            </>
          )}

                
                     {/* <LinkContainer  to="/create-event/" activeClassName="NavLink-active">
                       <Nav.Link className="NavLink-hover">Schedule Event</Nav.Link>
                   </LinkContainer>
                   <LinkContainer to="/edit-event/" activeClassName="NavLink-active">
                    <Nav.Link className="NavLink-hover">Edit Event</Nav.Link>
                 </LinkContainer> */}
              
                 


              
              <LinkContainer to="/calendar/" activeClassName="NavLink-active">
                <Nav.Link className="NavLink-hover">Calendar</Nav.Link>
              </LinkContainer>
    
              <LinkContainer to="/view-event/" activeClassName="NavLink-active">
                <Nav.Link className="NavLink-hover">View Events</Nav.Link>
              </LinkContainer>
            
              </>

             )}
         
        {authState.loggedIn &&
        (
          <Nav.Link className="NavLink-hover" onClick={handleSignOut}>Sign Out</Nav.Link>
         
        )}
        

      
        {!authState.loggedIn && (<>
          <LinkContainer to="/registration/" activeClassName="NavLink-active">
          <Nav.Link className="NavLink-hover">Register</Nav.Link>
        </LinkContainer>
            <LinkContainer to="/" activeClassName="NavLink-active">
              <Nav.Link className="NavLink-hover">
                Sign in</Nav.Link>
            </LinkContainer>

        </>
        )}

 
          
          

    

        </Nav>
      
      </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
