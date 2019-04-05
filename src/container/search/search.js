import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './search.scss';
import { AutoCompleteInput } from '../../components/auto-complete-input/auto-complete-input'
import { getLocations, saveLocation } from '../../repository/auto-completions'

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {redirect: false, from: '', to: '', date: '2019-04-05', people: 2};
  }

  redirect = () => {
    if (this.validateForm()) {
      this.setState({redirect: true});
      saveLocation(this.state.from);
      saveLocation(this.state.to);
    }
  }

  validateForm = () => {
    return this.state.from.length && this.state.to.length && this.state.people > 0;
  }

  handleChange = (fieldName, value) => {
    this.setState({[fieldName]: value});
  }

  render() {
    if (this.state.redirect) {
      const { from, to, date, people } = this.state;
      return <Redirect to={`results/${from}/${to}/${date}/${people}`}/>;
    }
    return (
      <main className='searching-page'>
        <h2>Search your trip:</h2>
        <form>
          <div className='input-wrapper'>
            <AutoCompleteInput label='From:' onChange={(value) => this.handleChange('from', value)} getAutoCompletions={getLocations}/>
          </div>
          <div className='input-wrapper'>
            <AutoCompleteInput label='To:' onChange={(value) => this.handleChange('to', value)} getAutoCompletions={getLocations}/>
          </div>
          <label className='input-wrapper'>
            Date:
            <input type='date' value={this.state.date} onChange={(event) => this.handleChange('date', event.target.value)}/>
          </label>
          <label className='input-wrapper'>
            Number of people:
            <input type='number' value={this.state.people} onChange={(event) => this.handleChange('people', event.target.value)}/>
          </label>
          <button className='btn' type='button' onClick={this.redirect}>Search</button>
        </form>
      </main>
    );
  }
}

