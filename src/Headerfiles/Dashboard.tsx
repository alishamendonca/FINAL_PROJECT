//import React from 'react'
import { Container,Row,Col,Card,Button } from "react-bootstrap";
import backgroundImg from '../assets/annie-spratt-sggw4-qDD54-unsplash.jpg';

const backgroundStyle={
  backgroundImage:`url(${backgroundImg})`,
  backgroundSize:'cover',
  backgroundPosition:'center',
  minHeight:'100vh',
  paddingTop:'100px',
  //opacity:0.2,
  //filter: 'blur(1px)',
};
 const Dashboard = () => {
  return (
    <div style={backgroundStyle}>
      <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Your Upcoming Events</Card.Title>
              <Card.Text>
                View and manage the events you have scheduled.
              </Card.Text>
              <Button variant="primary">View Events</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
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
          <Card>
            <Card.Body>
              <Card.Title>Event Calendar</Card.Title>
              <Card.Text>
                Check your calendar to see upcoming events.
              </Card.Text>
              <Button variant="primary">View Calendar</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
    
  )
}

export default Dashboard;