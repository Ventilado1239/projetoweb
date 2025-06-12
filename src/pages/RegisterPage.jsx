import React from 'react';
// Importa o componente de register
import Register from '../components/Auth/Register';

/**
 * Página de registro de usuário
 * @param {function} onRegisterSuccess // Função chamada após o registro bem-sucedido
 * @param {function} onNavigateToLogin // Função para navegar até a página de login
 */

function RegisterPage({ onRegisterSuccess, onNavigateToLogin }) {
  return (
    <Register 
      onRegisterSuccess={onRegisterSuccess} 
      onNavigateToLogin={onNavigateToLogin} 
    />
  );
}

export default RegisterPage;