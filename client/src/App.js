import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider  } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/private-route/PrivateRoute";
import AdminRoute from "./components/private-route/AdminRoute";

import NavbarPage from "./components/layout/Navbar";
import SideNav from "./components/layout/SideNav";
import Landing from "./components/layout/Landing";
import About from "./components/layout/about";
import FlashMessages from "./components/layout/FlashMessages";
import Tools from "./components/layout/tools";
import FAQ from "./components/layout/FAQ";
import Contact from "./components/layout/contact";


import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
// import dashboard from "./components/dashboard/dashboard";
import Dashboard from "./components/dashboard/dashboard";
import ConfirmAccount from "./components/ConfirmAccount";
import Profile from "./components/user/profile";
import User from "./components/user/user";
import UpdateUser from "./components/user/updateUser";


import Projects from "./components/projects/projects";
import Project from "./components/projects/project";
import addProject from "./components/projects/addProject";
import updateProject from "./components/projects/updateProject";
import myProjects from "./components/projects/MyProjects";


import HomeStudent from "./components/students/HomeStudent";
import Students from "./components/students/students";

import HomeInvestor from "./components/investor/HomeInvestor";
import Investors from "./components/investor/investors";

import DashbordClubs from "./components/dashboard/dashbordClubs" ;

import DashbordProjects from "./components/dashboard/dashbordProjects" ;
import DashbordUsers from "./components/dashboard/dashbordUsers" ;

import Clubs from "./components/club/clubs";
import Club from "./components/club/club";
import addclub from "./components/club/addclub";
import updateClub from "./components/club/updateClub";
import ConfirmYourAccount from "./components/ConfirmYourAccount"

import ConfirmInvitationForClub from "./components/ConfirmInvitationForClub";
import ConfirmInvitationForProject from "./components/ConfirmInvitationForProject";
import FooterPagePro from "./components/layout/Footer"

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  setCurrentUser(store.dispatch);
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
let MyContext;
class App extends Component {
  render() {
    return (
      <Provider store={store} context={MyContext} >
        <Router>
          <div className="App">
            <SideNav />
            <div className="app-content">
              <NavbarPage />
              <FlashMessages></FlashMessages>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/clubs" component={Clubs} />
                <Route exact path="/clubs/add" component={addclub} />
                <Route exact path="/clubs/:_id" component={Club} />
                <Route exact path="/clubs/:_id/update" component={updateClub} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/confirm-account" component={ConfirmAccount} />
                <Route exact path="/projects"  component={Projects} />
                <Route exact path="/MyProjects"  component={myProjects} />
                <Route exact path="/projects/:_id" component={Project} />
                <Route exact path="/clubs/:_clubId/projects/add" component={addProject } />
                <Route exact path="/projects/:_id/update" component={updateProject} />
                <Route exact path="/users/:_id/update" component={UpdateUser} />
                <Route exact path="/Confirm_Your_Account" component={ConfirmYourAccount} />


                <Route exact path="/about" component={About} />
                <Route exact path="/FAQ" component={FAQ} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/Home/student" component={HomeStudent} />
                <Route exact path="/students" component={Students} />
                <Route exact path="/Home/investors" component={HomeInvestor} />
                <Route exact path="/investors" component={Investors} />

                <AdminRoute exact path="/dashboard" component={Dashboard} />
                <AdminRoute exact path="/dashboard/users" component={DashbordUsers} />
                <AdminRoute exact path="/dashboard/users/:_id" component={User} />
                <AdminRoute exact path="/dashboard/clubs" component={DashbordClubs } />
                <AdminRoute exact path="/dashboard/clubs/:_id" component={Club} />
                <AdminRoute exact path="/dashboard/projects" component={DashbordProjects} />
                <AdminRoute exact path="/dashboard/projects/:_id" component={Project} />

                <Route exact path="/tools" component={Tools} />
                <Route exact path="/invite/project-owner" component={ConfirmInvitationForClub} />
                <Route exact path="/invite/club-president" component={ConfirmInvitationForClub} />
                <Route exact path="/invite/member" component={ConfirmInvitationForProject} />

                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/reset-password" component={ResetPassword} />
                <PrivateRoute exact path="/profile" component={Profile} />
              </Switch>
              <FooterPagePro/>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;