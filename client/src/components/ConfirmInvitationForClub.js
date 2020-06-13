import React, { Component } from "react";
import queryString from 'query-string'
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { confirmInvitationForClub, checkInvitationLinkForClub } from "../actions/userActions";
import { connect } from "react-redux";
import classnames from "classnames";
import {Button,Input } from 'reactstrap';

class ConfirmInvitationForClub extends Component {
  constructor() {
    super();
    this.state = {
      email: false,
      token: false,
      firstName: "",
      lastName:"",
      function:"",
      address:"",
      password: "",
      passwordConfirmation: "",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    let email = decodeURI(queryString.parse(this.props.location.search).email);
    let token = decodeURI(queryString.parse(this.props.location.search).token);
    console.log('email', email);
    if(email && token) {
      this.setState({
        email: email,
        token: token
      });
      this.props.checkInvitationLinkForClub(email, token);
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit(e) {
    e.preventDefault();
    const userData = {
        firstName: this.state.firstName,
        lastName: this.state.lastname,
        function: this.state.function,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation
    };
    this.props.confirmInvitationForClub(this.state.email, this.state.token, userData);
  }

  render() {
      const { errors } = this.state;
      let checkResult = this.props.checkInvitationForClubResult;
      let component = '';
      if(checkResult && checkResult.email) {
          component = (
            <div class="jumbotron mt-20">
              <h1 class="display-4">Hello</h1>
              <p class="lead">Please complete your informations to confirm your account</p>
              <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <Input
                  onChange={this.onChange}
                  value={this.state.firstName}
                  error={errors.firstName}
                  id="firstName"
                  type="text"
                  placeholder="Name"
                  className={classnames("", {
                    invalid: errors.name
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
          value={this.state.function}
          error={errors.function}
          type="text"
          name="function"
          id="function" 
          placeholder="Function"
          className={classnames("", {
                    invalid: errors.function
                  })}>

          </Input>
          <span className="red-text">{errors.function}</span>
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
              <div >
                <Button type="submit">
                Send              
                  </Button>
              </div>
            </form>
            </div>
          );
      }else if(checkResult && checkResult.error) {
        component = (
            <div className="jumbotron mt-20 text-center">
                <h1 className="display-4">Invalid Invitation link</h1>
            </div>
          );
      }else {
        component = (
          <div className="p-100 text-center">
            <div className="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        );
      }
      let confirmResult = this.props.confirmInvitationForClubResult;
      console.log('confirmResult', confirmResult);
      if(confirmResult && confirmResult.email) {
        component = (
          <div class="jumbotron mt-20">
            <h1 class="display-4">Hello</h1>
            <p class="lead">Your account has been confirmed, now you can login</p>
            <a class="btn btn-primary btn-lg" href="/login" role="button">Login</a>
          </div>
        );
      }
    return(
        <div className="container">
            {component}
        </div>
    );
  }
}

ConfirmInvitationForClub.propTypes = {
  confirmInvitationForClub: PropTypes.func.isRequired,
  confirmInvitationForClubResult: PropTypes.object.isRequired,
  checkInvitationLinkForClub: PropTypes.func.isRequired,
  checkInvitationForClubResult: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  confirmInvitationForClubResult: state.users.confirmInvitationForClubResult,
  checkInvitationForClubResult: state.users.checkInvitationForClubResult
});
export default connect(
  mapStateToProps,
  { confirmInvitationForClub, checkInvitationLinkForClub }
)(withRouter(ConfirmInvitationForClub));