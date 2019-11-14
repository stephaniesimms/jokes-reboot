import React, { Component } from 'react';

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
      <div className='Joke'>
        <div className='Joke-voting'>
          <button onClick={this.handleUpVote}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={this.handleDownVote}>
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