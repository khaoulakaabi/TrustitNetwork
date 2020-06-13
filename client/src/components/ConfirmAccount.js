import React, { Component } from "react";
import queryString from 'query-string'
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { confirmAccount } from "../actions/userActions";
import { connect } from "react-redux";

class ConfirmAccount extends Component {

  componentDidMount() {
    let email = decodeURI(queryString.parse(this.props.location.search).email);
    let token = decodeURI(queryString.parse(this.props.location.search).token);
    if(email && token) {
        this.props.confirmAccount(email, token);
    }
  }

  render() {
      let response = this.props.confirmAccountResult;
      let component = '';
      if(response && response.email) {
          component = (
            <div class="jumbotron mt-20" style={{ marginTop: "5rem" }}>
                <h1 class="display-4">Hello</h1>
                <p class="lead">Your account has been confirmed, now you can login</p>
                <a class="btn btn-primary btn-lg" href="/login" role="button">Login</a>
            </div>
          );
      }else {
        component = (
            <div className="jumbotron mt-20 text-center">
                <h1 className="display-4">Invalid activation link</h1>
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

ConfirmAccount.propTypes = {
  confirmAccount: PropTypes.func.isRequired
  //confirmAccountResult: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  confirmAccountResult: state.users.confirmAccountResult
});
export default connect(
  mapStateToProps,
  { confirmAccount }
)(withRouter(ConfirmAccount));