import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import {Container,Button, Form, Input  } from 'reactstrap';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }
componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/profile"); // push user to dashboard when they login    }
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }}
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();

const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(userData)
this.props.loginUser(userData) // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  } ;

 render() {
    const { errors } = this.state;
return (
      <Container className="text-center">
        <div>          
        <Form noValidate onSubmit={this.onSubmit} className="form-style-8">
        <h2>Connectez-vous</h2>
        <input
          onChange={this.onChange}
          value={this.state.email}
          error={errors.email}
          id="email"
          type="email"
          placeholder="Email"
          className={classnames("form-control", {
            invalid: errors.email || errors.emailnotfound
          })}
          required
          autoFocus
        />
        <span className="red-text">
          {errors.email}
          {errors.emailnotfound}
        </span>
        <Input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  placeholder="Password"
                  className={classnames("form-control", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
        />
        <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
        </span>
        <br></br>
        <Button type="submit" className="boutonLogin">Connectez-vous</Button>
        </Form>
        Vous avez oublié votre mot de passe ? <Link to="/forgot-password">Cliquez ici</Link><br/>
        Vous n'êtes pas inscrit?<Link to="/register"> Cliquez ici</Link> 
        </div>
        <br/><br/>

      </Container>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);