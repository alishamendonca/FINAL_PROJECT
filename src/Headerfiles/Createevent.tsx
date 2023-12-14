import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik } from "formik";

import UsersService from "../Axios/UsersService";

interface EventFormData {
  eventname: string;
  date: string;
  time: string;
  location: string;
  participantList: string;
  roles: string;
  mode: string | undefined;
  meetlink: string;
}

const Createevent: React.FC = () => {
  const [eventlist, setEventList] = useState({
    eventname: "",
    date: "",
    time: "",
    location: "",
    participantList: "",
    roles: "",
    mode: undefined,
    meetlink: "",
  });

  const usersService = UsersService();

  const addevent = async (values: EventFormData) => {
    console.log("Form Data:", values);
    try {
      await usersService().addEvent(values);
      setEventList({
        eventname: "",
        date: "",
        time: "",
        location: "",
        participantList: "",
        roles: "",
        mode: undefined,
        meetlink: "",
      });
      console.log("Event added successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8}>
          <Formik
            initialValues={eventlist}
            onSubmit={(values) => {
              console.log("Form submitted with values:", values);
              addevent(values);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Event Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="eventname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.eventname}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Date:</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Time:</Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.time}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Location:</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.location}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Participant List:</Form.Label>
                  <Form.Control
                    type="text"
                    name="participantList"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.participantList}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Roles:</Form.Label>
                  <Form.Control
                    type="text"
                    name="roles"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.roles}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Mode:</Form.Label>
                  <Form.Control
                    type="text"
                    name="mode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mode}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Meeting Link:</Form.Label>
                  <Form.Control
                    type="text"
                    name="meetlink"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.meetlink}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Createevent;
