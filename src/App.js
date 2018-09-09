import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Screen from './components/Screen';
import Buttons from './components/Buttons';
import reduce from './reducers';

class App extends Component {
  state = {
    operations: [],
    queue: [0],
    operationExecuted: true,
    resultCalculated: false,
    on: true,
    memory: 0,
  }

  render() {console.log(this.state);
    return (
      <main className="calculator" role="main">
        <Header />
        <Screen
          disabled={!this.state.on}
          value={this.state.queue.join('')}
        />
        <Buttons
          onClick={action => this.setState(reduce(this.state, action))}
        />
      </main>
    );
  }
}

export default App;
