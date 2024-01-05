import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import { LanguageProvider } from './components/LanguageContext';

ReactDOM.render(
  <Router>
     <LanguageProvider>
      <App />
    </LanguageProvider>
  </Router>,
  document.getElementById('root')
);
