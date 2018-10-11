import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCharacters } from '../store';
import CharacterList from './CharacterList';

class Root extends Component {
  constructor() {
    super();
    this.test = 'test';
  }

  componentDidMount() {
    this.props.loadCharacters();
  }

  render() {
    return <CharacterList characters={this.props.characters} />;
  }
}

const mapState = ({ characters }) => ({ characters });

const mapDispatch = dispatch => {
  return {
    loadCharacters: () => dispatch(fetchCharacters())
  };
};

export default connect(
  mapState,
  mapDispatch
)(Root);
