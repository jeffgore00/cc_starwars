import React from 'react';
import { Modal } from 'semantic-ui-react';

const Loading = () => (
  <Modal open={true} basic={true} size="small" className="loading-message">
    <img className="loading-icon" src="/images/icon_empire.png" alt="Loading..."/>
    <Modal.Content>Loading...</Modal.Content>
  </Modal>
);

export default Loading;
