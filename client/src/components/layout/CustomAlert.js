import React from 'react';
import { Alert } from 'reactstrap';
import { removeFlashMessage } from '../../actions/flashMessageAction';

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CustomAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
    this.props.removeFlashMessage(this.props.index);
  }

  render() {
    // console.log( ReactDOM.findDOMNode(this.refs.alert).style);
    // console.log(window.getComputedStyle(ReactDOM.findDOMNode(this.refs.alert)).getPropertyValue("height"));
    const style = {
      bottom : this.props.index * 55
    }
    return (
      <Alert ref={"alert"} className="flash-message" style={style} color={this.props.color} isOpen={this.state.visible} toggle={this.onDismiss}>
        {this.props.children}
      </Alert>
    );
  }
}

CustomAlert.propTypes = {
  removeFlashMessage: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
});
export default connect(
  mapStateToProps,
  { removeFlashMessage }
)(withRouter(CustomAlert));