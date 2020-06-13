import React from 'react';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
        <div  style={{ marginTop: "2rem" }}>
        <Container>
        <Form className="form-style-8" >
        <Row form>
        <Col md={6}>
            <FormGroup>
              <Label >Nom</Label>
              <Input type="text" name="name" id="name"  />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label >Email</Label>
              <Input type="text" name="email" id="email" />
            </FormGroup>
          </Col> 
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label >Adresse</Label>
              <Input type="text" name="adresse" id="adresse" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label >Telephone</Label>
              <Input type="text" name="tel" id="tel"  />
            </FormGroup>
          </Col>
        </Row>

     
        <FormGroup>
          <Label for="exampleTelephone">Message</Label>
          <Input type="textarea" name="Telephone" id="exampleTelephone" />
        </FormGroup>
        
        <Button  className="bouton">Envoyer</Button>
        {''} <Button className="boutonModifier" >Annuler</Button>
                
      </Form>
      </Container>
      </div>
    );
  }
}