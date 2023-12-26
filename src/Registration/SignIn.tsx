
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,Container,Row,Col,Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import UsersService from "../Axios/UsersService";
import { useNavigate,Link } from "react-router-dom";
import BackgroundImg from '../assets/annie-spratt-sggw4-qDD54-unsplash.jpg';


 
 
 
 interface FormData{   
    email:string;
    password:string;
    role:string;
 
}
const dataValues:FormData={ 
    email:"", 
    password:"",
    role:""
   
}
const validationSchema=Yup.object({

  email:Yup.string().email("*Invalid E-mail format").required("*This is a required field"),
  password:Yup.string().min(6).matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#*&])[A-Za-z\d@#*&]{8,10}$/,
  "*Invalid password format").required("*This is a required field"),
  role:Yup.string().oneOf(["organizer", "user"], "Invalid role").required('*This is a required field')

});
 
 
const SignIn = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalType, setModalType] = useState(""); // 'success' or 'error'
  const [currentUser,setCurrentUser]=useState({
    email:'',
    password:'',
    role:''
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
    
      const user = users.find((u: any) => u.email.trim() === values.email.trim() && u.password.trim() === values.password.trim() && u.role.trim()===values.role.trim() );
      console.log('User found', user);
    
      if (user) {
        handleShowModal("Success", "User signed in successfully!", "success");
        localStorage.setItem("token",'true');
        localStorage.setItem("userLoggedIn", JSON.stringify(user));
        console.log('success');
      navigate('/homepage/')
      window.location.reload();
      } else {
        handleShowModal("Error", "Invalid email,password or role", "error");
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
    <div style={{ backgroundImage: `url(${BackgroundImg})`, backgroundSize: "cover", minHeight: "100vh",display: "flex",alignItems: "center",justifyContent: "center"}}>
       <Container style={{maxWidth:"400px",backgroundColor: "rgba(16, 75, 126, 0.5)",padding: "20px", borderRadius: "10px", color: "white",marginTop:"30px"}}>
      <h2 style={{color:"white",marginTop:"0px",marginBottom:"20px",borderRadius:"10px"}}>Sign In</h2>
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
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="left-align-label">Role</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="Organizer"
                      type="radio"
                      name="role"
                      value="organizer"
                      checked={values.role === "organizer"}
                      onChange={(e) => {
                        handleChange(e);
                        setCurrentUser({ ...currentUser, role: e.target.value });
                      }}
                      //onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.role && touched.role ? "input-error" : ""}
                    />
                    <Form.Check
                      inline
                      label="User"
                      type="radio"
                      name="role"
                      value="user"
                      checked={values.role === "user"}
                      onChange={(e) => {
                        handleChange(e);
                        setCurrentUser({ ...currentUser, role: e.target.value });
                      }}
                      //onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.role && touched.role ? "input-error" : ""}
                    />
                   
                  </div>
                  {errors.role && touched.role && (
                    <p className="error">{errors.role}</p>
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
    <p style={{marginTop:"10px",textAlign:"center"}}>
       Don't have an account? <Link to="/registration">Register</Link>
    </p>
   
    </Container>
    </div>
   

 
   
  );
};
export default SignIn;
 
 