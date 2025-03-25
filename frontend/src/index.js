import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';  // The main App component


// This is where we render the React application into the 'root' div in index.html
ReactDOM.render(
  <React.StrictMode>
    <App />  {/* This is the main React component */}
  </React.StrictMode>,
  document.getElementById('root')  // The HTML element with id 'root' will contain the React app
);


