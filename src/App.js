import React, { Component } from 'react';

import Routes from './routes';
// import Header from './components/header';

import './styles.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header /> */}
        <Routes />
      </div>
    );
  }
}

export default App;
