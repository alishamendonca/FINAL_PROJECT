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
        endtime:string;
        location: string;
        participantList:string[];
        roles:string;
        mode:string;
        meetlink:string;
        eventDocument: string;

        
      }
      

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const usersService = UsersService(); 

  useEffect(() => {
    
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
    
    setSelectedEvent(event);
  };

  return (
   <div style={{ backgroundImage: `url(${BackgroundImg})`, backgroundSize: 'cover', minHeight: '100vh',padding:'0px',width:'100%' }}>
    <Container >
    <Row className="justify-content-center">
      <Col xs={12} md={8} style={{ padding: '0'}}>
      <h1 className="text-center mt-4 mb-3">Event List</h1>
      <ListGroup >
        {events.map(event => (
          <ListGroup.Item key={event.id} className="d-flex justify-content-between align-items-center" style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
            <span style={{color:'wheat'}}>{event.eventname}</span>
            <Button variant="info" onClick={() => handleDetailsButtonClick(event)}>
              Show Details
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      
      {selectedEvent && (
        <div className="mt-3"  style={{ backgroundColor: '#fff',marginBottom:'20px', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ textDecoration: 'underline' }}>Details for {selectedEvent.eventname}</h2>
          <p>Date: {selectedEvent.date}</p>
          <p>Start Time: {selectedEvent.time}</p>
          <p>End Time: {selectedEvent.endtime}</p>
          <p>Location: {selectedEvent.location}</p>
          <p>Event Details: {selectedEvent.roles}</p>
          <p>Mode: {selectedEvent.mode}</p>
          <p>Meet Link: {selectedEvent.meetlink}</p>
          {/* <p>Participants: {selectedEvent.participantList}</p> */}
          <p>Participant List:</p>
          <ul style={{listStyle:'none',padding:'0px'}}>
            {selectedEvent.participantList.map((participant:string, index:number) => (
              <li key={index}>{participant}</li>
            ))}
          </ul>
          {selectedEvent.eventDocument && (
  <div>
    <p>Document: <Button style={{ backgroundColor: '#BF3131', borderColor: '#BF3131' }} onClick={() => window.open(selectedEvent.eventDocument, '_blank')}>View Document</Button></p>
  </div>
)}


          
        </div>
      )}
      </Col>
    </Row>

   </Container>
   </div>
  );
};

export default ViewEvent;
