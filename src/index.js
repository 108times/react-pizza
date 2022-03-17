import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// import {} from './redux/reducers';
import './scss/app.scss';
import './components/effects/rippleNew/style.css';

// import App from './components/effects/rippleNew/test';
import App from './App';
import { store } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
