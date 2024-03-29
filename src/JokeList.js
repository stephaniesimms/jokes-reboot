import React, { Component } from 'react';
import axios from 'axios';
import ls from 'local-storage';
import uuid from 'uuid/v4';
import Joke from './Joke';
import './JokeList.css';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: ls.get('jokes') || [],
      isLoading: false
    };
    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
    this.sortJokesScore = this.sortJokesScore.bind(this);
  }

  // at mount, get jokes 
  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.generateNewJokes();
    }
  }

  // fetch jokes from API
  // use a Set to make sure there are no duplicates
  async fetchJokes() {
    try {
      let jokes = this.state.jokes;
      let duplicateJokes = new Set();
      // solution uses static defaultProps for num jokes to get
      while (jokes.length < 10) {
        let response = await axios.get('https://icanhazdadjoke.com', {
          headers: { Accept: 'application/json' }
        });
        let joke = response.data.joke;

        if (!duplicateJokes.has(joke)) {
          duplicateJokes.add(joke);
          jokes.push({ joke: joke, id: uuid(), votes: 0 })
        }
      }
      this.setState({ jokes: jokes, isLoading: false });
      ls.set('jokes', jokes);
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
    let updatedJokes = this.state.jokes.map(joke => {
      if (joke.id === id) {
        return { ...joke, votes: joke.votes + val }
      }
      return joke;
    });
    this.setState({ jokes: updatedJokes });
    ls.set('jokes', updatedJokes);
  }

  sortJokesScore() {
    let jokes = this.state.jokes;
    return jokes.sort((a, b) => (b.votes - a.votes));
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='loading mt-3 text-center'>
          <i className='fas fa-4x fa-spinner fa-spin' />
        </div>
      );
    }

    let sortedJokes = this.sortJokesScore(this.state.jokes);

    return (
      <div className='JokeList mt-3'>
        <button className="Joke-button btn btn-secondary mb-3" onClick={this.generateNewJokes}>
          Get New Jokes
        </button>


        {sortedJokes.map(joke => (
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