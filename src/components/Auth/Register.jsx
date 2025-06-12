import React, { useState } from 'react';
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaLock, FaUpload } from 'react-icons/fa';

function Register({ onRegisterSuccess, onNavigateToLogin }) {
  // Estados para armazenar os dados do formulário
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  // Manipula a imagem de perfil quando o usuário seleciona uma
  const handleImageChange = (e) => { 
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Manipula o envio do formulário
  const handleSubmit = (e) => { 
    e.preventDefault();

    // Validação de senha
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    // Log para debug 
    console.log('Tentativa de cadastro:', { username, email, dob, profileImage });

    // Simula sucesso de cadastro
    onRegisterSuccess();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <FaUserCircle style={styles.avatar} />
        <h2 style={styles.title}>Criar Conta</h2>
        <p style={styles.subtitle}>Junte-se ao Connect</p>

        {/* Upload da imagem de perfil */}
        <div style={styles.imageUploadSection}>
          <label htmlFor="profile-upload" style={styles.uploadButton}>
            <FaUpload style={styles.uploadIcon} />
            Escolher Foto
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange} 
              style={{ display: 'none' }}
            />
          </label>

          {/* Preview da imagem de perfil */}
          {profileImage && (
            <img src={profileImage} alt="Preview" style={styles.profileImagePreview} />
          )}
        </div>

        {/* Formulário de cadastro */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <FaUserCircle style={styles.inputIcon} />
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ ...styles.input, paddingLeft: '40px' }} 
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <FaEnvelope style={styles.inputIcon} />
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ ...styles.input, paddingLeft: '40px' }}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <FaCalendarAlt style={styles.inputIcon} />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              style={{ ...styles.input, paddingLeft: '40px' }}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <FaLock style={styles.inputIcon} />
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...styles.input, paddingLeft: '40px' }}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <FaLock style={styles.inputIcon} />
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ ...styles.input, paddingLeft: '40px' }}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Criar Conta
          </button>
        </form>

        {/* Link para tela de login */}
        <p style={styles.loginText}>
          Já tem uma conta?{' '}
          <span onClick={onNavigateToLogin} style={styles.loginLink}>
            Entrar
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
    width: '450px',
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
  imageUploadSection: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  uploadButton: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#333',
    transition: 'background-color 0.3s ease',
  },
  uploadIcon: {
    marginRight: '10px',
  },
  profileImagePreview: {
    marginTop: '15px',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #ddd',
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
  loginText: {
    marginTop: '20px',
    color: '#666',
  },
  loginLink: {
    color: '#1a202c',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Register;