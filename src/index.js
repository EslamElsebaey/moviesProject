import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css"
import "@fortawesome/fontawesome-free/js/all.min.js"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "@popperjs/core/dist/cjs/popper";
import "../src/index.css";





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
    <App />
    </HashRouter>
  </React.StrictMode>
);

