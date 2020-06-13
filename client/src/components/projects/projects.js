import React, { Component } from "react";
import queryString from 'query-string'
import { Modal, ModalHeader, ModalBody, ModalFooter,Button, FormGroup, Input, Pagination, PaginationItem, PaginationLink, Card, CardImg, CardBody, CardTitle,  CardText,Progress} from 'reactstrap';
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getProjects, addProjectMember } from "../../actions/ProjectsAction";
import { connect } from "react-redux";
import { MdGroupAdd} from "react-icons/md";
import Loader from "../layout/loader";

class Projects extends Component {
  currentProject = {
    name: 'Waiting'
  }
  constructor() {
    super();
    this.state = {
      //name: "",
      email: "",
      errors: {},
      currentPage: 1,
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
    console.log('auth', this.props.auth);
    let page = queryString.parse(this.props.location.search).page;
    let name = queryString.parse(this.props.location.search).name;
    if(!page) page=1;
    if(!name) name='all';
    this.setState({
      currentPage: page,
      currentName: name
    });
    // we have to use the callback if we will use this.state because setState is async
    this.props.getProjects(page,12,name);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onEmailChange (event) {
    this.setState({ email: event.target.value });
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

  inviteButton(project) {
    let test = false;
    if(this.props.auth.isAuthenticated) {
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
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  
  render() {
    const projects = this.props.projects.projects.docs;
    const pages = this.props.projects.projects.pages;
    const paginationItems = [];
    for (var i=1; i <= pages; i++) {
      paginationItems.push(<PaginationItem>
        <PaginationLink href={"?page=" + i + "&name=" + this.state.currentName}>
          {i}
        </PaginationLink>
      </PaginationItem>);
    }
    if(!Array.isArray(projects)) return (<Loader></Loader>);
    return (
      <div className="container"div style={{ marginTop: "2rem" }}>
        
      <div className="row">
        {Array.isArray(projects) && projects.length>0 &&  projects.map((project, index) =>
          <div className="col-md-3 col-sm-6 col-xs-12 project-card">
          <Card div style={{ 	filter: "drop-shadow(0 5px 5px rgba(161, 154, 154, 0.705))"}}>
            <Link to={"/projects/"+ project._id}>
              <CardImg top width="100%" src="https://via.placeholder.com/350x250" alt="" />
            </Link>
            <CardBody>
              <CardTitle><h3><Link to={"/projects/"+ project._id}>{project.name}</Link></h3></CardTitle>
              <CardText>{project.description}</CardText>
              <br/>
              { this.inviteButton(project) } 
            </CardBody>
          </Card>
          </div>
        )}
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
      <div className="pagination text-center p-20">
      <Pagination size="sm" aria-label="Page navigation example">
        {paginationItems}
      </Pagination>
      </div>
      </div>
    );
  }
}
Projects.propTypes = {
  addProjectMember: PropTypes.func.isRequired,
  getProjects: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  projects: state.projects
});
export default connect(
  mapStateToProps,
  { getProjects,addProjectMember }
)(withRouter(Projects));