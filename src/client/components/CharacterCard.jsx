import React from 'react';
import PropTypes from 'prop-types'
import { Card, Image } from 'semantic-ui-react';
import { convertToFilename } from '../utils-client';

const CharacterCard = ({ name, onClick }) => (
  <Card className="character-card">
    <Image src={`/images/icon_${convertToFilename(name)}.png`} />
    <Card.Content onClick={onClick}>
      <Card.Header>{name}</Card.Header>
    </Card.Content>
  </Card>
);

CharacterCard.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default CharacterCard;
