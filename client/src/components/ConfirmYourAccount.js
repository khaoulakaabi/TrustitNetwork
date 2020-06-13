import React from 'react';
import { Jumbotron ,Container } from 'reactstrap';

export default class ConfirmYourAccount extends React.Component {

  render() {
    return (
        <div className="page pt-4 pb-4">
        <Container>
        <Jumbotron style={{ marginTop: "5rem" }} >
        <Container fluid>
          <h1 className="title">Valider votre adresse e-mail</h1>
        <p> Merci de confirmer votre compte ! </p>
      </Container>
      </Jumbotron>
      </Container>
</div>
    );
  }
}