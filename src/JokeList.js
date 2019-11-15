import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import Joke from './Joke';
import './JokeList.css';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      isLoading: false
    };
    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
  }

  // at mount, get jokes 
  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.generateNewJokes();
    }
  }

  // fetch jokes from API
  async fetchJokes() {
    try {
      let jokes = this.state.jokes;

      // solution uses static defaultProps for num jokes to get
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

  // change vote for this joke id by val (+/- 1)
  vote(id, val) {    
    this.setState(st => ({
      jokes: st.jokes.map(joke => {
        if (joke.id === id) {
          return { ...joke, votes: joke.votes + val }
        }
        return joke;
      })
    }));
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='loading'>
          <i className='fas fa-4x fa-spinner fa-spin' />
        </div>
      );
    }

    return (
      <div className='JokeList mt-3'>
        <button className="Joke-button btn btn-secondary mb-3" onClick={this.generateNewJokes}>
          Get New Jokes
        </button>


        {this.state.jokes.map(joke => (
          <Joke
            key={joke.id}
            id={joke.id}
            text={joke.joke}
            votes={joke.votes}
            vote={this.vote}
          />
        ))}
      </div>
    );
  }
}

export default JokeList;