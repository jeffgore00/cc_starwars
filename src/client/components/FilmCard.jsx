import React from 'react';
import { Item } from 'semantic-ui-react';
import { romanize } from '../utils-client';

const FilmCard = ({ episode, title, date, desc }) => (
  <Item>
    <Item.Image src={`/images/poster_episode_0${episode}.png`} />
    <Item.Content>
      <Item.Header>{`Episode ${romanize(episode)}: ${title}`}</Item.Header>
      <Item.Meta>
        Release Date:{' '}
        {date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </Item.Meta>
      <Item.Description>{desc}</Item.Description>
    </Item.Content>
  </Item>
);

export default FilmCard;
