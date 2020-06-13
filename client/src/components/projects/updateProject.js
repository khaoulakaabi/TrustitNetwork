import React, { Component } from 'react';
import { Container,Input } from 'reactstrap';
import { updateProject, getProject} from "../../actions/ProjectsAction";
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {Button } from "reactstrap";

class EditProject extends Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            description: ''
        }
    }
    componentDidMount() {
        const id = this.props.match.params._id;
        this.props.getProject(id);
    }
    componentWillReceiveProps() {
        this.setState({
            name: this.props.project.name,
            description: this.props.project.description,
        });
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
      }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            description: this.state.description,
        };
        console.log(obj);
        this.props.updateProject(obj, this.props.match.params._id); 
        this.props.history.push('/projects');
    }

    render() {

        return (
            <div className="form-style-8">
            <Container>
                <h3 align="center">Modifier le Projet</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Titre: </label>
                        <Input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <Input 
                                type="textarea" 
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>

                    <br />
                    <Button type="submit" className="boutonLogin">
                Modifier        
                  </Button>
                </form>
                </Container>
            </div>
        )
    }
}
EditProject.propTypes = {
    updateProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    project: state.projects.project
  });
  export default connect(
    mapStateToProps,
    {updateProject, getProject}
  )(withRouter(EditProject));