import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const container = document.getElementById('root');
const preLoader = document.getElementById('pre-loader');

if (container) {
  const root = createRoot(container);
  
  // Fade out pre-loader just before rendering
  if (preLoader) {
    preLoader.classList.add('fade-out');
    setTimeout(() => preLoader.remove(), 500);
  }

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Critical Error: Root element '#root' not found.");
}