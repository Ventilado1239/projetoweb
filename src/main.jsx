import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './App';
import './index.css';

// Renderiza a aplicação React dentro da div no HTML
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Componente principal que encapsula toda a aplicação */}
    <AppWrapper />
  </React.StrictMode>,
);