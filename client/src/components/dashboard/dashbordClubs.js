import React, { Component } from "react";
import queryString from 'query-string'
import {Input,Button, Pagination, PaginationItem, PaginationLink,Table,  Modal, ModalHeader, ModalBody, ModalFooter ,FormGroup, Label} from 'reactstrap';
import { withRouter,Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getClubs,deleteClub , getClub, updateClub,approveClub, rejectClub} from "../../actions/clubActions";
import { connect } from "react-redux";
import { MdAddCircle} from "react-icons/md"


class DashbordClubs extends Component {
  currentClub = {
    name: 'Waiting'
  }
  constructor() {
    super();
    this.state = {
      name: "",
      size: "",
      president: "",
      university:"",
        errors: {},
     currentPage: 1,
      currentUniversity: 'all',
      modal: false,
      currentClub: {
        _id: 0,
        name: 'Waiting'
      },
      currentStatus: 'all',
    };
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModal2 = this.toggleModal2.bind(this);
    this.update = this.update.bind(this);
    this.renderApprovationButtons = this.renderApprovationButtons.bind(this);
    this.renderStatus = this.renderStatus.bind(this);
    this.approve = this.approve.bind(this);
    this.reject = this.reject.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);

  }
  componentDidMount() {
    console.log('auth', this.props.auth);
    let page = queryString.parse(this.props.location.search).page;
    let status = queryString.parse(this.props.location.search).status;
    if(!page) page=1;
    if (!status) status = "all";
    this.setState({
      currentPage: page,
      currentStatus: status

        });
    // we have to use the callback if we will use this.state because setState is async
    this.props.getClubs(page,5);
  }
  onStatusChange(event) {
    this.setState({ currentStatus: event.target.value }, () => {
      this.props.getClubs(1, 5, this.state.currentStatus);
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onDeleteClick = (id)=> {
    this.props.deleteClub(id);
    this.toggleModal();
    this.props.getClubs(this.state.currentPage, 5,this.state.currentStatus);
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
  toggleModal2(club=false) {
    if(!club) {
      club= {
        _id: 0,
        name: 'Waiting'
      }
    }
    this.setState(prevState => ({
      modal2: !prevState.modal2 ,
      currentClub: club,
      
    }));
  }
  update = ()=> {
      this.props.updateClub(this.state.currentClub._id);
      this.toggleModal2();
      this.props.getClubs();
    };
   
    approve(clubId) {
      this.props.approveClub(clubId);
      this.props.getClubs(this.state.currentPage, 5, this.state.currentStatus);
    }
    reject(clubId) {
      this.props.rejectClub(clubId);
      this.props.getClubs(this.state.currentPage, 5, this.state.currentStatus);
    }
    renderStatus(club) {
      let status;
      if(club.status ==="approved") {
        status = (
           <span className="badge badge-success p-2">Approuvé</span>
        )
      }else if (club.status ==="rejected") {
        status = (
          <span className="badge badge-danger p-2">Refusé</span>
        )
      } else {
        status = (
          <span className="badge badge-warning p-2">En attente</span>
        )
      }
      return status;
    }
    renderApprovationButtons(club) {
      let buttons;
      console.log('renderApprovationButtons', club);
      if (club.status === "rejected") {
        buttons = (
          <span>
            {' '} <Button onClick={this.approve.bind(this, club._id)} color="success"><i className="material-icons">check</i> </Button>
          </span>
        );
      } else if (club.status === 'approved') {
        buttons = (
          <span>
            {' '} <Button onClick={this.reject.bind(this, club._id)} className="btn btn-danger"><i className="material-icons">cancel</i></Button>
          </span>
        );
      } else {
        buttons = (
          <span>
            {' '} <Button onClick={this.approve.bind(this, club._id)} className="btn btn-success"><i className="material-icons">check</i> </Button>
            {' '} <Button onClick={this.reject.bind(this, club._id)} className="btn btn-danger"><i className="material-icons">cancel</i></Button>
          </span>
        );
      }
      return buttons;
    }
  
  render() {
    const clubs = this.props.clubs.clubs.docs;
    const pages = this.props.clubs.clubs.pages;
    const paginationItems = [];
    for (var i=1; i <= pages; i++) {
      paginationItems.push(<PaginationItem>
         <PaginationLink href={"?page=" + i + "&status=" + this.state.currentStatus}>
          {i}
        </PaginationLink>
      </PaginationItem>);
    }
    return (
      <div className="container" div style={{ marginTop: "2rem" }}>
        <div className="float-right">
        <Button className="bouton" href="/clubs/add"> <MdAddCircle Size="lg"/> Club
         </Button> 
         </div>
        <tr>
              <th>
                <FormGroup className="m-20">
                  <Input
                    type="select"
                    bsSize="lg"
                    onChange={this.onStatusChange}
                    value={this.state.currentStatus}
                    id="currentUniversity">
                    <option value="all">Choisissez un status</option>
                    <option value="approved">Approuvé</option>
                    <option value="rejected">Refusé</option>
                    <option value="pending">En attente</option>
                  </Input>
                </FormGroup>
              </th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
      <Table>
          <thead>
            <tr>
              <th>Nom </th>
              <th>Status </th>
              <th>Université</th>
              <th>Membres</th>
              <th>Président</th>
              <th>Gestion</th>
              <th>Confirmation</th>
            </tr>
          </thead>
          {Array.isArray(clubs) && clubs.length>0 && clubs.map((club ) =>
          <tbody>
            <tr>
              <td class = "col_2"><Link to={"/clubs/"+ club._id}>{club.name}</Link></td>
              <td >{this.renderStatus(club)}</td>
              <td width="270px">{club.university}</td>
              <td>{club.size}</td>
              <td>{club.presidents.map(president => 
                 <span>{president.firstName} {president.lastName}</span>
              )}</td>
              <td>
                   {' '}<Button  href= {"/clubs/"+club._id+"/update"}color="white"><i className="material-icons">edit</i> </Button>
                   {' '}<Button color="white" onClick={this.toggleModal.bind(this, club)}> <i className="material-icons">delete</i></Button>
                     </td>
                   <td style={{textAlign: 'left'}}>{this.renderApprovationButtons(club)}</td>
            </tr>
          </tbody>  
         )}
      </Table>

         <Modal isOpen={this.state.modal}>
          <ModalHeader ><strong>Confirmation</strong></ModalHeader>
          <ModalBody>
        <p>Êtes-vous sûr de vouloir supprimer {this.state.currentClub.name} ?</p>
          </ModalBody>
          <ModalFooter>
          {' '}<Button  color="danger" onClick={this.onDeleteClick.bind(this, this.state.currentClub._id)}>Confirmer </Button>
          {' '}<Button  color="secondary" onClick={this.toggleModal}>Annuler</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modal2}>
          <ModalHeader >Modifier le club : </ModalHeader>
          <ModalBody>
          <FormGroup>
          <Label for="name">Name</Label>
          <input
          id="name"
          type="text"/>
          </FormGroup>
          </ModalBody>
          <ModalFooter>
          <Button className="boutonConfirmer" onClick={this.update}>Modifier</Button> {''}
            <Button className="boutonModifier" onClick={this.toggleModal2}>Annuler</Button>
          </ModalFooter>
        </Modal>
      <div >
      <Pagination  aria-label="Page navigation">
        {paginationItems}
      </Pagination>
      </div>
      </div>
      

    )
    }
    }
    DashbordClubs.propTypes = {
  getClubs: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  deleteClub : PropTypes.func.isRequired,
  getClub: PropTypes.func.isRequired,
  updateClub: PropTypes.func.isRequired,
  approveClub: PropTypes.func.isRequired,
  rejectClub: PropTypes.func.isRequired


};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  clubs: state.clubs
});
export default connect(
  mapStateToProps,
  { getClubs ,deleteClub, getClub, updateClub,approveClub, rejectClub}
)(withRouter(DashbordClubs));