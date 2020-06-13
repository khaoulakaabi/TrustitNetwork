import { Link } from "react-router-dom";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { toggleSideNav } from "../../actions/layoutActions";
import PropTypes from "prop-types";
import {Button} from "reactstrap"
import {  
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Dropdown, DropdownMenu, DropdownItem, DropdownToggle,
  NavItem
} from 'reactstrap';

import logo from './images/TN.png'
import profileImage from './images/profile.png'
class AppNavbar extends Component {
  state = {
    top: false,
    left: false,
    isOpen: false,
    dropdownOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
          
    var navbarRight;
    var menuAdmin;
    var dashboardLink;
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role === "admin") {
        menuAdmin = (
          <span style={{color: '#fff', cursor: 'pointer', marginLeft: '15px'}} onClick={this.props.toggleSideNav}>
            <i className="material-icons">menu</i>
          </span>
        );
        dashboardLink = <Link to ="/dashboard" className="dropdown-item" >Dashboard</Link>
      }
      navbarRight = (<Nav color="light" >

        <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
            <DropdownToggle nav caret>
              <img className="rounded" src={profileImage} width="30" alt="Profile" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem  header>{this.props.auth.user.firstName} {this.props.auth.user.lastName}</DropdownItem>
              <DropdownItem divider />
              <Link to="/profile" className="dropdown-item">Mon Profil</Link>
              <Link to="/MyProjects" className="dropdown-item">Mes Projets</Link>
              {dashboardLink}
              <DropdownItem onClick={this.onLogoutClick}>Logout</DropdownItem>
            </DropdownMenu>
        </Dropdown>
      </Nav>);
    } else {
      navbarRight = (<Nav className="my-2 my-lg-0 navbar-nav with-styler">
        <NavItem>
          <Link to="/login" className="nav-item">
          Se Connecter
        </Link>
        <Button href="/register" className="nav-item">
          S'inscrire
        </Button>
        </NavItem>
      </Nav>
      );
    }
    return (
      <div>
      <Navbar expand="md" className=" navbar-dark bg-dark navbar-nav with-style">
        {menuAdmin}
        <NavbarBrand href="/"  className="mr-auto">
          <Container>
             <img src={logo} height="50" alt="TrustiT"/>
          </Container>
         </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
        
        <Nav className="ml-auto my-2 my-lg-0 navbar-nav with-style" navbar>
        <NavItem >
            <Link to="/" className="nav-item"  >
              <span>Accueil</span>
            </Link>            
            </NavItem>
            <NavItem >
            <Link to="/projects" className="nav-item"  >
              <span>Projets</span>
            </Link>            
            </NavItem>
            <NavItem>
            <Link to="/clubs" className="nav-item">
              Clubs
            </Link>             
            </NavItem>
            <NavItem>
            <Link to="/tools" className="nav-item">
             Outils
            </Link>
            </NavItem>
            <NavItem>
            <Link  to="/about" className="nav-item">
             A propos 
            </Link> 
            </NavItem>
            <NavItem>
            <Link  to="/contact" className="nav-item">
             Contact
            </Link> 
            </NavItem>
          </Nav>
          {navbarRight}
        </Collapse>
      </Navbar>
      
  </div>
    );
  }
}

AppNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  toggleSideNav: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  auth: state.auth,
  toggleSideNav: state.layout.toggleSideNav
});

export default connect(
  mapStateToProps,
  { logoutUser, toggleSideNav }
)(AppNavbar);