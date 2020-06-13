import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { forgotPassword } from "../../actions/authActions";
import {Container,Button, Form, Input  } from 'reactstrap';

class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
        email: "",
        errors: {}
        };
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
        this.props.history.push("/profile");
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        console.log('on submit', this.state.email);
        this.props.forgotPassword(this.state.email);
    } ;

    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit} className="p-5 col-md-6 offset-md-3">
                    <p>Vous avez oublié votre mot de passe ? Pas de panique !</p>
                    <div className="form-group">
                        <Input
                            type="text"
                            name="email"
                            id="email"
                            onChange = {this.onChange}
                            placeholder = "email@example.com"
                            required
                        ></Input>
                    </div>
                    <Button type="submit" className="bouton">Envoyer</Button>
                </Form>
            </Container>
        );
    }
}
ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { forgotPassword }
)(ForgotPassword);