import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Footer() {
  return (
    <footer className=" text-light py-5 position-relative">
      {/* Futuristic Border */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        border: '2px solid transparent',
        borderRadius: '15px',
        background: 'linear-gradient(90deg, rgba(0,255,255,0.5), rgba(255,0,255,0.5)) border-box',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.5)',
        opacity: '0.7',
        zIndex: '-1',
      }}></div>

      <Container>
        <Row className="text-center text-md-left">
          {/* Video Player Section */}
          <Col md={3} className="mb-4">
            <h5>
              <span role="img" aria-label="video player icon">📼</span> Video Player
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit velit maxime natus vero aspernatur blanditiis magni, molestias similique. Nesciunt, aspernatur?
            </p>
          </Col>

          {/* Links Section */}
          <Col md={2} className="mb-4">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="#landing" className="text-light">Landing Page</a></li>
              <li><a href="#home" className="text-light">Home Page</a></li>
              <li><a href="#history" className="text-light">Watch History</a></li>
            </ul>
          </Col>

          {/* Guides Section */}
          <Col md={2} className="mb-4">
            <h5>Guides</h5>
            <ul className="list-unstyled">
              <li><a href="#react" className="text-light">React</a></li>
              <li><a href="#react-bootstrap" className="text-light">React Bootstrap</a></li>
              <li><a href="#bootswatch" className="text-light">Bootswatch</a></li>
            </ul>
          </Col>

          {/* Contact Us Section */}
          <Col md={3} className="mb-4">
            <h5>Contact Us</h5>
            <Form className="mb-3">
              <Form.Group>
                <Form.Control 
                  type="email" 
                  placeholder="Enter your Email ID" 
                  className="mb-2"
                />
              </Form.Group>
              <Button variant="warning" type="submit">Subscribe</Button>
            </Form>
          </Col>


          {/* Social Media Section */}
          <Col md={2} className="mb-4">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-around">
              <a href="https://facebook.com" className="text-light" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" className="text-light" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" className="text-light" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" className="text-light" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </Col>
        </Row>
        
        {/* Copyright Section inside Footer */}
        <Row className="text-center">
          <Col>
            <p>
              Copyright © 2023 Media Player. Built with React.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
