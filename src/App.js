import React, { Component } from 'react';
import Display from './components/Display';
import Buttons from './components/Buttons';
import reducers from './reducers';

class App extends Component {
  state = {
    operations: [],
    queue: [],
    operationExecuted: true,
    on: true,
  }

  render() {console.log(this.state)
    return (
      <div className="calculator">
        <Display
          disabled={!this.state.on}
          value={this.state.queue.join('') || 0}
        />
        <Buttons
          onClick={action => this.setState(reducers(this.state, action))}
        />
      </div>
    );
  }
}

export default App;
