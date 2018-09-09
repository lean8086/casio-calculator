import React, { Component } from 'react';
import Display from './components/Display';
import Buttons from './components/Buttons';
import reduce from './reducers';

class App extends Component {
  state = {
    operations: [],
    queue: [],
    operationExecuted: true,
    resultCalculated: false,
    on: true,
    memory: 0,
  }

  render() {
    return (
      <div className="calculator">
        <Display
          disabled={!this.state.on}
          value={this.state.queue.join('') || 0}
        />
        <Buttons
          onClick={action => this.setState(reduce(this.state, action))}
        />
      </div>
    );
  }
}

export default App;
