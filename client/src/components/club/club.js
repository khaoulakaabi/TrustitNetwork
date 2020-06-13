import React, { Component } from 'react';
import { getClub} from "../../actions/clubActions";
import { getProjects} from "../../actions/ProjectsAction";
import { connect } from "react-redux";
import { withRouter, Link} from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Card, CardImg, CardBody, CardTitle,  CardText} from 'reactstrap';
import { MdAddCircle} from "react-icons/md";
import { utils } from "../../utils/utils";
class Club extends Component {

  componentDidMount() {
        const id = this.props.match.params._id;
        this.props.getClub(id);
        this.props.getProjects(1,Math.pow(2.32), 'all',id);
  }
  
  render() {
      const club = this.props.club;
      if(!club) {
        return (
          <div className="container mt-5">
            No Club with this ID
          </div>
        )
      }
      let presidents = [];
      if (Array.isArray(club.presidents)) {
        club.presidents.forEach(president => {
          presidents.push(
            <div className="media text-muted pt-3">
              <img className="mr-2" src="https://via.placeholder.com/32x32" alt="President de club"></img>
              <p className="media-body pb-3 mb-0 small lh-125">
                <strong className="d-block text-gray-dark">{president.firstName} {president.lastName} </strong>
              </p>
          </div>
          )
        });
      } else {
        presidents.push(
          <div> ...</div>
        )
      }
      const projects = this.props.projects.docs;
      let projectOwners = [];
      if (Array.isArray(club.projectOwners)) {
        club.projectOwners.forEach(projectOwner => {
          projectOwners.push(
            <div className="media text-muted pt-3">
              <img className="mr-2" src="https://via.placeholder.com/32x32" alt="Proprietaire de projet"></img>
              <p className="media-body pb-3 mb-0 small lh-125">
                <strong className="d-block text-gray-dark">{projectOwner.firstName} {projectOwner.lastName} </strong>
              </p>
          </div>
          )
        });
      } else {
        projectOwners.push(
          <div> ...</div>
        )
      }
      let updateButton = '';
      if(utils.isUserPresidentOfClub(club, this.props.auth) || utils.isAdmin(this.props.auth)) {
        updateButton = <Button color = "white" href= {"/clubs/"+club._id+"/update"} >
          <i className="material-icons"> edit</i>  </Button>
      }
      let addProjectButton = '';
      if(utils.isUserProjectOwnerInClub(club, this.props.auth)) {
        addProjectButton = <Button className="bouton" href={"/clubs/"+club._id+"/projects/add"} ><MdAddCircle size={16}/> Ajouter un projet </Button>
      }
      return (
          <main class="container  mt-5">
            <div className="row">
              <div className="col-sm-4 col-xs-12">
                <img className="mr-3" src="https://via.placeholder.com/450x450" alt="" width="100%" />
              </div>
              <div className="col-sm-8 col-xs-12">
                <h2>
                {club.name}{updateButton}
                </h2>
                <p>
                 {' '} {addProjectButton}
                </p>
                <p>{club.description}</p>
                <p><strong>Ajouté: </strong> {utils.getDateFromISOString(club.date)}</p>
                <p><strong>Université: </strong> {club.university}</p>
                <p><strong>Membres: </strong> {club.size}</p>
                <h5>Presidents</h5>
                {presidents}
                <h5 className="mt-3">Proprietaires de projets</h5>
                {projectOwners}
              </div>
            </div>
            <h2 className="mt-3 mb-3">Projets</h2>
            <div className="row">
              {Array.isArray(projects) && projects.length>0 &&  projects.map((project, index) =>
                <div className="col-md-3 col-sm-6 col-xs-12 project-card">
                <Card>
                  <Link to={"/projects/"+ project._id}>
                    <CardImg top width="100%" src="https://via.placeholder.com/350x250" alt="" />
                  </Link>
                  <CardBody>
                    <CardTitle><h3><Link to={"/projects/"+ project._id}>{project.name}</Link></h3></CardTitle>
                    <CardText>{project.description}</CardText>
                  </CardBody>
                </Card>
                </div>
              )}
            </div>
          </main>
      )
  }
}
Club.propTypes = {
    getClub: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    club: state.clubs.club,
    projects: state.projects.projects
});

export default connect(
    mapStateToProps,
    {getClub, getProjects}
)(withRouter(Club));