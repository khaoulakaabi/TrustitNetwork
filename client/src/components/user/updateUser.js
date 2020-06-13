import React, { Component } from 'react';
import { Container,Input } from 'reactstrap';
import { updateUser, getUser} from "../../actions/userActions";
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {Button } from "reactstrap";
class EditUser extends Component {

    constructor(props) {
        super(props);
        this.onChangefirstName = this.onChangefirstName.bind(this);
        this.onChangelastName = this.onChangelastName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            id: -1,
            firstName: '',
            lastName: ''
        }
    }
    componentDidMount() {
        const id = this.props.match.params._id;
        this.setState({
            id: id
        });
        this.props.getUser(id);
    }
    componentWillReceiveProps() {
        this.setState({
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email

        });
    }
    onChangefirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangelastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }
    
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();
        const obj = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email : this.state.email
        };
        this.props.updateUser(obj, this.state.id); 
        //this.props.history.push('/dashboard/users');
    }

    render() {
        console.log('auth props', this.props.auth, this.state.id);
        if( this.props.user===null || !this.props.user._id) { 
            return (<div></div>); 
        }
        if((!this.props.auth.isAuthenticated) || (this.props.auth.user.role !=="admin" && this.props.auth.user._id !== this.state.id)) {
                return (
                    <Container className="mt-5 mb-5">
                        Vous n'avez pas le droit de modifier ce utilisateur
                    </Container>
                )
        }
        return (
            <div className="container  mt-5">
            <Container>
                <h3 align="center">Modifier le profile</h3>
                <form onSubmit={this.onSubmit} className="form-style-8">
                    <div className="form-group"> 
                        <label>Nom: </label>
                        <Input  type="text"
                                className="form-control"
                                value={this.state.firstName}
                                onChange={this.onChangefirstName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Prenom: </label>
                        <Input 
                                type="text" 
                                className="form-control"
                                value={this.state.lastName}
                                onChange={this.onChangelastName}
                                />
                    </div>
                    
                    <div className="form-group">
                        <label>Email: </label>
                        <Input 
                                type="text" 
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                />
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
EditUser.propTypes = {
    updateUser: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    user: state.users.user
  });
  export default connect(
    mapStateToProps,
    {updateUser, getUser}
  )(withRouter(EditUser));