import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AdminRoute = ({ component: Component, auth, ...rest }) => (
  
  <Route
    {...rest}
        render={props => {
            console.log("loaaaaading", auth.loading);
            if (auth.isAuthenticated && auth.user.role==="admin") {
                return <Component {...props} />
            } else if (!auth.isAuthenticated && auth.user._id !== 0) {
                return <Redirect to="/" />
            }
        }
    }
  />
);
AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(AdminRoute);