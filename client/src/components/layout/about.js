import React from 'react';
import { Container, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Link} from "react-router-dom";

class ToastDismissExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      show2: false,
      show3: false,
      show4: false,

    };

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.toggle4 = this.toggle4.bind(this);

  }

  toggle() {
    this.setState({
      show: !this.state.show
    });
  }
  toggle2() {
    this.setState({
      show2: !this.state.show2
    });
  }
  toggle3() {
    this.setState({
      show3: !this.state.show3
    });
  }
  toggle4() {
    this.setState({
      show4: !this.state.show4
    });
  }
  render() {
    return (
      <div>
          <Container className="about-faq">
        <div className="my-3 bg-white rounded shadow-sm">
        <Link onClick={this.toggle}>Comment soumettre une annonce ?</Link>       
        <Toast isOpen={this.state.show}>
          <ToastBody>
          La première étape est de vous inscrire en tant qu'entrepreneur. Ensuite, vous pourrez soumettre une annonce en utilisant notre formulaire simple en ligne.
          </ToastBody>
        </Toast>
        </div>
        <div className="my-3 bg-white rounded shadow-sm">
        <Link onClick={this.toggle2}>Combien de temps dois-je attendre pour que mon annonce soit mise en ligne ?</Link>
        <Toast isOpen={this.state.show2}>
          <ToastBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ToastBody>
        </Toast>
        </div>
        <div className="my-3 bg-white rounded shadow-sm">
        <Link onClick={this.toggle3}> J'ai oublié mon mot de passe</Link>
        <Toast isOpen={this.state.show3}>
          <ToastBody>
          <Link to="/forgot-password"> Vous pouvez réinitialiser votre mot de passe ici. </Link> </ToastBody>
        </Toast>
        </div>
        <div className="my-3 bg-white rounded shadow-sm">
        <Link onClick={this.toggle4}>D'autres questions ?</Link>
        <Toast isOpen={this.state.show4}>
          <ToastBody>
          Nous envoyer un mail à networktrustit@gmail.com et nous vous répondons au plus vite.
         </ToastBody>
        </Toast>
        </div>
        </Container>
      </div>
    );
  }
}

export default ToastDismissExample;