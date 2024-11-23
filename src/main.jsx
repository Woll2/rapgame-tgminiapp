import React from 'react';
import ReactDOM from 'react-dom/client';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';
import App from './App';
import './index.css';

// Manifest URL for TON Connect
const manifestUrl = 'https://raw.githubusercontent.com/Woll2/rapgame-tgminiapp/main/tonconnect-manifest.json';

// Initialize Telegram Web App
WebApp.ready();

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);
