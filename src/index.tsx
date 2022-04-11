import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import '@/index.css';
import App from '@/App';
import ExplorationProvider from './components/space/exploration/ExplorationProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ExplorationProvider>
        <App />
      </ExplorationProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
