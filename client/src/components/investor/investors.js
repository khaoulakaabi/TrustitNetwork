import React, { Component } from "react";
import { CardBody,Button,FormGroup,Pagination, PaginationItem, PaginationLink,Modal, ModalHeader, ModalBody, ModalFooter,Card, CardImg, CardTitle,  CardText} from 'reactstrap';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {  getUsers} from "../../actions/userActions";
import { connect } from "react-redux";

class investors extends Component {
    currentUser= {
        name: 'Waiting'
      }
        constructor(props) {
            super(props);
            this.state = {
            users: [],
            currentUser: {
              _id: 0,
              name: 'Waiting'
            },
        }
        this.toggleModal = this.toggleModal.bind(this);
    
      }
      toggleModal(user=false) {
        if(!user) {
          user= {
            _id: 0,
            name: 'Waiting'
          }
        }
        this.setState(prevState => ({
          modal: !prevState.modal ,
          currentUser: user
        }));
      }
      componentDidMount() {
        console.log('auth', this.props.auth);
        // we have to use the callback if we will use this.state because setState is async
        this.props.getUsers(1,12, 'investor');
      }
  
  render() {
    const users = this.props.users.users.docs;

    return (
      <div className="container" div style={{ marginTop: "2rem" }}>
      <div className="row">
        {Array.isArray(users) && users.length>0 && users.map((user) =>
          <div className="col-md-3 col-sm-6 col-xs-12">
          <Card>
          <CardImg top width="100%" src="https://via.placeholder.com/350x250" alt="" />
          <CardBody>
          <CardTitle> <h3>{user.lastName}</h3>  </CardTitle><br/>
          <Button className="bouton" href={"/dashboard/users/" + user._id}>Afficher</Button>{' '}
          </CardBody>
          </Card>
          </div>
        )}
      </div>
     
       </div>
    );
  }
}
investors.propTypes = {
  getUsers: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  users: state.users
});
export default connect(
  mapStateToProps,
  {getUsers }
)(withRouter(investors));