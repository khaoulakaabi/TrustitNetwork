import React, { Component } from 'react';
import { Container, Label } from 'reactstrap';
import Select from "react-select";
import listUniversity from '../config/listUniversity'
import { updateClub} from "../../actions/clubActions";
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";
import PropTypes from "prop-types";

class DashEditClub extends Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSize= this.onChangeSize.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this)
        this.state = {
            name: '',
            description: '',
            size: '',
            university: '',
            selectedOption: "",

        }
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
            university: this.state.selectedOption.value
        };
        console.log(obj);
        this.props.updateClub(obj, this.props.match.params.id); 
        this.props.history.push('/dashboard/clubs');
    }

    render() {
        const { selectedOption } = this.state;

        return (
            <div class="container  mt-5">
            <Container>
                <h3 align="center">Modifier votre Club</h3>
                <form onSubmit={this.onSubmit}>
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
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
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
                 value={selectedOption}
                 onChange={this.handleChange}>
              </Select>
                    </div>

                    <br />
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary" />
                    </div>
                </form>
                </Container>
            </div>
        )
    }
}
DashEditClub.propTypes = {
    updateClub: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    {updateClub}
  )(withRouter(DashEditClub));
