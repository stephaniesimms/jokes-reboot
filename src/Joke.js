import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
  constructor(props) {
    super(props);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  handleUpVote() {
    this.props.vote(this.props.id, +1);
  }

  handleDownVote() {
    this.props.vote(this.props.id, -1);
  }

  render() {
    const { text, votes } = this.props;

    return (
      <div className='Joke my-3'>
        <div className='Joke-voting d-inline-block align-top'>
          <button className="btn btn-info mr-1" onClick={this.handleUpVote}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button className="btn btn-danger mr-2" onClick={this.handleDownVote}>
            <i className="fas fa-thumbs-down" />
          </button>

          {votes}

        </div>

        <div className='Joke-text d-inline-block align-center'>
          {text}
        </div>
      </div>
    )
  }
}

export default Joke;