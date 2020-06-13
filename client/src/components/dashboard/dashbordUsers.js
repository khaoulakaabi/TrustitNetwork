import React, { Component } from 'react';
import queryString from 'query-string'
import {  getUsers ,deleteUser } from "../../actions/userActions";
import { connect } from "react-redux";
import { withRouter,Link } from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import { utils } from "../../utils/utils";

class DashbordUsers extends Component {
  currentUser= {
    name: 'Waiting'
  }
  constructor(props) {
        super(props);
        this.state = {
          currentPage: 1,
          currentUser: {
            _id: 0,
            name: 'Waiting'
          },
        }
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.renderStatus = this.renderStatus.bind(this);
  }
  renderStatus(user) {
    let status;
    if(user.status ==="confirmed") {
      status = (
         <span className="badge badge-success p-2">Confirmé</span>
      )
    } else {
      status = (
        <span className="badge badge-warning p-2">En attente</span>
      )
    }
    return status;
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
      let page = queryString.parse(this.props.location.search).page;
      if(!page) page=1;
      this.setState({
        currentPage: page,
      });
      this.props.getUsers(page, 5);
    }
    onDeleteClick = (id)=> {
          this.props.deleteUser(id);
          this.props.getUsers();
          this.toggleModal();
    };

  render() {
    const paginationItems = [];
    for (var i=1; i <= this.props.pages; i++) {
      paginationItems.push(<PaginationItem>
         <PaginationLink href={"?page=" + i}>
          {i}
        </PaginationLink>
      </PaginationItem>);
    }
    return (
     <div className="container" div style={{ marginTop: "2rem" }}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">La liste des utilisateurs</h3>
            <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Date d'inscription</th>
                  <th>Gestion</th>
                  
                </tr>
              </thead>
              <tbody>
                {Array.isArray(this.props.users) && this.props.users.map(user=>
                  <tr>
                    <td><Link to={"/dashboard/users/" + user._id}>{user.firstName}</Link></td>
                    <td><Link to={"/dashboard/users/" + user._id}>{user.lastName}</Link></td>
                    <td >{this.renderStatus(user)}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>Inscrit le : {utils.getDateFromISOString(user.date)}</td> 

                    <td>
                     {' '}<Link className="btn" to= {"/users/"+user._id+"/update"}color="white"><i className="material-icons">edit</i> </Link>
                     {' '}<Button color="white" onClick={this.toggleModal.bind(this, user)}> <i className="material-icons">delete</i></Button>
                     </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div >
              <Pagination  aria-label="Page navigation">
                {paginationItems}
              </Pagination>
              </div>

            <Modal isOpen={this.state.modal}>
          <ModalHeader ><strong>Confirmation</strong></ModalHeader>
          <ModalBody>
        <p>Êtes-vous sûr de vouloir supprimer {this.state.currentUser.firstName}{' '}{this.state.currentUser.lastName} ?</p>
          </ModalBody>
          <ModalFooter>
          {' '}<Button  className="boutonConfirmer" onClick={this.onDeleteClick.bind(this, this.state.currentUser._id)}>Confirmer </Button>
          {' '}<Button  className="boutonModifier" onClick={this.toggleModal}>Annuler</Button>
          </ModalFooter>
        </Modal>
          </div>
        </div>
        </div>
        </div>
    )
  }
}
DashbordUsers.propTypes = {
  getUsers: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  deleteUser : PropTypes.func.isRequired

};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  users: state.users.users.docs,
  pages: state.users.users.pages
});
export default connect(
  mapStateToProps,
  {  getUsers,deleteUser }
)(withRouter(DashbordUsers));