import React from "react";
import Jumbo from "../../components/Jumbo";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
const Home  = () => (
<div>
  <Container style={{ marginTop: 30 }}>
    <Row>
      <Col size="md-12">
        
          <Jumbo />
        
      </Col>
    </Row>
  </Container>
</div>
);

export default Home;


