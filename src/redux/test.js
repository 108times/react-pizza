function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 };
    case 'counter/decremented':
      return { value: state.value - 1 };
  }
}

const store = createStore(counterReducer);
store.subscribe(() => console.log(store.getState()));

const CounterButton = ({ actionType = 'incremented', typeSign = '+' }) => {
  return (
    <button onClick={() => store.dispatch({ type: `counter/${actionType}` })}>{typeSign} 1</button>
  );
};
