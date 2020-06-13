import React, { Component } from "react";
import {  Container ,Button, Form, FormGroup, Label } from 'reactstrap';
import { Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { addClubs } from "../../actions/clubActions";
import classnames from "classnames";
import { connect } from "react-redux";
import Select from "react-select";
import listUniversity from '../config/listUniversity'
class addclub extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      size: "",
      president: "",
      university:"",
      errors: {},
      selectedOption: "",

        };
  }
componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }


onSubmit = e => {
    e.preventDefault();

    const newClub= {
      name: this.state.name,
      description: this.state.description,
      university: this.state.selectedOption.value ,
      size: this.state.size,
      president: this.state.president 
    };
    
this.props.addClubs(newClub, this.props.history); 
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }
 
  render() {

    const { errors } = this.state;
    const { selectedOption } = this.state;

    return (
      <div div style={{ marginTop: "1rem" }} className="row">
        <Container >
          <div className="text-center" >
          <h2>Ajouter un club</h2>
          </div>
          <Form noValidate onSubmit={this.onSubmit} className="form-style-8">
             <FormGroup>
               <Label for="name">Nom</Label>
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
                                type="text" 
                                id="description"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChange}
                        ></textarea>
            </FormGroup>
            <FormGroup>
              <Label for="university">Université</Label>
              <Select
                 id="university"
                 options = {listUniversity}
                 type="select"
                 value={selectedOption}
                 onChange={this.handleChange}>
              </Select>
        </FormGroup>
        <FormGroup>
          <Label for="members">Members</Label>
                <input
                  onChange={this.onChange}
                  value={this.state.size}
                  error={errors.size}
                  id="size"
                  type="text"
                  className={classnames("form-control", {
                    invalid: errors.size
                  })}
                />
                <span className="red-text">{errors.size}</span>
       
        </FormGroup>
        <FormGroup>
          <Label for="president">President</Label>
                <input
                  onChange={this.onChange}
                  value={this.state.president}
                  error={errors.president}
                  id="president"
                  placeholder="exemple@exemple.com"
                  type="email"
                  className={classnames("form-control", {
                    invalid: errors.president
                  })}
                />
                <span className="red-text">{errors.president}</span>
       
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
addclub.propTypes = {
  addClubs: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {addClubs}
)(withRouter(addclub));