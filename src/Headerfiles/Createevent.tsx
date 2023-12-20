import React, { useState,useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik } from "formik";
import * as Yup from 'yup';
import UsersService from "../Axios/UsersService";

interface EventFormData {
  eventname: string;
  date: string;
  time: string;
  location: string;
  participantList: string[];
  roles: string;
  mode: string | undefined;
  meetlink: string;
  eventDocument:File | null;
}
const validateForm = (values: { location?: string | undefined; meetlink?: string | undefined; eventname: string; date: string; time: string; participantList: string[]; roles: string; mode: NonNullable<"online" | "offline" | undefined>; }) => {
  //const errors: Partial<Record<keyof EventFormData, string>> = {};

  if ((values.mode === 'online' && !values.meetlink) || (values.mode === 'offline' && !values.location)) {
    throw new Yup.ValidationError('Validation failed', values, 'conditionalValidation');
  }
  // if (!Array.isArray(values.participantList) || values.participantList.length === 0) {
  //   throw new Yup.ValidationError('Please select at least one participant', values, 'participantListValidation');
  // }

};

const validationSchema = Yup.object({
  eventname: Yup.string().max(50).required("This field is required"),
  date: Yup.string().required("This field is required"),
  time: Yup.string().required("This field is required"),
  location: Yup.string(),
  participantList: Yup.array().min(1, "Please select at least one participant").required("This field is required"),
  roles: Yup.string().max(100).required("This field is required"),
  mode: Yup.string().oneOf(["online", "offline"]).required("This field is required"),
  meetlink: Yup.string(),
  eventDocument:Yup.mixed().test('fileSize','File size is too large.maximum size allowed is 10MB',(value)=>{
    if(!value){
      return true;
    }
    return (value as File).size <= 1024 * 1024 * 10;
  })
}).test('conditionalValidation', 'Validation failed', validateForm);



