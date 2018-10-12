import React, { Component } from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';

export default class ErrorMessage extends Component {
  state = { modalOpen: true };
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });
  render() {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size="small"
      >
        <Header icon="exclamation" content="Error" />
        <Modal.Content>
          <h3>There was an error.</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue" onClick={this.handleClose} inverted>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
