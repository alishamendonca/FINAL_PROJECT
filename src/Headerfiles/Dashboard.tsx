//import React from 'react'
import { Container,Row,Col,Card,Button } from "react-bootstrap";
import backgroundImg from '../assets/annie-spratt-sggw4-qDD54-unsplash.jpg';
import { useEffect } from "react";
import { Link } from "react-router-dom";
const backgroundStyle={
  backgroundImage:`url(${backgroundImg})`,
  backgroundSize:'cover',
  backgroundPosition:'center',
  minHeight:'100vh',
  paddingTop:'100px',
  //opacity:0.2,
  //filter: 'blur(1px)',
};
const cardStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
  color: 'white', // Set text color to white for better visibility
};
 const Dashboard = () => {
  useEffect(() => {
    console.log("Dashboard component mounted");
    return () => {
      console.log("Dashboard component unmounted");
    };
  }, []);

  console.log("Dashboard component rendered");

  return (
    <div style={backgroundStyle}>
      <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title>Your Upcoming Events</Card.Title>
              <Card.Text>
                View and manage the events you have scheduled.
              </Card.Text>
                <Link to="/view-event/"> <Button variant="primary">View Events</Button></Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title>Schedule a New Event</Card.Title>
              <Card.Text>
                Plan and schedule a new event effortlessly.
              </Card.Text>
                <Button variant="primary">Schedule Event</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title>Event Calendar</Card.Title>
              <Card.Text>
                Check your calendar to see upcoming events.
              </Card.Text>
               <Link to="/calendar/"><Button variant="primary">View Calendar</Button></Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
    
  )
}

export default Dashboard;