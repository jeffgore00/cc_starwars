import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { errorAcknowledged } from '../store';
import { buildErrorMessage } from '../utils-client';

class ErrorMessage extends Component {
  state = { modalOpen: true };

  handleClose = () => {
    const { acknowledgeError, execRollbackActions } = this.props;
    acknowledgeError();
    execRollbackActions();
    this.setState({ modalOpen: false });
  };

  render() {
    const {
      error: { source, statusCode }
    } = this.props;
    const { modalOpen } = this.state;

    return (
      <Modal
        open={modalOpen}
        onClose={this.handleClose}
        basic={true}
        size="small"
        className="error-message"
      >
        <img
          className="error-icon"
          src="/images/icon_deathstar.png"
          alt="error"
        />
        <Modal.Content>{buildErrorMessage(source, statusCode)}</Modal.Content>
        <Modal.Actions>
          <Button color="blue" onClick={this.handleClose} inverted={true}>
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

ErrorMessage.propTypes = {
  acknowledgeError: PropTypes.func.isRequired,
  execRollbackActions: PropTypes.func.isRequired,
  error: PropTypes.shape({
    source: PropTypes.string,
    statusCode: PropTypes.any
  }).isRequired
};

export default connect(
  null,
  mapDispatch
)(ErrorMessage);
