import React, { Component } from 'react';
import { getProject, addProjectMember} from "../../actions/ProjectsAction";
import { connect } from "react-redux";
import { withRouter, Link} from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup} from 'reactstrap';
import {MdEdit, MdGroupAdd} from "react-icons/md"
import { utils } from "../../utils/utils";

class Project extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      modal: false,
      currentProject: {
        name: 'Waiting'
      },
    }
    this.onEmailChange = this.onEmailChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.invite = this.invite.bind(this);
  }
  componentDidMount() {
        const id = this.props.match.params._id;
        
        this.props.getProject(id);
  }

  onEmailChange (event) {
    this.setState({ email: event.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newProject = {
      name: this.state.name,
    
    };
    this.props.addProjects(newProject, this.props.history);
  };

  toggleModal(project=false) {
    if(!project) {
      project= {
        _id: 0,
        name: 'Waiting'
      }
    }
    this.setState(prevState => ({
      modal: !prevState.modal ,
      currentProject: project
    }));
  }
  updateButton(project) {
    let test = false;
    if(this.props.auth.isAuthenticated && project._id) {
        if((project.owner._id === this.props.auth.user._id) || this.props.auth.user.role === "admin") {
          test = true;
        }
    };
    if(test){
      return (
        <Link className="btn btn-white" to={"/projects/"+project._id+"/update"} ><MdEdit size={16}/> </Link> 
      )
    }
  }

  inviteButton(project) {
    let test = false;
    if(this.props.auth.isAuthenticated && project._id) {
        if(project.owner._id === this.props.auth.user._id) {
          test = true;
        }
    };
    if(test){
      return (
        <Button className="bouton" onClick={this.toggleModal.bind(this, project)}><MdGroupAdd size={16}/> Membre </Button>
      )
    }
  }
  invite() {
    console.log('Email to invite: ', this.state.email);
    this.props.addProjectMember(this.state.currentProject._id, this.state.email);
    this.toggleModal();
  }

  renderStatus(project) {
    let status;
    if(project.status ==="approved") {
      status = (
        <div><stong>Status: </stong><span className="badge badge-success p-2">Approuvé</span></div>
      )
    }else if (project.status ==="rejected") {
      status = (
        <div><stong>Status: </stong><span className="badge badge-danger p-2">Refusé</span></div>
      )
    } else {
      status = (
        <div><stong>Status: </stong><span className="badge badge-warning p-2">En attente</span></div>
      )
    }
    return status;
  }
  
  render() {
      const project = this.props.project;
      if(!project._id) {
        return (
          <div className="container mt-5">
          </div>
        )
      }

      let members = [];
      if (Array.isArray(project.members )) {
        project.members.forEach(member => {
          members.push(
            <div className="media text-muted pt-3">
              <img className="mr-2" src="https://via.placeholder.com/32x32" alt="Member"></img>
              <p className="media-body pb-3 mb-0 small lh-125">
                <strong className="d-block text-gray-dark">{member.firstName} {member.lastName} </strong>
              </p>
          </div>
          )
        });
      } else {
        members.push(
          <div> No members for this project yet</div>
        )
      }

      return (
          <main class="container  mt-5 mb-5">
            <div className="row">
              <div className="col-sm-8 col-xs-12">
                <h2>
                {project.name}  {' '} {this.updateButton(project)}
                </h2>
                <p><strong>Club: </strong> {project.club.name}</p>
                <p>
                  {this.inviteButton(project)}
                </p>
                <p><strong>Ajouté: </strong> {utils.getDateFromISOString(project.date)}</p>
                <p>{this.renderStatus(project)}</p>
                <p>{project.description}</p>
                <h5>Proprietaire de projet</h5>
                <div className="media text-muted pt-3">
                  <img className="mr-2" src="https://via.placeholder.com/32x32" alt="Owner"></img>
                  <p className="media-body pb-3 mb-0 small lh-125">
                    <strong className="d-block text-gray-dark">{project.owner.firstName} {project.owner.lastName} </strong>
                  </p>
                 </div>
                <h5>Membres de projet</h5>
                  {members}
              </div>
              <div className="col-sm-4 col-xs-12">
                <img className="mr-3" src="https://via.placeholder.com/450x450" alt="" width="100%" />
              </div>
            </div>
            <Modal isOpen={this.state.modal}>
              <ModalHeader >Inviter un membre</ModalHeader>
              <ModalBody>
                <p>Inviter un membre au Project <strong>{this.state.currentProject.name}</strong></p>
                <FormGroup>
                          <input
                            className="form-control"
                            type="email"
                            placeholder="example@email.com"
                            onChange={this.onEmailChange}
                            value={this.state.email}
                          />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button className="bouton"  onClick={this.invite}>Inviter
                </Button>{' '}
                <Button className="bouton" onClick={this.toggleModal}>Annuler</Button>
              </ModalFooter>
            </Modal>
          </main>
      )
  }
}
Project.propTypes = {
    getProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    addProjectMember: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    project: state.projects.project
});

export default connect(
    mapStateToProps,
    {getProject, addProjectMember}
)(withRouter(Project));