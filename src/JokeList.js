import React, { Component } from 'react';
import Joke from './Joke';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      isLoading: false
    };
  }
  
  render() {
    return (
      <div>Hi </div>
    )
  }
}

export default JokeList;