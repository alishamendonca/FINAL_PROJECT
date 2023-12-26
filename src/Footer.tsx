
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#3887BE', // Footer background color
    color: 'white', // Text color
    padding: '10px', // Padding
    marginTop: '0px', // Margin from the top
  };

  return (
    <footer style={footerStyle}>
      <Container>
        <Row>
          <Col md={6}>
            {/* Add any footer content or links here */}
            <p>&copy; 2023 Your App Name. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-right">
            {/* Add any additional footer content or links here */}
            <p>Contact: worksphere@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
