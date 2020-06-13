import React, { Component } from "react";
import queryString from 'query-string'
import {  Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getMyProjects } from "../../actions/ProjectsAction";
import { connect } from "react-redux";
import Loader from "../layout/loader";
import { Table } from 'reactstrap';

class Projects extends Component {
  currentProject = {
    name: 'Waiting'
  }
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      errors: {},
      currentPage: 1,
      modal: false,
      currentProject: {
        name: 'Waiting'
      },
    }
    this.toggleModal = this.toggleModal.bind(this);

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
    this.props.getMyProjects(page,12,name);
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
      <div className="container" div style={{ marginTop: "2rem" }}>  
          <h3 align="center">Mes Projets</h3>
          <br></br>
        <Table responsive className="dashboard-table">
          <thead>
            <tr>
              <th>Nom </th>
              <th>Status </th>
              <th>Club</th>
              <th>Modifier</th>

            </tr>
          </thead>

          <tbody>
            {Array.isArray(projects) && projects.length > 0 && projects.map((project, index) =>
              <tr>
                <td><Link to={"/projects/" + project._id}>{project.name} </Link></td>
                <td>{project.status}</td>
                <td>{project.club.name}</td>
                <td style={{textAlign: 'left'}}> 
                {' '}<Link  to= {"/projects/"+ project._id +"/update"} color="white" className="btn"><i className="material-icons">edit</i> </Link>

                </td>
              </tr>
            )}
          </tbody>
        </Table>
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
Projects.propTypes = {
  getMyProjects: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  projects: state.projects
});
export default connect(
  mapStateToProps,
  { getMyProjects }
)(withRouter(Projects));