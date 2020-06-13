import React, { Component } from 'react';
import { getUser} from "../../actions/userActions";
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { Button} from 'reactstrap';
import {MdEdit, MdGroupAdd} from "react-icons/md"

class User extends Component {

  componentDidMount() {
        const id = this.props.match.params._id;
        this.props.getUser(id);
  }
  renderStatus(project) {
    let status;
    if(project.status ==="approved") {
      status = (
        <span className="badge badge-success p-2">Approuvé</span>
      )
    }else if (project.status ==="rejected") {
      status = (
        <span className="badge badge-danger p-2">Refusé</span>
      )
    } else {
      status = (
        <span className="badge badge-warning p-2">En attente</span>
      )
    }
    return status;
  }

  render() {
      const user = this.props.user;
      if(!user) {
        return (
          <div className="container mt-5">
            No User with this ID
          </div>
        )
      }
      let club = [];
      if (user.club) {
          club.push(
            <div className="media text-muted pt-3">
              <img className="mr-2" src="https://via.placeholder.com/32x32" alt="club"></img>
              <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong className="d-block text-gray-dark">{this.props.user.club.name} </strong>
              </p>
          </div>
          )
        ;
      }
      let projects = [];
      if (Array.isArray(user.projects)) {
        user.projects.forEach(project => {
          projects.push(
            <div className="media text-muted pt-3">
              <img className="mr-2" src="https://via.placeholder.com/32x32" alt="Member"></img>
              <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong className="d-block text-gray-dark">{project.name} {' '}{this.renderStatus(project)}</strong>
              </p>
          </div>
          )
        });
      } else {
        projects.push(
          <div> No projects for this user yet</div>
        )
      }

      return (
          <main class="container  mt-5">
            <div className="d-flex align-items-center p-3 my-3 text-white-50 rounded shadow-sm project-heaerd">
              <img className="mr-3" src="https://via.placeholder.com/48x48" alt="" width="48" height="48" />
              <div className="lh-100">
                <h3 className="mb-0 text-white lh-100">{user.firstName} {user.lastName}</h3>
                <small>{user.date}</small>
              </div>
            </div>
            <div className="project-info">
              <p><strong>Email: </strong> {user.email}</p>
              <div className="my-3 p-3 bg-white rounded shadow-sm">
              <h6 className="border-bottom border-gray pb-2 mb-0">Club :</h6>
               {club}       
             </div>
            </div>
            <div className="my-3 p-3 bg-white rounded shadow-sm">
              <h6 className="border-bottom border-gray pb-2 mb-0">Projets :</h6>
              {projects}

            </div>
            <Button className="bouton" href= {"/dashboard/users/update/"+ user._id} ><MdEdit size={32}/> Modifier </Button>
            <Button className="bouton" ><MdGroupAdd size={32}/> Membre </Button>
            <Button className="bouton" ><MdGroupAdd size={32}/> Propriétaire </Button>
            <Button className="bouton" ><MdGroupAdd size={32}/> Président </Button>


            

          </main>
          
      )
  }
}
User.propTypes = {
    getUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    user: state.users.user
});

export default connect(
    mapStateToProps,
    { getUser}
)(withRouter(User));