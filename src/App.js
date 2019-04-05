import React, { Component } from 'react';

import './App.scss';
import { RouterComponent } from './container/router'

class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='container'>
          <h1>
            Mozio Recruitment Task
          </h1>
          <RouterComponent/>
        </div>
      </div>
    );
  }
}

export default App;
