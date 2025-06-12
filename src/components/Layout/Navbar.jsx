import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';

// Componente de navegação (Navbar)
function Navbar({ user, onLogout }) {
  const location = useLocation();

  // Função para verificar se a rota atual é a ativa
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={navbarStyles.navbar}>
      {/* Logo e links */}
      <div style={navbarStyles.leftSection}>
        <div style={navbarStyles.logo}>Connect</div>
        <div style={navbarStyles.navLinks}>
          {/* Link para Feed */}
          <Link
            to="/home"
            style={{
              ...navbarStyles.navLink,
              ...(isActive('/home') ? navbarStyles.navLinkActive : {}),
            }}
          >
            Feed
          </Link>

          {/* Link para grupo */}
          <Link
            to="/group"
            style={{
              ...navbarStyles.navLink,
              ...(isActive('/group') ? navbarStyles.navLinkActive : {}),
            }}
          >
            Grupo
          </Link>
        </div>
      </div>

      {/* Informações do usuário */}
      <div style={navbarStyles.userInfo}>
        {user && (
          <Link to="/profile" style={navbarStyles.profileLinkWrapper}>
            {/* Mostra avatar do usuário ou ícone padrão */}
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                style={navbarStyles.userAvatar}
              />
            ) : (
              <FaUserCircle style={navbarStyles.userIconAvatar} />
            )}
            <span style={navbarStyles.userName}>{user.name}</span>
          </Link>
        )}

        {/* Botão de logout */}
        <button onClick={onLogout} style={navbarStyles.logoutButton}>
          Sair
        </button>
      </div>
    </nav>
  );
}

// CSS
const navbarStyles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a202c',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#555',
    fontSize: '18px',
    fontWeight: '500',
    paddingBottom: '5px',
    borderBottom: '2px solid transparent',
    transition: 'border-bottom 0.3s ease, color 0.3s ease',
  },
  navLinkActive: {
    color: '#1a202c',
    fontWeight: 'bold',
    borderBottom: '2px solid #1a202c',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  profileLinkWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  userIconAvatar: {
    fontSize: '40px',
    color: '#555',
    backgroundColor: '#e0e0e0',
    padding: '5px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#1a202c',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '600',
    padding: '8px 12px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
};

export default Navbar;