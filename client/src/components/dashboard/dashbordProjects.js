import React, { Component } from 'react';
import queryString from 'query-string'
import {FormGroup ,Input, Button, Pagination , Modal, ModalHeader, ModalBody, ModalFooter, PaginationItem, PaginationLink,Table} from 'reactstrap';
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getProjects, deleteProject, getProject, updateProject, approveProject, rejectProject } from "../../actions/ProjectsAction";
import { connect } from "react-redux";

class DashbordProjects extends Component {
  currentProject = {
    name: 'Waiting'
  }
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      currentPage: 1,
      modal: false,
      currentProject: {
        _id: 0,
        name: 'Waiting'
      },
      currentStatus: 'all',
    };
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.renderApprovationButtons = this.renderApprovationButtons.bind(this);
    this.renderStatus = this.renderStatus.bind(this);
    this.approve = this.approve.bind(this);
    this.reject = this.reject.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

  }

  componentDidMount() {
    let page = queryString.parse(this.props.location.search).page;
    let status = queryString.parse(this.props.location.search).status;
    if (!page) page = 1;
    if (!status) status = "all";
    this.setState({
      currentPage: page,
      currentStatus: status
    });
    // we have to use the callback if we will use this.state because setState is async
    this.props.getProjects(page, 5, status);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onStatusChange(event) {
    this.setState({ currentStatus: event.target.value }, () => {
      this.props.getProjects(1, 5, this.state.currentStatus);
    });
  };
  onDeleteClick = (id) => {
    this.props.deleteProject(id);
    this.props.getProjects(this.state.currentPage, 5, this.state.currentStatus);
    this.toggleModal();
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

  approve(projectId) {
    this.props.approveProject(projectId);
    this.props.getProjects(this.state.currentPage, 5, this.state.currentStatus);
  }
  reject(projectId) {
    this.props.rejectProject(projectId);
    this.props.getProjects(this.state.currentPage, 5, this.state.currentStatus);
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
  renderApprovationButtons(project) {
    let buttons;
    console.log('renderApprovationButtons', project);
    if (project.status === "rejected") {
      buttons = (
        <span>
          {' '} <Button onClick={this.approve.bind(this, project._id)} className="btn btn-success"><i className="material-icons">check</i> </Button>
        </span>
      );
    } else if (project.status === 'approved') {
      buttons = (
        <span>
          {' '} <Button onClick={this.reject.bind(this, project._id)} className="btn btn-danger"><i className="material-icons">cancel</i></Button>
        </span>
      );
    } else {
      buttons = (
        <span>
          {' '} <Button onClick={this.approve.bind(this, project._id)} className="btn btn-success"><i className="material-icons">check</i> </Button>
          {' '} <Button onClick={this.reject.bind(this, project._id)} className="btn btn-danger"><i className="material-icons">cancel</i></Button>
        </span>
      );
    }
    return buttons;
  }
  

  render() {
    const projects = this.props.projects.projects.docs;
    const project = this.props.project;
    const pages = this.props.projects.projects.pages;
    const paginationItems = [];
    for (var i = 1; i <= pages; i++) {
      paginationItems.push(<PaginationItem >
        <PaginationLink href={"?page=" + i + "&status=" + this.state.currentStatus}>
          {i}
        </PaginationLink>
      </PaginationItem>);
    }
    let members = [];
      if (Array.isArray(project.members )) {
        project.members.forEach(member => {
          members.push(
                <strong className="d-block text-gray-dark">{member.firstName} {member.lastName} </strong>
          )
        });
      } else {
        members.push(
          <div> No members for this project yet</div>
        )
      }
    return (
      <div className="container" div style={{ marginTop: "2rem" }}>
        <th>
                <FormGroup className="m-20">
                  <Input
                    type="select"
                    bsSize="lg"
                    onChange={this.onStatusChange}
                    value={this.state.currentStatus}
                    id="currentUniversity">
                    <option value="all">Choisissez un status</option>
                    <option value="approved">Approuvé</option>
                    <option value="rejected">Refusé</option>
                    <option value="pending">En attente</option>
                  </Input>
                </FormGroup>
              </th>
        <Table responsive className="dashboard-table">
          <thead>
            <tr>
              <th>Nom </th>
              <th>Status </th>
              <th>Propriétaire</th>
              <th>Membres</th>
              <th>Club</th>
              <th>Gestion</th>
              <th>Confirmation</th>

            </tr>
          </thead>

          <tbody>
            {Array.isArray(projects) && projects.length > 0 && projects.map((project, index) =>
              <tr>
                <td><Link to={"/projects/" + project._id}>{project.name} </Link></td>
                <td>{this.renderStatus(project)}</td>
                <td>{project.owner.firstName} {project.owner.lastName}</td>
                <td>{members}</td>
                <td>{project.club.name}</td>
                <td style={{textAlign: 'left'}}> 
                {' '}<Button color="white" onClick={this.toggleModal.bind(this, project)}> <i className="material-icons">delete</i></Button> 
                {' '}<Link  to= {"/projects/"+ project._id +"/update"} color="white" className="btn"><i className="material-icons">edit</i> </Link>

                </td>
                <td>{this.renderApprovationButtons(project)}</td>
              </tr>
            )}
          </tbody>
        </Table>
        <Modal isOpen={this.state.modal}>
          <ModalHeader ><strong>Confirmation</strong></ModalHeader>
          <ModalBody>
          <p>Êtes-vous sûr de vouloir supprimer {this.state.currentProject.name} ?</p>
          </ModalBody>
          <ModalFooter>
          
          <Button className="boutonConfirmer" onClick={this.onDeleteClick.bind(this, this.state.currentProject._id)}>Confirmer</Button>
          <Button className="boutonModifier" onClick={this.toggleModal}>Annuler</Button>
          </ModalFooter>
        </Modal>
        <div>

        </div>


        <div >
          <Pagination>
            {paginationItems}
          </Pagination>
        </div>
      </div>


    )
  }
}

DashbordProjects.propTypes = {
  getProjects: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired,
  approveProject: PropTypes.func.isRequired,
  rejectProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  projects: state.projects,
  project: state.projects.project

});

export default connect(
  mapStateToProps,
  {  getProjects,deleteProject , getProject, updateProject, approveProject, rejectProject  }
)(withRouter(DashbordProjects));