import React, { useState, useEffect } from "react";
import { Button, Card,Form,Modal } from "react-bootstrap";
import UsersService from "../Axios/UsersService";
import BackgroundImg from '../assets/annie-spratt-sggw4-qDD54-unsplash.jpg';

interface Event{
  id:number;
  eventname:string;
  date: string;
  time: string;
  endtime:string;
  location: string;
  participantList: string[] | string;
  roles: string;
  mode: string;
  meetlink: string;
  eventDocument: string;

}
const EditEvent: React.FC = () => {
  const usersService = UsersService(); 
  const [eventList, setEventList] = useState<Event[]>([]);
  const [updateEventDetails,setUpdateEventDetails]=useState<Event>({
    id:0,
    eventname:'',
    date:'',
    time:'',
    endtime:'',
    location: '',
    participantList:'',
    roles:'',
    mode:'',
    meetlink:'',
    eventDocument: '',
  });
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  //const [eventIdToUpdate, setEventIdToUpdate] = useState<number | null>(null);
  const [userList, setUserList] = useState<string[]>([]);

useEffect(() => {
    // Fetch the list of usernames from the users array
    const fetchUserList = async () => {
      try {
        const response = await usersService().getUserList();
        debugger
        const users = response.data;
        const usernames = users.map((user: any) => user.fullname);
        setUserList(usernames);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  const fetchEvents = async () => {
    try {
      
      const response = await usersService().getEventList(); // Call the getEventList method

      setEventList(response.data || []); 
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
   
    fetchEvents();
  }, []);
  const deleteEvent= async(id:number)=>{
    try{
        const response = await usersService().deleteEvent(id);
        console.log("response",response);
        console.log("Event deleted successfully");
        fetchEvents();
    } catch (error: any){
        console.error("Error in deleting the user",error);
    }
};

const updateEvent= async (data:any)=>{
  try{
   
    console.log('event', data)
    setUpdateEventDetails({
      id:data.id,
      eventname:data.eventname,
      date: data.date,
      time: data.time,
      endtime:data.endtime,
      location: data.location,
      participantList: data.participantList,
      //participantList: data.participantList,
      roles: data.roles,
      mode: data.mode,
      meetlink: data.meetlink,
      eventDocument: data.eventDocument
    }
    )
    setShowUpdateModal(true);
    


  } catch(error:any){
    console.log('Error',error);

  }
 
};
const handleUpdateSubmit = async () => {
  try {
    await usersService().updateEvent(updateEventDetails.id, updateEventDetails);
    setUpdateEventDetails({
      id:0,
      eventname:'',
      date:'',
      time:'',
      endtime:'',
      location: '',
      participantList:'',
      roles:'',
      mode:'',
      meetlink:'',
      eventDocument: '',

    });
    setShowUpdateModal(false);
    fetchEvents();
  } catch (error) {
    console.error("Error updating event:", error);
  }
};

const handleCloseUpdateModal = () => {
  setUpdateEventDetails({
    id:0,
    eventname:'',
    date:'',
    time:'',
    endtime:'',
    location: '',
    participantList:'',
    roles:'',
    mode:'',
    meetlink:'',
    eventDocument: '',
  });
  setShowUpdateModal(false);
};


 
  return (
    <div style={{ backgroundImage: `url(${BackgroundImg})`, backgroundSize: 'cover', minHeight: '100vh', padding: '20px' }}>
      <h2>Edit Events</h2>
      {eventList.map((event) => (
        <Card key={event.id} className="mb-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <Card.Body>
            <Card.Title style={{color:'white'}}>{event.eventname}</Card.Title>
           
            <Button variant="danger" onClick={() => deleteEvent(event.id)}>
              Delete
            </Button>
            <Button variant="info" onClick={() => updateEvent(event)} style={{ marginLeft: '10px' }}>
              Update
            </Button>
          </Card.Body>
        </Card>
      ))}
          <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {updateEventDetails && (
            <Form>
              <Form.Group controlId="formEventName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event name"
                  value={updateEventDetails.eventname}
                  onChange={(e) =>
                    setUpdateEventDetails((prev) => ({ ...prev, eventname: e.target.value }) as Event)
                  }
                />
              </Form.Group>

              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={updateEventDetails.date}
                  onChange={(e) =>
                    setUpdateEventDetails((prev) => ({ ...prev, date: e.target.value }) as Event)
                  }
                />
              </Form.Group>

              <Form.Group controlId="formTime">
                <Form.Label> StartTime</Form.Label>
                <Form.Control
                  type="time"
                  value={updateEventDetails.time}
                  onChange={(e) =>
                    setUpdateEventDetails((prev) => ({ ...prev, time: e.target.value }) as Event)
                  }
                />
              </Form.Group>
              <Form.Group controlId="formTime">
                <Form.Label> End Time</Form.Label>
                <Form.Control
                  type="time"
                  value={updateEventDetails.endtime}
                  onChange={(e) =>
                    setUpdateEventDetails((prev) => ({ ...prev, endtime: e.target.value }) as Event)
                  }
                />
              </Form.Group>
              <Form.Group controlId="formLocation">
  <Form.Label>Location</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter location"
    value={updateEventDetails.location}
    onChange={(e) =>
      setUpdateEventDetails((prev) => ({ ...prev, location: e.target.value }) as Event)
    }
  />
</Form.Group>
<Form.Group controlId="formParticipantList">
    <Form.Label>Participant List</Form.Label>
    {userList.map((username) => (
      <Form.Check
        key={username}
        type="checkbox"
        label={username}
        checked={updateEventDetails?.participantList.includes(username)}
        onChange={(e) => {
          const isChecked = e.target.checked;
          setUpdateEventDetails((prev) => ({
            ...prev,
            participantList: isChecked
              ? [...prev.participantList, username]
              : prev.participantList.filter((name) => name !== username),
          }) as Event);
        }}
      />
    ))}
  </Form.Group>


<Form.Group controlId="formRoles">
  <Form.Label>Event Details</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter roles"
    value={updateEventDetails.roles}
    onChange={(e) =>
      setUpdateEventDetails((prev) => ({ ...prev, roles: e.target.value })as Event)
    }
  />
</Form.Group>

<Form.Group controlId="formMode">
  <Form.Label>Mode</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter mode"
    value={updateEventDetails.mode}
    onChange={(e) =>
      setUpdateEventDetails((prev) => ({ ...prev, mode: e.target.value })as Event)
    }
  />
</Form.Group>

<Form.Group controlId="formMeetlink">
  <Form.Label>Meet Link</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter meet link"
    value={updateEventDetails.meetlink}
    onChange={(e) =>
      setUpdateEventDetails((prev) => ({ ...prev, meetlink: e.target.value })as Event)
    }
  />
</Form.Group>
<Form.Group controlId="formEventDocument">
  <Form.Label>Upload Document</Form.Label>
  <Form.Control
    type="text"
    placeholder="Upload Document"
    value={updateEventDetails.eventDocument}
    onChange={(e) =>
      setUpdateEventDetails((prev) => ({ ...prev, eventDocument: e.target.value })as Event)
    }
  />
</Form.Group>

   </Form>
   )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
};

export default EditEvent;
