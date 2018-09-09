const resolve = (operations) => {
  try {
    const results = eval(operations.join(''));
    // Keep the results under 8 digits (using scientific notation)
    return results.toString().length <= 8 ? [results] : [results.toExponential(2)];
  } catch(e) {
    return 'ERROR';
  }
};

const clear = () => ({
  queue: [],
});

const turnOff = () => ({
  on: false,
});

const plusNegative = state => ({
  queue: resolve([...state.queue, '*', -1]),
  operationExecuted: true,
});

const percentage = state => ({
  operations: [],
  queue: resolve([...state.operations, ...state.queue, '/', 100]),
  operationExecuted: true,
});

const allClear = () => ({
  operations: [],
  queue: [],
  operationExecuted: true,
  on: true,
});

const memoryAdd = state => ({
  memory: state.queue.join(''),
});

const memoryClear = () => ({
  memory: 0,
});

const memoryRecall = state => ({
  queue: [state.memory],
});

const equal = state => ({
  operations: [],
  queue: resolve([...state.operations, ...state.queue]),
  operationExecuted: true,
});

const input = (state, action) => (
  // Set a limit of 8 digits max
  state.queue.length < 8 ? ({
    // When an operation was executed, start the queue from scratch
    // If no operation was executed then push the new value
    queue: !state.operationExecuted ? [...state.queue, action.value] : [action.value],
    operationExecuted: false,
  }) : state
);

/**
 * Only add an operator symbol to the operations if the last element is a number
 */
const operatorOverNumber = (state, action) => {
  const resultsOperator = resolve([...state.operations, ...state.queue]);
  return {
    operations: [...resultsOperator, action.value],
    queue: resultsOperator,
    operationExecuted: true,
  };
};

/**
 * If last element is an operator, replace the current operator in operations with the new one
 * For example: user can select "+" and then replace it with a "-" before introduce a number
 */
const operatorOverOperator = (state, action) => ({
  operations: state.operations.length ?
    // When other operations exists, just add an operator
    [...state.operations.slice(0, -1), action.value] :
    // When "equal" ("=") was pressed, user can add operator to previous results
    [...state.queue, action.value],
});

/**
 * Application Reducer
 */
export default (state, action) => {
  switch(action.type) {
    case 'clear': return clear();
    case 'off': return turnOff();
    case 'plusNegative': return plusNegative(state);
    case 'percentage': return percentage(state);
    case 'allClear': return allClear();
    case 'memoryAdd': return memoryAdd(state);
    case 'memoryClear': return memoryClear();
    case 'memoryRecall': return memoryRecall(state);
    case 'equal': return equal(state);
    case 'input': return input(state, action);
    case 'operator': return !state.operationExecuted ?
      operatorOverNumber(state, action) :
      operatorOverOperator(state, action);
    default: return {};
  }
};
