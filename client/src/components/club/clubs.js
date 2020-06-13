import React, { Component } from "react";
import queryString from 'query-string'
import { CardBody,Button,FormGroup,Pagination, PaginationItem, PaginationLink,Modal, ModalHeader, ModalBody, ModalFooter,Card, CardImg, CardTitle,  CardText} from 'reactstrap';
import Select from "react-select";
import listUniversity from '../config/listUniversity'
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addClubs, getClubs, addProjectOwner } from "../../actions/clubActions";
import { connect } from "react-redux";
import { MdAddCircle} from "react-icons/md"
import Loader from "../layout/loader";

class Clubs extends Component {
  currentClub = {
    name: 'Waiting'
  }
  constructor() {
    super();
    this.state = {
      // name: "",
      // size: "",
      // university: "",
      // president: "",
      errors: {},
      currentPage: 1,
      currentUniversity: {
        value: 'all',
        label: 'Tous les universités'
      },
      selectedOption: "",
      modal: false,
      currentClub: {
        _id: 0,
        name: 'Waiting'
      },
      email: ''
    };
    this.onUniversityChange = this.onUniversityChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.invite = this.invite.bind(this);
  }
  componentDidMount() {
    console.log('auth', this.props.auth);
    let page = queryString.parse(this.props.location.search).page;
    let university = queryString.parse(this.props.location.search).university;
    if(!page) page=1;
    if(!university) university='all';
    this.setState({
      currentPage: page,
      currentUniversity: {
        value: university
      }
    });
    // we have to use the callback if we will use this.state because setState is async
    this.props.getClubs(page,12,university);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onUniversityChange (selectedOption) {
    this.setState({ currentUniversity: selectedOption }, () => {
      this.props.getClubs(1,12,this.state.currentUniversity.value);
    });
  };
  toggleModal(club=false) {
    if(!club) {
      club= {
        _id: 0,
        name: 'Waiting'
      }
    }
    this.setState(prevState => ({
      modal: !prevState.modal ,
      currentClub: club
    }));
  }
  inviteButton(club) {
    let test = false;
    if(this.props.auth.isAuthenticated) {
      club.presidents.forEach(president => {
        if(president._id === this.props.auth.user._id) {
          test = true;
        }
      });
    }
    if(test){
      return (
        <Button className="bouton" onClick={this.toggleModal.bind(this, club)}><MdAddCircle Size="lg"/> Propriétaire</Button>
      )
    }
  }
  onEmailChange(event){
    this.setState({ 
      email: event.target.value 
    });
  }
  invite() {
    console.log('Email to invite: ', this.state.email);
    this.props.addProjectOwner(this.state.currentClub._id, this.state.email);
    this.toggleModal();
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  render() {
    const clubs = this.props.clubs.clubs.docs;
    const pages = this.props.clubs.clubs.pages;
    console.log("pages", pages);
    const paginationItems = [];
    for (var i=1; i <= pages; i++) {
      console.log("page----", i);
        paginationItems.push(<PaginationItem>
          <PaginationLink href={"?page=" + i + "&university=" + this.state.currentUniversity.value}>
            {i}
          </PaginationLink>
        </PaginationItem>);
    }
    if(!Array.isArray(clubs)) return (<Loader></Loader>);
    return (
      <div className="container" div style={{ marginTop: "2rem" }}>
      <FormGroup className="m-20" >
        <Select
        placeholder= "Choisir votre université"
          id="currentUniversity"
          options = {[
            {
              value: 'all',
              label: 'Choisir votre université'
            },
            ...listUniversity
          ]}
          type="select"
          value={this.state.currentUniversity}
          onChange={this.onUniversityChange}>
          </Select>
      </FormGroup>
      <div className="row">
        {Array.isArray(clubs) && clubs.length>0 && clubs.map((club, index) =>
          <div className="col-md-3 col-sm-6 col-xs-12 club-card">
          <Card div style={{ 	filter: "drop-shadow(0 5px 5px rgba(161, 154, 154, 0.705))"}}>
          <Link to={"/clubs/"+ club._id}>
            <CardImg top width="100%" src="https://via.placeholder.com/350x250" alt="" />
          </Link>
          <CardBody>
          <CardTitle> 
            <h3><Link to={"/clubs/"+ club._id}>{club.name}</Link> </h3> 
          </CardTitle><br/>
          <CardText> <strong>Université :</strong> {club.university}<br/><br/>
          <strong> Members :</strong> {club.size} membres
          </CardText>
              { this.inviteButton(club) } 
          </CardBody>
          </Card>
          </div>
        )}
      </div>
     
        <Modal isOpen={this.state.modal}>
          <ModalHeader >Inviter un proprietaire de projet</ModalHeader>
          <ModalBody>
            <p>Inviter un proprietaire de projet au Club <strong>{this.state.currentClub.name}</strong></p>
            <FormGroup>
                      <input
                        className="form-control"
                        type="email"
                        placeholder="example@email.com"
                        onChange={this.onEmailChange}
                        value={this.state.email}
                      />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="bouton"  onClick={this.invite}>Inviter
            </Button>{' '}
            <Button className="boutonModifier" onClick={this.toggleModal}>Annuler</Button>
          </ModalFooter>
        </Modal>
      
       <div>
       <Pagination  aria-label="Page navigation example">
         {paginationItems}
       </Pagination>
       </div>
       </div>
    );
  }
}
Clubs.propTypes = {
  addClubs: PropTypes.func.isRequired,
  getClubs: PropTypes.func.isRequired,
  addProjectOwner: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  clubs: state.clubs
});
export default connect(
  mapStateToProps,
  { addClubs, getClubs, addProjectOwner }
)(withRouter(Clubs));