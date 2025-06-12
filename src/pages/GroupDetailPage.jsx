import React, { useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import {
  FaArrowLeft, FaInfoCircle, FaUsers,
  FaCalendarAlt, FaGlobe, FaUserCircle
} from 'react-icons/fa';

function GroupDetailPage({ user, onLogout, onBackToGroups, group }) {
  const [message, setMessage] = useState('');

  // Estado com as mensagens da discussão do grupo 
  const [discussionMessages, setDiscussionMessages] = useState([
    {
      id: 1,
      user: { name: 'usuario_demo', avatar: null, isAdmin: true },
      timestamp: '09/06/2025 19:09',
      content: 'Bem-vindos ao grupo! Aqui podemos discutir as últimas tendências em tecnologia.',
    },
    {
      id: 2,
      user: { name: 'tech_enthusiast', avatar: null, isAdmin: false },
      timestamp: '09/06/2025 19:39',
      content: 'Alguém já testou a nova versão do React? As melhorias de performance são impressionantes!',
    },
  ]);

  // Lista de membros do grupo (simulada)
  const groupMembers = [
    { id: 1, name: 'usuario_demo', avatar: null, isAdmin: true },
    { id: 2, name: 'tech_enthusiast', avatar: null, isAdmin: false },
    { id: 3, name: 'dev_junior', avatar: null, isAdmin: false },
  ];

  // Função para enviar uma nova mensagem
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: discussionMessages.length + 1,
        user: { name: user.name, avatar: user.avatar, isAdmin: true },
        timestamp: new Date().toLocaleString('pt-BR', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        }),
        content: message,
      };
      setDiscussionMessages([...discussionMessages, newMessage]);
      setMessage(''); 
    }
  };

  // Caso o grupo não seja encontrado
  if (!group) {
    return <p>Grupo não encontrado.</p>;
  }

  return (
    <div style={groupDetailStyles.container}>
      {/* Navbar com usuário logado e botão de logout */}
      <Navbar user={user} onLogout={onLogout} />

      <div style={groupDetailStyles.content}>
        {/* Cabeçalho com botão de voltar e informações do grupo */}
        <div style={groupDetailStyles.header}>
          <FaArrowLeft style={groupDetailStyles.backIcon} onClick={onBackToGroups} />
          <div>
            <h1 style={groupDetailStyles.title}>{group.name}</h1>
            <p style={groupDetailStyles.subtitle}>{group.description}</p>
          </div>
        </div>

        {/* Conteúdo principal com discussão e informações laterais */}
        <div style={groupDetailStyles.mainSection}>
          {/* Seção de discussão do grupo */}
          <div style={groupDetailStyles.discussionSection}>
            <h2 style={groupDetailStyles.discussionTitle}>Discussão do Grupo</h2>

            {/* Campo para digitar e enviar nova mensagem */}
            <div style={groupDetailStyles.messageInputContainer}>
              <textarea
                placeholder="Compartilhe algo com o grupo..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={groupDetailStyles.messageInput}
              ></textarea>
              <button onClick={handleSendMessage} style={groupDetailStyles.sendMessageButton}>
                Enviar Mensagem
              </button>
            </div>

            {/* Lista de mensagens já enviadas */}
            <div style={groupDetailStyles.messagesList}>
              {discussionMessages.map((msg) => (
                <div key={msg.id} style={groupDetailStyles.messageCard}>
                  {/* Avatar do usuário */}
                  {msg.user.avatar ? (
                    <img src={msg.user.avatar} alt="User Avatar" style={groupDetailStyles.messageAvatar} />
                  ) : (
                    <FaUserCircle style={groupDetailStyles.messageIconAvatar} />
                  )}
                  <div style={groupDetailStyles.messageContent}>
                    {/* Informações do autor da mensagem */}
                    <div style={groupDetailStyles.messageInfo}>
                      <span style={groupDetailStyles.messageUserName}>{msg.user.name}</span>
                      {msg.user.isAdmin && <span style={groupDetailStyles.messageAdminTag}>Admin</span>}
                      <span style={groupDetailStyles.messageTimestamp}>{msg.timestamp}</span>
                    </div>
                    {/* Conteúdo da mensagem */}
                    <p style={groupDetailStyles.messageText}>{msg.content}</p>
                  </div>
                  {/* Botão de remover visível somente para admins */}
                  {msg.user.isAdmin && <button style={groupDetailStyles.removeButton}>Remove</button>}
                </div>
              ))}
            </div>
          </div>

          {/* Barra lateral com informações do grupo */}
          <div style={groupDetailStyles.infoSidebar}>
            {/* Informações básicas do grupo */}
            <div style={groupDetailStyles.infoCard}>
              <h3 style={groupDetailStyles.infoCardTitle}>
                <FaInfoCircle style={groupDetailStyles.infoIcon} /> Informações do Grupo
              </h3>
              <div style={groupDetailStyles.infoItem}>
                <FaUsers style={groupDetailStyles.infoItemIcon} /> Membros: {group.members}
              </div>
              <div style={groupDetailStyles.infoItem}>
                <FaCalendarAlt style={groupDetailStyles.infoItemIcon} /> Criado em: {group.createdAt.split(' ')[0]}
              </div>
              <div style={groupDetailStyles.infoItem}>
                <FaGlobe style={groupDetailStyles.infoItemIcon} /> Tipo: Público
              </div>
            </div>

            {/* Lista de membros do grupo */}
            <div style={groupDetailStyles.infoCard}>
              <h3 style={groupDetailStyles.infoCardTitle}>
                <FaUsers style={groupDetailStyles.infoIcon} /> Membros ({groupMembers.length})
              </h3>
              <ul style={groupDetailStyles.memberList}>
                {groupMembers.map((member) => (
                  <li key={member.id} style={groupDetailStyles.memberItem}>
                    {member.avatar ? (
                      <img src={member.avatar} alt="Member Avatar" style={groupDetailStyles.memberAvatar} />
                    ) : (
                      <FaUserCircle style={groupDetailStyles.memberIconAvatar} />
                    )}
                    <span>{member.name}</span>
                    {member.isAdmin && <span style={groupDetailStyles.memberAdminTag}>Admin</span>}
                    {!member.isAdmin && <span style={groupDetailStyles.memberTag}>Membro</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// CSS
const groupDetailStyles = {
  container: {
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  content: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '20px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
  },
  backIcon: {
    fontSize: '28px',
    marginRight: '20px',
    cursor: 'pointer',
    color: '#555',
  },
  title: {
    fontSize: '32px',
    color: '#333',
    marginBottom: '5px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
  },
  mainSection: {
    display: 'flex',
    gap: '30px',
  },
  discussionSection: {
    flex: 2,
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  discussionTitle: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  messageInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '25px',
  },
  messageInput: {
    width: '100%',
    minHeight: '100px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    fontSize: '16px',
    resize: 'vertical',
    fontFamily: 'inherit',
    marginBottom: '10px',
  },
  sendMessageButton: {
    backgroundColor: '#1a202c',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    alignSelf: 'flex-end',
    transition: 'background-color 0.3s ease',
  },
  sendMessageButtonHover: {
    backgroundColor: '#0056b3',
  },
  messagesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  messageCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '15px',
    display: 'flex',
    alignItems: 'flex-start',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  messageAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '15px',
    objectFit: 'cover',
  },
  messageIconAvatar: {
    fontSize: '40px',
    color: '#555',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    padding: '5px',
    marginRight: '15px',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContent: {
    flexGrow: 1,
  },
  messageInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  messageUserName: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#333',
    marginRight: '10px',
  },
  messageAdminTag: {
    backgroundColor: '#e0f7fa',
    color: '#00838f',
    padding: '3px 7px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold',
    marginRight: '10px',
  },
  messageTimestamp: {
    fontSize: '12px',
    color: '#999',
  },
  messageText: {
    fontSize: '15px',
    color: '#444',
    lineHeight: '1.4',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    fontSize: '13px',
    cursor: 'pointer',
    marginLeft: '15px',
    alignSelf: 'center',
  },
  infoSidebar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  infoCardTitle: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: '10px',
    color: '#555',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px',
  },
  infoItemIcon: {
    marginRight: '10px',
    color: '#777',
  },
  memberList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  memberItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    fontSize: '15px',
    color: '#444',
  },
  memberAvatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    marginRight: '10px',
    objectFit: 'cover',
  },
  memberIconAvatar: {
    fontSize: '35px',
    color: '#555',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    padding: '5px',
    marginRight: '10px',
    width: '35px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberAdminTag: {
    backgroundColor: '#e0f7fa',
    color: '#00838f',
    padding: '3px 7px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  memberTag: {
    backgroundColor: '#e6f7ff',
    color: '#2196f3',
    padding: '3px 7px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
};

export default GroupDetailPage;