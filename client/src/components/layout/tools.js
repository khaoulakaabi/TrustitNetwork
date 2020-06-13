import React from 'react';
import video from './images/video.svg'
import doc from './images/doc.svg'
import tutto from './images/tutto.svg'
import { Container } from 'reactstrap';

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
                 <div className="row">
                    <div class="col-sm-4 col-xs-12 text-center" >
                      <h3>Tutoriels </h3>
                      <img src={tutto} height="150" alt="tutto"/>
                    </div>
                    <div class="col-sm-4 col-xs-12 text-center">
                      <h3>Documents Utils</h3>
                      <img src={doc} height="150" alt="doc"/>
                    </div>
                    <div class="col-sm-4 col-xs-12 text-center">
                      <h3>Vidéos</h3>
                      <img src={video} height="150" alt="video"/>
                    </div>
                 </div>
                </Container>
          </div>
    );
  }
}