import React from "react";
import CreateJob from "../../components/CreateJob";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";


const AddJob  = () => (
<div>
    
    
    <Container style={{ marginTop: 30 }}>
    
      <Row>
        <Col size="md-12">
          
        < CreateJob />
          
        </Col>
      </Row>
    </Container>

    


</div>
);

export default AddJob;