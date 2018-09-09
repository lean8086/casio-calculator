const resolve = operations => {
  try {
    // Keep the results under 8 digits
    return eval(operations.join(''));
  } catch(e) {
    return 'ERROR';
  }
};

export default (state, action) => {
  switch(action.type) {
    case 'off':
      return { on: false };
    case 'clear':
      return {
        operations: [],
        queue: [],
        operationExecuted: true,
        on: true,
      };
    case 'equal':
      const resultEqual = resolve([...state.operations, ...state.queue]);
      return {
        operations: [],
        queue: [resultEqual],
        operationExecuted: true,
      };
    case 'input':
      // Set a limit of 8 digits max
      return state.queue.length < 8 ? ({
        // When an operation was executed, start the queue from scratch
        // If no operation was executed then push the new value
        queue: !state.operationExecuted ? [...state.queue, action.value] : [action.value],
        operationExecuted: false,
      }) : state;
    case 'operator':
      // Only add an operator symbol to the operations if the last element is a number
      if (!state.operationExecuted) {
        const resultOperator = resolve([...state.operations, ...state.queue]);
        return {
          operations: [resultOperator, action.value],
          queue: [resultOperator],
          operationExecuted: true,
        };
      // Otherwise, replace the current operator in operations with the new one
      // For example: user can select "+" and then replace it with a "-" before introduce a number
      } else {
        return {
          operations: state.operations.length ?
            // When other operations exists, just add an operator
            [...state.operations.slice(0, -1), action.value] :
            // When "equal" ("=") was pressed, user can add operator to previous result
            [...state.queue, action.value],
        };
      }
    default:
      return {};
  }
};
