import React from 'react';
import App from './App.js';
// import { createRoot } from 'react-dom';
import ReactDOM from 'react-dom/client';

// store element with id of root in domNode
const domNode = document.getElementById('root');
// set root equal to invoking createRoot and passing in domNode
const root = ReactDOM.createRoot(domNode);
// render component inside html element created that have
// id of root
root.render(<App/>);

