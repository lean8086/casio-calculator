const resolve = operations => {
  try {
    const results = eval(operations.join(''));
    // Keep the results under 8 digits (using scientific notation)
    return results.toString().length <= 8 ? results : results.toExponential(2);
  } catch(e) {
    return 'ERROR';
  }
};

export default (state, action) => {
  switch(action.type) {
    case 'clear':
      return { queue: [] };
    case 'off':
      return { on: false };
    case 'percentage':
      return {
        operations: [],
        queue: [resolve([...state.operations, ...state.queue, '/', 100])],
      };
    case 'allClear':
      return {
        operations: [],
        queue: [],
        operationExecuted: true,
        on: true,
      };
    case 'equal':
      const resultsEqual = resolve([...state.operations, ...state.queue]);
      return {
        operations: [],
        queue: [resultsEqual],
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
        const resultsOperator = resolve([...state.operations, ...state.queue]);
        return {
          operations: [resultsOperator, action.value],
          queue: [resultsOperator],
          operationExecuted: true,
        };
      // Otherwise, replace the current operator in operations with the new one
      // For example: user can select "+" and then replace it with a "-" before introduce a number
      } else {
        return {
          operations: state.operations.length ?
            // When other operations exists, just add an operator
            [...state.operations.slice(0, -1), action.value] :
            // When "equal" ("=") was pressed, user can add operator to previous results
            [...state.queue, action.value],
        };
      }
    default:
      return {};
  }
};
