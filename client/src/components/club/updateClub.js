import React, { Component } from 'react';
import { Container, Label } from 'reactstrap';
import Select from "react-select";
import listUniversity from '../config/listUniversity'
import { updateClub, getClub} from "../../actions/clubActions";
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {Button } from "reactstrap";

class EditClub extends Component {

    constructor() {
        super();
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSize= this.onChangeSize.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this)
        this.state = {
            name: '',
            description: '',
            size: '',
            university: ""
        }
    }
    componentDidMount() {
        const id = this.props.match.params._id;
        this.props.getClub(id);
    }
    componentWillReceiveProps() {
        this.setState({
            name: this.props.club.name,
            description: this.props.club.description,
            size: this.props.club.size,
            university: {
                label: this.props.club.university,
                value: this.props.club.university
            }
        });
    }
    handleChange = (selectedOption) => {
        this.setState({ university: selectedOption });
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

    onChangeSize(e) {
        this.setState({
            size: e.target.value
        });
    }

    onChangeUniversity(e) {
        this.setState({
            university: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            description: this.state.description,
            size: this.state.size,
            university: this.state.university.value
        };
        this.props.updateClub(obj, this.props.match.params._id); 
        this.props.history.push('/clubs/'+ this.props.match.params._id);
    }

    render() {
        if(this.state.name ==="") {
            // Loading
            return <div></div>;
        }
        return (
            <div style={{ marginTop: "1rem" }}>
            <Container>
                <h3 align="center">Modifier le Club: <strong>{this.state.name}</strong></h3>
                <form onSubmit={this.onSubmit} className="form-style-8">
                    <div className="form-group"> 
                        <label>name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <textarea 
                                type="text" 
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Members: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.size}
                                onChange={this.onChangeSize}
                                />
                    </div>
                    <div className="form-group">
                    <Label for="name">Université</Label>
              <Select
                 id="university"
                 options = {listUniversity}
                 type="select"
                 value={this.state.university}
                 onChange={this.handleChange}>
              </Select>
                    </div>
                    <br />
                    <Button type="submit" className="bouton">
                Modifier        
                  </Button>
                  {''} <Button className="boutonModifier" >Annuler</Button>
                </form>
                </Container>
            </div>
        )
    }
}
EditClub.propTypes = {
    updateClub: PropTypes.func.isRequired,
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
    {updateClub, getClub}
  )(withRouter(EditClub));