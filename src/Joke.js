import React, { Component } from 'react';

class Joke extends Component {
  constructor(props) {
    super(props);
    this.handleUpVote.bind(this);
    this.handleDownVote.bind(this);
  }

  handleUpVote() {
    
  }

  handleDownVote() {

  }

  render() {
    const { text, votes, handleUpVote, handleDownVote } = this.props;

    return (
      <div className='Joke'>
        <div className='Joke-voting'>
          <button onClick={handleUpVote}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={handleDownVote}>
            <i className="fas fa-thumbs-down" />
          </button>

          {votes}

        </div>

        <div className='Joke-text'>
          {text}
        </div>
      </div>
    )
  }
}

export default Joke;