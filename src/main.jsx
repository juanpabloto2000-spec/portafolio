import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LeadProvider } from './context/LeadContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LeadProvider>
      <App />
    </LeadProvider>
  </React.StrictMode>
);
