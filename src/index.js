import React from 'react';
import App from './views/App';
import reportWebVitals from './tests/reportWebVitals'
import { createRoot } from 'react-dom/client';

import './style/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@icon/micon/micon.css";

const container = document.getElementById('root')
const root = createRoot(container)
root.render( <React.StrictMode>
  <App />
</React.StrictMode>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log());
