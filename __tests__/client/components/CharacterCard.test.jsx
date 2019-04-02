import React from 'react';
import { shallow } from 'enzyme';
import { Card } from 'semantic-ui-react';
import CharacterCard from '../../../src/client/components/CharacterCard';

describe('CharacterCard ', () => {
  it('should render a <Card>', () => {
    const card = shallow(
      <CharacterCard key="1" name="Emperor Palpatine" />
    );
    expect(card.exists(Card)).toBe(true);
    //expect(card.find(Card)) alone, for truthiness, never works, because it always returns a ReactWrapper
  });
});

/* import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { convertToFilename } from '../utils-client';

const CharacterCard = ({ name, onClick }) => (
  <Card className="character-card" onClick={onClick}>
    <Image src={`/images/icon_${convertToFilename(name)}.png`} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
    </Card.Content>
  </Card>
);

export default CharacterCard; */
