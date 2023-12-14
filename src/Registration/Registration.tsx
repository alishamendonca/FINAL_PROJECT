import { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UsersService from "../Axios/UsersService";

interface dataValues {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: string;
  id: number;
}

const validationSchema = Yup.object({
  fullname: Yup.string().max(20).required("*This is a required field"),
  email: Yup.string().email("*Invalid E-mail format").required("*This is a required field"),
  password: Yup.string()
    .min(6)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#*&])[A-Za-z\d@#*&]{8,10}$/, "*Invalid password format")
    .required("*This is a required field"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .min(6, "*Password must be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#*&])[A-Za-z\d@#*&]{8,10}$/, "*Invalid password format")
    .required("*This is a required field"),
  gender: Yup.string().oneOf(["male", "female", "other"], "Invalid gender").required('*This is a required field'),
  phone: Yup.string().matches(/^\+?[0-9]+$/, 'Invalid phone number').required('*This is a required field'),
});

const Registration = () => {
  const usersService = UsersService();
  const [userList, setUsersList] = useState<dataValues[]>([]);
  const [newUser, setNewUser] = useState<dataValues>({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    id: 0,
  });

  const addUser = async (values, action) => {
    try {
      await usersService().addUser(values);
      setNewUser({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        gender: "",
        id: 0,
      });
      console.log("User added successfully");
      // fetchUsers(); // Uncomment if needed
    } catch (error: unknown) {
      console.error('Error adding user: ', error.message);
    } finally {
      action.setSubmitting(false); // Ensure form is not stuck in submitting state
    }
  };
  

  return (
    <Container style={{ maxWidth: "400px", backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px", color: "black", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", marginTop: "50px" }}>
      <h2 style={{ backgroundColor: "rgb(178, 178, 42,0.8)", color: "white", marginTop: "0px", borderRadius: "10px", padding: "10px" }}>Sign Up</h2>
      <Formik
        initialValues={newUser}
        validationSchema={validationSchema}
        onSubmit={(values, action) => {
          addUser(values, action);
        }}
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
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formGroupFirstName">
                  <Form.Label className="left-align-label">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullname"
                    placeholder="Enter your full name"
                    value={values.fullname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.fullname && touched.fullname ? "input-error" : ""}
                  />
                  {errors.fullname && touched.fullname && (
                    <p className="error">{errors.fullname}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* Other input fields go here, similar to the Full Name field */}
            {/* Example: Email, Phone, Password, Confirm Password, Gender */}

            {/* Email */}
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formGroupEmail">
                  <Form.Label className="left-align-label">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? "input-error" : ""}
                  />
                  {errors.email && touched.email && (
                    <p className="error">{errors.email}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* Phone */}
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formGroupPhone">
                  <Form.Label className="left-align-label">Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.phone && touched.phone ? "input-error" : ""}
                  />
                  {errors.phone && touched.phone && (
                    <p className="error">{errors.phone}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* Password */}
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formGroupPassword">
                  <Form.Label className="left-align-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.password && touched.password ? "input-error" : ""}
                  />
                  {errors.password && touched.password && (
                    <p className="error">{errors.password}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* Confirm Password */}
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formGroupConfirmPassword">
                  <Form.Label className="left-align-label">Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.confirmPassword && touched.confirmPassword ? "input-error" : ""}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* Gender */}
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="left-align-label">Gender</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="Male"
                      type="radio"
                      name="gender"
                      value="male"
                      checked={values.gender === "male"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.gender && touched.gender ? "input-error" : ""}
                    />
                    <Form.Check
                      inline
                      label="Female"
                      type="radio"
                      name="gender"
                      value="female"
                      checked={values.gender === "female"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.gender && touched.gender ? "input-error" : ""}
                    />
                    <Form.Check
                      inline
                      label="Other"
                      type="radio"
                      name="gender"
                      value="other"
                      checked={values.gender === "other"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.gender && touched.gender ? "input-error" : ""}
                    />
                  </div>
                  {errors.gender && touched.gender && (
                    <p className="error">{errors.gender}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* Submit Button */}
            <Row className="mb-3">
              <Col>
                <Button disabled={!isValid || isSubmitting} type="submit" style={{ width: "100%" }}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Registration;
