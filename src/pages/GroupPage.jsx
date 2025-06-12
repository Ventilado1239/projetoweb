import React, { useState } from 'react';  
import Navbar from '../components/Layout/Navbar'; 
import { FaUsers, FaCalendarAlt, FaUser } from 'react-icons/fa';  
import CreateGroup from '../components/Group/CreateGroup';  



function GroupPage({ user, onLogout, onViewGroup }) {

  // Armazena a lista de grupos com dados iniciais 
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Tecnologia e Inovação',
      members: 256,
      description: 'Discussões sobre as últimas tendências em tecnologia, programação e inovação digital.',
      createdBy: 'usuario_demo',
      createdAt: '14 jan 2024',
      isAdmin: true,
      isMember: true,
    },
    {
      id: 2,
      name: 'Fotografia',
      members: 89,
      description: 'Compartilhe suas melhores fotos e dicas de fotografia com outros entusiastas.',
      createdBy: 'foto_pro',
      createdAt: '31 jan 2024',
      isAdmin: false,
      isMember: true,
    },
    {
      id: 3,
      name: 'Culinária Mundial',
      members: 142,
      description: 'Receitas, dicas culinárias e discussões sobre gastronomia de todo o mundo.',
      createdBy: 'chef_master',
      createdAt: '09 fev 2024',
      isAdmin: false,
      isMember: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir o modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Função chamada quando um novo grupo é criado no modal
  // Adiciona o novo grupo à lista atual de grupos
  const handleCreateNewGroup = (newGroupData) => {
    console.log('Novo grupo criado:', newGroupData);
    setGroups(prevGroups => [
      ...prevGroups,
      {
        id: prevGroups.length + 1,              
        name: newGroupData.name,                 
        description: newGroupData.description,  
        members: 1,                               
        createdBy: user.name,                   
        createdAt: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        isAdmin: true,                          
        isMember: true,                     
      }
    ]);
  };

  // Função para entrar ou sair de um grupo
  // Altera o estado do grupo ajustando número de membros
  const handleJoinLeaveGroup = (groupId) => {
    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId
          ? { 
              ...group, 
              isMember: !group.isMember,  
              members: group.isMember ? group.members - 1 : group.members + 1  
            }
          : group
      )
    );
  };

  return (
    <div style={groupStyles.container}>
      {/* Barra de navegação com usuário e botão de logout */}
      <Navbar user={user} onLogout={onLogout} />

      <div style={groupStyles.content}>
        {/* Cabeçalho da página com título e botão para abrir modal de criação de grupo */}
        <div style={groupStyles.header}>
          <h1 style={groupStyles.title}>Grupos</h1>
          <button style={groupStyles.createGroupButton} onClick={handleOpenModal}>+ Criar Grupo</button>
        </div>

        {/* Subtítulo da página */}
        <p style={groupStyles.subtitle}>Participe de comunidades e discussões sobre seus interesses</p>

        {/* Grid que lista os grupos */}
        <div style={groupStyles.groupGrid}>
          {groups.map((group) => (
            <div key={group.id} style={groupStyles.groupCard}>
              {/* Nome do grupo e tag de administrador */}
              <h3 style={groupStyles.groupName}>
                {group.name} {group.isAdmin && <span style={groupStyles.adminTag}>Admin</span>}
              </h3>

              {/* Linha com ícone e quantidade de membros */}
              <div style={groupStyles.groupInfoRow}>
                <FaUsers style={groupStyles.groupIcon} /> {group.members} membros
              </div>

              {/* Descrição do grupo */}
              <p style={groupStyles.groupDescription}>{group.description}</p>

              {/* Administrador e data de criação */}
              <div style={groupStyles.groupMeta}>
                <div style={groupStyles.groupMetaItem}>
                  <FaUser style={groupStyles.groupIconSmall} /> Criado por {group.createdBy}
                </div>
                <div style={groupStyles.groupMetaItem}>
                  <FaCalendarAlt style={groupStyles.groupIconSmall} /> {group.createdAt}
                </div>
              </div>

              {/* Botões de ação */}
              <div style={groupStyles.groupActions}>
                <button
                  style={{
                    ...groupStyles.actionButton,
                    ...(group.isMember ? groupStyles.leaveButton : groupStyles.joinButton),
                  }}
                  onClick={() => handleJoinLeaveGroup(group.id)}
                >
                  {group.isMember ? 'Sair do Grupo' : 'Participar'}
                </button>

                <button
                  style={{
                    ...groupStyles.actionButton,
                    ...groupStyles.viewGroupButton,
                  }}
                  onClick={() => onViewGroup(group.id)}  
                >
                  Ver Grupo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Componente modal para criar grupo */}
      <CreateGroup
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreateGroup={handleCreateNewGroup}
      />
    </div>
  );
}

// CSS
const groupStyles = {
  container: {
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  content: {
    maxWidth: '1000px',
    margin: '20px auto',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '32px',
    color: '#333',
  },
  createGroupButton: {
    backgroundColor: '#1a202c',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  createGroupButtonHover: {
    backgroundColor: '#0056b3',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '30px',
  },
  groupGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
  },
  groupCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  groupName: {
    fontSize: '22px',
    color: '#333',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  adminTag: {
    backgroundColor: '#e0f7fa',
    color: '#00838f',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    marginLeft: '10px',
  },
  groupInfoRow: {
    display: 'flex',
    alignItems: 'center',
    color: '#777',
    fontSize: '15px',
    marginBottom: '10px',
  },
  groupIcon: {
    marginRight: '8px',
  },
  groupDescription: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '15px',
    flexGrow: 1,
  },
  groupMeta: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '20px',
  },
  groupMetaItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  groupIconSmall: {
    marginRight: '5px',
    fontSize: '13px',
  },
  groupActions: {
    display: 'flex',
    gap: '10px',
    marginTop: 'auto',
    justifyContent: 'center',
  },
  actionButton: {
    padding: '10px 25px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    minWidth: '120px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewGroupButton: {
    backgroundColor: '#1a202c',
    color: '#fff',
  },
  viewGroupButtonHover: {
    backgroundColor: '#0056b3',
  },
  leaveButton: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaveButtonHover: {
    backgroundColor: '#f5c6cb',
  },
  joinButton: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonHover: {
    backgroundColor: '#c3e6cb',
  },
};

export default GroupPage;