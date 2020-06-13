import React from 'react';
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import profileImage from './images/profile.png'
class SideNav extends React.Component {

  render() {
    const { user } = this.props.auth;
    let sidenav = <div></div>;
    if(this.props.isSideNavOpen && this.props.auth.isAuthenticated && this.props.auth.user.role === "admin") {
        sidenav = (
            <div className="sidenav">
                <div style={{padding: '20px'}}>
                    <img src={profileImage} width="100%"height="auto" style={{borderRadius: '10px'}} alt="TrustiT"/>
                    <br/>
                    <br/>
                    <a href ="/profile">Admin: {user.firstName}</a>  
                </div>
                <Link to ="/dashboard/clubs">Les Clubs</Link>
                <Link to ="/dashboard/projects">Les Projets</Link>
                <Link to ="/dashboard/users">Les Utilisateurs</Link>
                <Link to ="/">Les Statistiques </Link>
            </div>
        );
    }
    return (
        sidenav
    );
  }
}

SideNav.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    isSideNavOpen: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    isSideNavOpen: state.layout.isSideNavOpen
});
export default connect(
    mapStateToProps
)(withRouter(SideNav));