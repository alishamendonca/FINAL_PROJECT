import { useEffect, useState } from 'react';
import { Button, Container,Row,Col, ListGroup } from 'react-bootstrap';
import UsersService from "../Axios/UsersService";
import BackgroundImg from '../assets/annie-spratt-sggw4-qDD54-unsplash.jpg';

const ViewEvent = () => {
    interface Event {
        id: number;
        eventname: string;
        date: string;
        time: string;
        location: string;
        participantList:string[];
        roles:string;
        mode:string;
        meetlink:string;
        // Add more properties based on your event structure
      }
      

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const usersService = UsersService(); 

  useEffect(() => {
    // Fetch events data when the component mounts
    const fetchEvents = async () => {
      try {
        const response = await usersService().getEventList();
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDetailsButtonClick = (event:Event) => {
    // Set the selected event when the "Show Details" button is clicked
    setSelectedEvent(event);
  };

  return (
   <Container style={{ backgroundImage: `url(${BackgroundImg})`, backgroundSize: 'cover', minHeight: '100vh' }}>
    <Row className="justify-content-center">
      <Col xs={12} md={8}>
      <h1 className="text-center mt-4 mb-3">Event List</h1>
      <ListGroup >
        {events.map(event => (
          <ListGroup.Item key={event.id} className="d-flex justify-content-between align-items-center" style={{backgroundColor:'#F6F7C4'}}>
            <span>{event.eventname}</span>
            <Button variant="info" onClick={() => handleDetailsButtonClick(event)}>
              Show Details
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Display event details when an event is selected */}
      {selectedEvent && (
        <div className="mt-3"  style={{ backgroundColor: '#fff',marginBottom:'20px', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ textDecoration: 'underline' }}>Details for {selectedEvent.eventname}</h2>
          <p>Date: {selectedEvent.date}</p>
          <p>Time: {selectedEvent.time}</p>
          <p>Location: {selectedEvent.location}</p>
          <p>Role: {selectedEvent.roles}</p>
          <p>Mode: {selectedEvent.mode}</p>
          <p>Meet Link: {selectedEvent.meetlink}</p>
          {/* <p>Participants: {selectedEvent.participantList}</p> */}
          <p>Participant List:</p>
          <ul style={{listStyle:'none',padding:'0px'}}>
            {selectedEvent.participantList.map((participant:string, index:number) => (
              <li key={index}>{participant}</li>
            ))}
          </ul>

          {/* Add more details based on your event structure */}
        </div>
      )}
      </Col>
    </Row>

   </Container>
  );
};

export default ViewEvent;
