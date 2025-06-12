import React, { useState } from 'react';
import { FaUserCircle, FaEnvelope, FaLock } from 'react-icons/fa';

// Componente de login
function Login({ onLoginSuccess, onNavigateToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função chamada ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('Login attempt:', { email, password });
    onLoginSuccess(); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <FaUserCircle style={styles.avatar} />
        <h2 style={styles.title}>Entrar</h2>
        <p style={styles.subtitle}>Entre na sua conta para acessar o connect</p>

        {/* Formulário de login */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Campo de e-mail */}
          <div style={styles.inputGroup}>
            <FaEnvelope style={styles.inputIcon} />
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // Evita sobreposição do ícone
              style={{ ...styles.input, paddingLeft: '30px' }} 
              required
            />
          </div>

          {/* Campo de senha */}
          <div style={styles.inputGroup}>
            <FaLock style={styles.inputIcon} />
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...styles.input, paddingLeft: '30px' }}
              required
            />
          </div>

          {/* Botão de login */}
          <button type="submit" style={styles.button}>
            Entrar
          </button>
        </form>

        {/* Link para registro */}
        <p style={styles.registerText}>
          Não tem uma conta?{' '}
          <span onClick={onNavigateToRegister} style={styles.registerLink}>
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}

// CSS
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '400px',
  },
  avatar: {
    fontSize: '60px',
    color: '#333',
    marginBottom: '20px',
  },
  title: {
    fontSize: '28px',
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '8px 12px',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    color: '#999',
  },
  input: {
    flexGrow: 1,
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    padding: '8px 12px',
  },
  button: {
    backgroundColor: '#1a202c',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  registerText: {
    marginTop: '20px',
    color: '#666',
  },
  registerLink: {
    color: '#1a202c',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Login;