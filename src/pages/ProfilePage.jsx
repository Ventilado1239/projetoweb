import React from 'react';
import Navbar from '../components/Layout/Navbar';
import { FaInfoCircle, FaChartBar, FaClock, FaUserCircle } from 'react-icons/fa';

/**
 * Página de perfil do usuário.
 * @param {object} user //Dados do usuário logado.
 * @param {function} onLogout //Função para realizar logout.
 */

function ProfilePage({ user, onLogout }) {
  if (!user) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <div style={profileStyles.container}>
      {/* Barra de navegação */}
      <Navbar user={user} onLogout={onLogout} />

      <div style={profileStyles.content}>
        {/* Cabeçalho do perfil */}
        <div style={profileStyles.profileHeader}>
          {user.avatar ? (
            <img src={user.avatar} alt="Profile Avatar" style={profileStyles.profileAvatar} />
          ) : (
            <FaUserCircle style={profileStyles.profileIconAvatar} />
          )}

          <h2 style={profileStyles.profileName}>{user.name}</h2>
          <p style={profileStyles.profileEmail}>{user.email}</p>
          <p style={profileStyles.memberSince}>Membro desde dezembro 2023</p>
        </div>

        {/* Seções de informações */}
        <div style={profileStyles.statsGrid}>
          {/* Cartão de informações pessoais */}
          <div style={profileStyles.infoCard}>
            <h3 style={profileStyles.infoCardTitle}>
              <FaInfoCircle style={profileStyles.infoIcon} /> Informações
            </h3>
            <div style={profileStyles.infoItem}>Data de Nascimento: {user.dob}</div>
            <div style={profileStyles.infoItem}>Nome de Usuário: @{user.username}</div>
          </div>

          {/* Cartão de estatísticas */}
          <div style={profileStyles.infoCard}>
            <h3 style={profileStyles.infoCardTitle}>
              <FaChartBar style={profileStyles.infoIcon} /> Estatísticas
            </h3>
            <div style={profileStyles.infoItem}>Postagens: {user.postsCount}</div>
            <div style={profileStyles.infoItem}>Conexões: {user.connectionsCount}</div>
            <div style={profileStyles.infoItem}>Grupos: {user.groupsCount}</div>
          </div>

          {/* Cartão de atividade recente */}
          <div style={profileStyles.infoCard}>
            <h3 style={profileStyles.infoCardTitle}>
              <FaClock style={profileStyles.infoIcon} /> Atividade Recente
            </h3>
            <ul style={profileStyles.activityList}>
              <li style={profileStyles.activityItem}>Publicou uma nova foto</li>
              <li style={profileStyles.activityItem}>Entrou no grupo "Tecnologia"</li>
              <li style={profileStyles.activityItem}>Fez uma nova conexão</li>
            </ul>
          </div>
        </div>

        {/* Sessão de postagens recentes */}
        <div style={profileStyles.postagensRecentTitle}>Postagens Recentes</div>
        <div style={profileStyles.noPostsMessage}>
          As postagens do usuário aparecerão aqui
          <br />
          Funcionalidade será implementada com a integração do Supabase
        </div>
      </div>
    </div>
  );
}

// CSS
const profileStyles = {
  container: {
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  content: {
    maxWidth: '1000px',
    margin: '20px auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileHeader: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '30px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  profileAvatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '15px',
    border: '4px solid #eee',
  },
  profileIconAvatar: {
    fontSize: '100px',
    color: '#555',
    backgroundColor: '#e0e0e0',
    padding: '10px',
    marginBottom: '15px',
    width: '120px',
    height: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    border: '4px solid #eee',
  },
  profileName: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
  },
  profileEmail: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '10px',
  },
  memberSince: {
    fontSize: '14px',
    color: '#888',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
    width: '100%',
    justifyItems: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    width: '100%',
    maxWidth: '300px',
  },
  infoCardTitle: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: '10px',
    color: '#555',
  },
  infoItem: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '8px',
  },
  activityList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  activityItem: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '8px',
    paddingLeft: '15px',
    position: 'relative',
  },
  postagensRecentTitle: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
    width: '100%',
    textAlign: 'center',
  },
  noPostsMessage: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '30px',
    textAlign: 'center',
    color: '#777',
    fontSize: '18px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
};

export default ProfilePage;