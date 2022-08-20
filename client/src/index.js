import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { StoreProvider } from './components/StoreContext'

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  rootElement
);