import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import {Button,Input,Label } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName:"",
      email: "",
      address:"",
      password: "",
      passwordConfirmation: "",
      errors: {},
      modal: false,
      modal2: false


    };
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);

  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  toggle2() {
    this.setState(prevState => ({
      modal2: !prevState.modal2
    }));
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/Confirm_Your_Account");
    }
  }
componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation
    };
this.props.registerUser(newUser, this.props.history); 
  };
render() {
    const { errors } = this.state;
return (
      <div className="text-center" >
          <form noValidate onSubmit={this.onSubmit} className="form-style-8">
            <h2>Créez votre compte GRATUIT</h2>
              <div className="input-field col s12">
              Déjà inscrit ? <Link to="/login">Connectez-vous</Link>
                <Input
                  onChange={this.onChange}
                  value={this.state.firstName}
                  error={errors.firstName}
                  id="firstName"
                  type="text"
                  placeholder="Name"
                  className={classnames("", {
                    invalid: errors.firstName
                  })}
                />
              <span className="red-text">{errors.firstName}</span>
              </div>

              <div className="input-field col s12">
                <Input
                  onChange={this.onChange}
                  value={this.state.lastname}
                  error={errors.lastname}
                  id="lastname"
                  type="text"
                  placeholder="Last Name"
                  className={classnames("", {
                    invalid: errors.lastname
                  })}
                />
              <span className="red-text">{errors.lastname}</span>
              </div>

              <div className="input-field col s12">
                <Input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  placeholder="Email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
          
              </div>
              <div className="input-field col s12">
                <Input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  placeholder="Password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <Input
                  onChange={this.onChange}
                  value={this.state.passwordConfirmation}
                  error={errors.passwordConfirmation}
                  id="passwordConfirmation"
                  type="password"
                  placeholder="Confirm Password"
                  className={classnames("", {
                    invalid: errors.passwordConfirmation
                  })}
                />
                <span className="red-text">{errors.passwordConfirmation}</span>
              </div>
              <br/>
              <Label check>
            <Input type="checkbox"/>
            Je confirme que l’accepte <Link onClick={this.toggle}>les Politique de Confidentialité</Link> et <Link onClick={this.toggle2}>la Conditions d'Usage</Link>  
            </Label> 
            <br/>
            <br/>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><h2>Politique de confidentialité </h2></ModalHeader>
          <ModalBody>
          <h5>Politique de confidentialité et en matière de cookies </h5> <br/>
Cette Politique de confidentialité constitue un accord légal entre vous, l'utilisateur du site Web https://trustit.network.tn/  </ModalBody>
          <ModalFooter>
            <Button className="bouton" onClick={this.toggle}>Fermer</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className}>
          <ModalHeader toggle={this.toggle2}><h2>Conditions d'Usage </h2></ModalHeader>
          <ModalBody>
          <h5>Utilisation des renseignements </h5> <br/>
          Les raisons sociales, les logos du TrustiT.Network et tout autre élément contenu dans
           ce site ne peuvent être copiés, imités ou utilisés, en totalité ou en partie sans 
           l’autorisation préalable écrite de TrustiT.Network.</ModalBody>
          <ModalFooter>
            <Button className="bouton" onClick={this.toggle2}>Fermer</Button>
          </ModalFooter>
        </Modal>
              <div >
                <Button type="submit" className="boutonLogin">
                Soumettre           
                  </Button>
              </div>
            </form>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default  connect(
  mapStateToProps,
  { registerUser }
)(withRouter (Register));