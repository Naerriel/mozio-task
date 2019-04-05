import React, { Component } from 'react';

import { BrowserRouter, Route, Redirect, withRouter } from 'react-router-dom';
import Search from './search/search';
import Results from './results/results';

const ResultsWrapper = withRouter(props => <Results {...props} />);

export class RouterComponent extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/search" render={() => <Search />} />
          <Route
            path="/results/:from/:to/:date/:people"
            render={() => <ResultsWrapper />}
          />
          <Route exact path="/" render={() => <Redirect to="search" />} />
        </div>
      </BrowserRouter>
    );
  }
}
