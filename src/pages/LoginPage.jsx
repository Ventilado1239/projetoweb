import React from 'react';
// Importa o componente de login
import Login from '../components/Auth/Login'; 

// Página de login principal
function LoginPage({ onLoginSuccess, onNavigateToRegister }) {
  return (
    <Login
      onLoginSuccess={onLoginSuccess}
      onNavigateToRegister={onNavigateToRegister}
    />
  );
}

export default LoginPage; 