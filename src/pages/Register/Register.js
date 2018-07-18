import React from "react";
import RegisterForm from "../../components/RegisterForm";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";

const Register  = () => (
    
    <div>
        <Container style={{ marginTop: 30 }}>
          <Row>
            <Col size="md-12">
              <RegisterForm />
            </Col>
          </Row>
        </Container>
        
    </div> 
  );

export default Register;