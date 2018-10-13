import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Button } from 'semantic-ui-react';
import { errorAcknowledged } from '../store';
import { buildErrorMessage } from '../../utils';

class ErrorMessage extends Component {
  state = { modalOpen: true };
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => {
    this.props.acknowledgeError();
    this.props.execRollbackActions();
    this.setState({ modalOpen: false });
  };
  render() {
    const { source, statusCode } = this.props.error;
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size="small"
        className="error-message"
      >
        <img className="error-icon" src="images/icon_deathstar_white.png" />
        <Modal.Content>
          <h3>{buildErrorMessage(source, statusCode)}</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue" onClick={this.handleClose} inverted>
            OK, go back
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    acknowledgeError: () => dispatch(errorAcknowledged())
  };
};

export default connect(
  null,
  mapDispatch
)(ErrorMessage);
