import React, { Component } from "react";
import { Container, Button, Form, FormGroup, Label } from 'reactstrap';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { addProjects } from "../../actions/ProjectsAction";
import { getClub } from "../../actions/clubActions";
import classnames from "classnames";
import { connect } from "react-redux";

class addproject extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      errors: {}
    };
  }
  componentDidMount() {
    let clubId = this.props.match.params._clubId;
    this.props.getClub(clubId);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const newProject = {
      name: this.state.name,
      description: this.state.description,
      club: this.props.club._id
    };
    this.props.addProjects(newProject, this.props.history);
  };
  render() {


    const { errors } = this.state;
    return (
      <div div style={{ marginTop: "4rem" }} className="row">
        <Container>
          <h2>Ajouter un projet au Club : <strong>{this.props.club.name}</strong></h2>
          <Form noValidate onSubmit={this.onSubmit}className="form-style-8">
            <FormGroup>
              <Label for="name">Name</Label>
              <input
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                className={classnames("form-control", {
                  invalid: errors.name
                })}
              />
              <span className="red-text">{errors.name}</span>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <textarea
                onChange={this.onChange}
                value={this.state.description}
                error={errors.description}
                id="description"
                type="text"
                className={classnames("form-control", {
                  invalid: errors.description
                })}
              />
              <span className="red-text">{errors.description}</span>

            </FormGroup>

            <Button type="submit" className="bouton">
                Ajouter      
                  </Button> {''} <Button className="boutonModifier" >Annuler</Button>
          </Form>
        </Container>
      </div>
    );
  }
}
addproject.propTypes = {
  addProjects: PropTypes.func.isRequired,
  getClub: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  club: state.clubs.club
});
export default connect(
  mapStateToProps,
  { addProjects, getClub }
)(withRouter(addproject));