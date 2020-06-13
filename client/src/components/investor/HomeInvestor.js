import React from 'react';
import video from '../layout/images/money.svg'
import doc from '../layout/images/search.svg'
import tutto from '../layout/images/3.svg'
import { Container,Button } from 'reactstrap';

export default class Tools extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
         <div className="mt-5 mb-5">
               <Container>
                 <div className="row" style={{ marginTop: "7rem" }}>
                    <div class="col-sm-4 col-xs-12 text-center" >
                      <h3> S'inscrire </h3>
                      <h5> Creer votre compte ! </h5>
                      <img src={tutto} height="150" alt="tutto"/>
                    </div>
                    <div class="col-sm-4 col-xs-12 text-center">
                      <h3>Consulter les projets </h3>
                      <h5> Visiter la liste des projets! </h5>
                      <img src={doc} height="150" alt="doc"/>
                    </div>
                    <div class="col-sm-4 col-xs-12 text-center">
                      <h3>TrustiT.Network Premium </h3>
                      <h5> Contacter les propriétaires des projets</h5>
                      <img src={video} height="150" alt="video"/>
                    </div>
                 </div>
                 <br/>  
                 <br/>

                 <div style={{textAlign: "center"}}>
                 <Button className="bouton" href="/register" >
                  Commencez !
                </Button> 
                </div>
                </Container>
          </div>
    );
  }
}