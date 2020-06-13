import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    Container
} from 'reactstrap';
import CustomAlert from './CustomAlert';

class FlashMessages extends Component {

  render() {
    let messages = this.props.flashMessages.messages;
    return (
        <Container>
            {Array.isArray(messages) && messages.length>0 && messages.map((message, index) =>
                <CustomAlert index={index} color={message.color}>
                    {message.message}
                </CustomAlert>
            )}
        </Container>
    );
  }
}
FlashMessages.propTypes = {
  auth: PropTypes.object.isRequired,
  flashMessages: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  flashMessages: state.flashMessages
});
export default connect(
  mapStateToProps
)(FlashMessages);