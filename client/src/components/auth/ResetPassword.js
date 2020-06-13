import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/authActions";
import {Container,Button, Form, Input  } from 'reactstrap';
import queryString from 'query-string'

class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
        email: "",
        token: "",
        password: "",
        passwordConfirmation: "",
        errors: {}
        };
    }
    componentDidMount() {

        // if (this.props.auth.isAuthenticated) {
        //     this.props.history.push("/profile");
        // }
        let email = queryString.parse(this.props.location.search).email;
        let token = queryString.parse(this.props.location.search).token;
        if(email && token ) {
            this.setState({
              email: email,
              token: token
            });
        } else {
            // show error component
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        this.props.resetPassword(this.state.email, this.state.token, this.state.password, this.state.passwordConfirmation);
    } ;

    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit} className="p-5 col-md-6 offset-md-3">
                    <p>Remloir le formulaire suivant pour re-initialiser votr mot de passe</p>
                    <div className="form-group">
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            onChange = {this.onChange}
                            placeholder = "Mot de passe"
                            required
                        ></Input>
                        <Input
                            type="password"
                            name="passwordConfirmation"
                            id="passwordConfirmation"
                            onChange = {this.onChange}
                            placeholder = "Confirmation de mot de passe"
                            required
                        ></Input>
                    </div>
                    <Button type="submit">Envoyer</Button>
                </Form>
            </Container>
        );
    }
}
ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { resetPassword }
)(ResetPassword);