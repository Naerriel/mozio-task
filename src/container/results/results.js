import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './results.scss';
import { getDistance } from '../../repository/distance'

class Results extends Component {
  constructor(props) {
    super(props);

    const { from, to } = props.match.params;
    this.loadDistance(from, to);
    this.state = {redirect: false, distance: ''};
  }

  redirect = () => {
    this.setState({redirect: true});
  }

  loadDistance = (from, to) => {
    getDistance(from, to)
      .then((distance) => {
        this.setState({distance});
      });
  }

  render() {
    const { from, to, date, people } = this.props.match.params;
    if (this.state.redirect) {
      return <Redirect to='/'/>;
    }

    return (
      <main className='results'>
        <h2>Trip summary:</h2>
        <p>From: {from}</p>
        <p>To: {to}</p>
        <p>Distance: {this.state.distance}</p>
        <p>Date: {date}</p>
        <p>People: {people}</p>
        <button onClick={this.redirect}>Search again</button>
      </main>
    );
  }
}

export default connect()(Results);
