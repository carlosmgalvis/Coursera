import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// Custom logger to handle structured data
const sendToAnalytics = (metric) => {
  // 1. Improved Console Logging (Structured & Readable)
  console.table(metric); 

  // 2. Send to Analytics Endpoint
  const body = JSON.stringify(metric);
  const url = 'https://your-analytics-endpoint.com/vitals';

  // Use sendBeacon for reliable delivery even if the page is closing
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
};

reportWebVitals(sendToAnalytics);