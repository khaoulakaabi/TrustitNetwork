import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Button , Card, CardBody, Table } from 'reactstrap';

class User extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  

  render() {  
    const { user } = this.props.auth;

    return (
     <div className="container animated fadeIn" div style={{ marginTop: "2rem" }}>
            <Card>
             
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      <tr>
                    <th> <strong>Nom:</strong></th>
                    <td>{user.firstName}</td>
                    </tr>
                    <tr>
                    <th><strong>Prénom:</strong></th>
                    <td>{user.lastName}</td>
                    </tr>
                    <tr>
                    <th><strong>Email:</strong></th>
                    <td>{user.email}</td>
                    </tr>
                    <tr>
                    <th><strong>Role:</strong></th>
                    <td>{user.role}</td>
                    </tr>
                    </tbody>
                    <br/>
                    <Button className="bouton" href= {"/users/"+ user._id +"/update"}color="primary">Modifier </Button>
                  </Table>
              </CardBody>
            </Card>
      </div>
    );
  }
}

User.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(User);