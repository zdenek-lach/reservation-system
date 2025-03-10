import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './App';
import { AppProvider } from './context/AppContext';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
