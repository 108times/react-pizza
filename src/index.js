import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import './scss/app.scss';

// import App from './components/effects/test';
import App from './App';

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

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div
        style={{
          padding: '1rem',
        }}>
        <CounterButton />
        <CounterButton actionType="decremented" typeSign="-" />
      </div>

      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
