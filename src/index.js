import React from 'react';
import { createRoot } from 'react-dom/client';
import ParentComponent from './components/ParentComponent';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ParentComponent />
  </React.StrictMode>
);
