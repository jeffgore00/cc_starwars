import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { errorAcknowledged } from '../store';
import { buildErrorMessage } from '../utils-client';

const ErrorMessage = ({ error, acknowledgeError, execRollbackActions }) => {
  const [modalOpen, setModalOpen] = useState(true);
  const handleClose = () => {
    acknowledgeError();
    execRollbackActions();
    setModalOpen(false);
  };

  const { source, statusCode } = error;
  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
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
        <Button color="blue" onClick={handleClose} inverted={true}>
          OK, go back
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

ErrorMessage.propTypes = {
  acknowledgeError: PropTypes.func.isRequired,
  execRollbackActions: PropTypes.func.isRequired,
  error: PropTypes.shape({
    source: PropTypes.string,
    statusCode: PropTypes.any
  }).isRequired
};

const mapDispatch = dispatch => {
  return {
    acknowledgeError: () => dispatch(errorAcknowledged())
  };
};

export default connect(
  null,
  mapDispatch
)(ErrorMessage);