const Createevent: React.FC = () => {
  const [eventlist, setEventList] = useState({
    eventname: "",
    date: "",
    time: "",
    location: "",
    participantList: [] as string[],
    roles: "",
    mode: undefined,
    meetlink: "",
    eventDocument: null as File|null,
  });
  const [userArray, setUserArray] = useState<Array<{ fullname: string, id: number }>>([]);

  const usersService = UsersService();
  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await usersService().getUserList(); // Implement getUsers method in your Axios service
        setUserArray(response.data); // Assuming the structure is { "users": [...] }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const addevent = async (values: EventFormData) => {

   try {
    await usersService().addEvent(values);
    setEventList({
      eventname: "",
      date: "",
      time: "",
      location: "",
      participantList: [],
      roles: "",
      mode: undefined,
      meetlink: "",
      eventDocument: null as File|null,
    });
    console.log("Event added successfully");
  } catch (error) {

    console.error("Error submitting form:", error);
  }
    
    
   
  };
  //const userArray=usersService().getUserList();
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8}>
          <Formik
            initialValues={eventlist}
            validationSchema={validationSchema}
            onSubmit={(values:EventFormData) => {
              console.log("Form submitted with values:", values);
            
                addevent(values);
            
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
              errors,
              touched,

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
                    className={errors.eventname && touched.eventname ? "is-invalid" : ""}
                  />
                  {errors.eventname && touched.eventname && (
                    <p className="error">{errors.eventname}</p>
                  )}

                </Form.Group>

                <Form.Group>
                  <Form.Label>Date:</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                    className={errors.date && touched.date ? "is-invalid" : ""}
                  />
                  {errors.date && touched.date && (
                    <p className="error">{errors.date}</p>
                  )}

                </Form.Group>

                <Form.Group>
                  <Form.Label>Time:</Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.time}
                    className={errors.time && touched.time ? "is-invalid" : ""}
                  />
                 {errors.time && touched.time && (
                    <p className="error">{errors.time}</p>
                  )}

                </Form.Group>
                <Form.Group>
  <Form.Label>Participant List:</Form.Label>
  {userArray.map((user) => (
    <div key={user.id}>
      <Form.Check
        type="checkbox"
        id={`participant-${user.id}`}
        label={user.fullname}
        name="participantList"
        value={user.fullname}
        checked={values.participantList.includes(user.fullname)}
        onChange={(e) => {
          const isChecked = e.target.checked;
          setFieldValue("participantList", isChecked
            ? [...values.participantList, user.fullname]
            : values.participantList.filter((name) => name !== user.fullname));
        }}
      />
    </div>
  ))}
  {errors.participantList && touched.participantList && (
    <p className="error">{errors.participantList}</p>
  )}
</Form.Group>

              

                {/* <Form.Group>
                  <Form.Label>Participant List:</Form.Label>
                  {userArray.map((user) => (
                    <div key={user.id}>
                      <Form.Check
                        type="checkbox"
                        id={`participant-${user.id}`}
                        label={user.fullname}
                        name="participantList"
                        value={user.fullname}
                        checked={values.participantList.includes(user.fullname)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setEventList((prev) => ({
                            ...prev,
                            participantList: isChecked
                              ? [...prev.participantList, user.fullname]
                              : prev.participantList.filter((name) => name !== user.fullname),
                          }));
                        }}
                      />
                    </div>
                  ))}
                  {errors.participantList && touched.participantList && (
                    <p className="error">{errors.participantList}</p>
                  )}
                </Form.Group> */}


                


                

                {/* <Form.Group>
                  <Form.Label>Participant List:</Form.Label>
                  <Form.Control
                    type="text"
                    name="participantList"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.participantList}
                    className={errors.participantList && touched.participantList ? "is-invalid" : ""}
                  />
                  {errors.participantList && touched.participantList && (
                    <p className="error">{errors.participantList}</p>
                  )}

                </Form.Group> */}

                <Form.Group>
                  <Form.Label>Roles:</Form.Label>
                  <Form.Control
                    type="text"
                    name="roles"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.roles}
                    className={errors.roles && touched.roles ? "is-invalid" : ""}
                  />
                  {errors.roles && touched.roles && (
                    <p className="error">{errors.roles}</p>
                  )}

                </Form.Group>
                <Form.Group>
                  <Form.Label>Mode:</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="Online"
                      type="radio"
                      name="mode"
                      value="online"
                      checked={values.mode === "online"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Form.Check
                      inline
                      label="Offline"
                      type="radio"
                      name="mode"
                      value="offline"
                      checked={values.mode === "offline"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.mode && touched.mode && <p className="error">{errors.mode}</p>}
                </Form.Group>



                {values.mode==="online" && (
                      <Form.Group>
                      <Form.Label>Meeting Link:</Form.Label>
                      <Form.Control
                        type="text"
                        name="meetlink"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.meetlink}
                        className={errors.meetlink && touched.meetlink ? "is-invalid" : ""}
                      />
                       {errors.meetlink && touched.meetlink && (
                      <p className="error">{errors.meetlink}</p>
                    )}
                    </Form.Group>
                )}
                {values.mode==="offline" && (
                    <Form.Group>
                    <Form.Label>Location:</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.location}
                      className={errors.location && touched.location ? "is-invalid" : ""}
  
                    />
                    {errors.location && touched.location && (
                      <p className="error">{errors.location}</p>
                    )}
  
                  </Form.Group>
                )}
                <Form.Group>
                    <Form.Label>Upload Document:</Form.Label>
                    <Form.Control
                      type="file"
                      name="eventDocument"
                      onChange={(e) => setFieldValue("eventDocument", (e.currentTarget as HTMLInputElement).files?.[0] || null)}
                      onBlur={handleBlur}
                      className={errors.eventDocument && touched.eventDocument ? "is-invalid" : ""}
                    />
                    {errors.eventDocument && touched.eventDocument && (
                      <p className="error">{errors.eventDocument}</p>
                    )}
                  </Form.Group>



                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Create Event
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