
 
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,Container,Row,Col,Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
//import axios from "axios";
import UsersService from "../Axios/UsersService";
import { useNavigate } from "react-router-dom";


//import './style.css';
 
 
 
 interface FormData{   
    email:string;
    password:string;  
 
}
const dataValues:FormData={ 
    email:"", 
    password:"",
   
}
const validationSchema=Yup.object({

  email:Yup.string().email("*Invalid E-mail format").required("*This is a required field"),
  password:Yup.string().min(6).matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#*&])[A-Za-z\d@#*&]{8,10}$/,
  "*Invalid password format").required("*This is a required field"),
  confirmPassword: Yup.string()

});
 
 
const SignIn = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalType, setModalType] = useState(""); // 'success' or 'error'
  const [currentUser,setCurrentUser]=useState({
    email:'',
    password:''
  });
  const navigate = useNavigate();

  const handleShowModal = (title: string, body: string, type: string) => {
    setModalTitle(title);
    setModalBody(body);
    setModalType(type);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };
  const userService = UsersService();


  const onSubmit = async (values: any, actions: any) => {
    try {
      const response = await userService().getUserList();
      console.log('Response from the server', response);
      
      const users = response.data;
      console.log('User List', users);
    
      const user = users.find((u: any) => u.email.trim() === values.email.trim() && u.password.trim() === values.password.trim());
      console.log('User found', user);
    
      if (user) {
        handleShowModal("Success", "User signed in successfully!", "success");
        console.log('success');
      navigate('/')
      } else {
        handleShowModal("Error", "Invalid email or password", "error");
        console.log('error');
      }
    } catch (error) {
      console.error("Error signing in:", error);
      handleShowModal("Error", "Something went wrong. Please try again later.", "error");
    }
  console.log('Alisha');
    console.log(values);
    console.log(actions.isValid);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    actions.setSubmitting(false);
  };
 
 
 
  return (

    <Container style={{maxWidth:"400px",backgroundColor: "rgba(16, 75, 126, 0.5)",padding: "20px", borderRadius: "10px", color: "white"}}>
      <h2 style={{backgroundColor:" rgb(178, 178, 42,0.8)",color:"white",marginTop:"0px",borderRadius:"10px"}}>Sign In</h2>
      <Formik
      initialValues={dataValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
        isValid,
       }) => (
        <Form onSubmit={handleSubmit} autoComplete="off">
          {/* <Button onClick={() => console.log(errors)}>Errors</Button>
          <Button onClick={() => console.log(values)}>values</Button>  */}
         
         <Row className="mb-3">
          <Col>
             <Form.Group  controlId="formGroupEmail">
            <Form.Label className="left-align-label">Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={(e) => {
                handleChange(e);
                setCurrentUser({ ...currentUser, email: e.target.value });
              }}
             // onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? "input-error" : ""}
            />
            {errors.email && touched.email && (
              <p className="error">{errors.email}</p>
            )}
          </Form.Group>
          </Col>
         </Row>
        
         <Row className="mb-3">
          <Col>
            <Form.Group  controlId="formGroupPassword">
            <Form.Label className="left-align-label">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={(e) => {
                handleChange(e);
                setCurrentUser({ ...currentUser, password: e.target.value });
              }}
              //onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password ? "input-error" : ""}
            />
            {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
            )}
          </Form.Group>
          </Col>
 
         </Row>
        
 
           <Row className="mb-3">
              <Col>
                <Button disabled={!isValid || isSubmitting} type="submit" style={{ width: "100%" }}>
                  Submit
                </Button>
              </Col>
            </Row> 
                        {/* Modal for Success/Error messages */}
                        <Modal show={showModal} onHide={handleHideModal}>
              <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{modalBody}</Modal.Body>
              <Modal.Footer>
                <Button variant={modalType === "success" ? "success" : "danger"} onClick={handleHideModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

        </Form>
      )}
    </Formik>
   
    </Container>

 
   
  );
};
export default SignIn;
 
 