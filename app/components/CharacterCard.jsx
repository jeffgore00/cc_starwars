import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { convertToFilename } from '../../utils';

const CharacterCard = ({ name, onClick }) => (
  <Card className="character-card" onClick={onClick}>
    <Image src={`images/icon_${convertToFilename(name)}.png`} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
    </Card.Content>
  </Card>
);

export default CharacterCard;
