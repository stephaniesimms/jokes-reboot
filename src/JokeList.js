import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import Joke from './Joke';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      isLoading: false
    };
    this.generateNewJokes = this.generateNewJokes.bind(this);
  }

  /* at mount, get jokes */
  componentDidMount() {
    if (this.state.jokes.length === 0) this.generateNewJokes();
  }

  // fetch jokes from API
  async fetchJokes() {
    try {
      let jokes = this.state.jokes;

      while (jokes.length < 10) {
        let response = await axios.get('https://icanhazdadjoke.com', {
          headers: { Accept: 'application/json' }
        });
        let joke = response.data.joke;

        jokes.push({ joke: joke, id: uuid(), votes: 0 })
      }
      this.setState({ jokes: jokes, isLoading: false })
    } catch (err) {
      console.log(err);
    }
  }

  // empty joke list, set isLoading to true, and then fetch jokes from API
  generateNewJokes() {
    this.setState(
      { isLoading: true, jokes: [] }, 
      // second argument to .setState is a fn to call when state is set
      // this ensures user will see loading spinner while the request
      // is running
      this.fetchJokes
    );
  }

  render() {
    console.log(this.state)
    return (
      <div>Hi </div>
    )
  }
}

export default JokeList;