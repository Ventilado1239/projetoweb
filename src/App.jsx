import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import GroupsPage from './pages/GroupPage';
import GroupDetailPage from './pages/GroupDetailPage';
import ProfilePage from './pages/ProfilePage';

function AppRoutes() {
  const [currentUser, setCurrentUser] = useState(null);

  const [selectedGroup, setSelectedGroup] = useState(null);

  const navigate = useNavigate();

  // Função chamada após login bem-sucedido
  const handleLoginSuccess = () => {
    setCurrentUser({
      id: 1,
      name: 'usuario_demo',
      username: 'usuario_demo',
      email: 'seu@gmail.com',
      avatar: null,
      dob: '31/12/1989',
      postsCount: 15,
      connectionsCount: 42,
      groupsCount: 5,
    });

    navigate('/home');
  };

  // Função chamada após registro bem-sucedido
  const handleRegisterSuccess = () => {
    console.log('Registro realizado com sucesso! Redirecionando para login.');
    navigate('/login');
  };

  // Função para fazer logout do usuário
  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  // Função para visualizar os detalhes de um grupo específico
  const handleViewGroup = (groupId) => {
    const groups = [
      { id: 1, name: 'Tecnologia e Inovação', description: 'Discussões sobre as últimas tendências em tecnologia, programação e inovação digital.', members: 256, createdAt: '14 jan 2024' },
      { id: 2, name: 'Fotografia', description: 'Compartilhe suas melhores fotos e dicas de fotografia com outros entusiastas.', members: 89, createdAt: '31 jan 2024' },
      { id: 3, name: 'Culinária Mundial', description: 'Receitas, dicas culinárias e discussões sobre gastronomia de todo o mundo.', members: 142, createdAt: '09 fev 2024' },
    ];

    const group = groups.find(g => g.id === groupId);
    setSelectedGroup(group);
    navigate(`/group/${groupId}`);
  };

  return (
    <Routes>
      {/* Rota principal e de login */}
      <Route
        path="/"
        element={<LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => navigate('/register')} />}
      />
      <Route
        path="/login"
        element={<LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => navigate('/register')} />}
      />

      {/* Rota de registro */}
      <Route
        path="/register"
        element={<RegisterPage onRegisterSuccess={handleRegisterSuccess} onNavigateToLogin={() => navigate('/login')} />}
      />

      {/* Se o usuário estiver logado, mostra as rotas protegidas */}
      {currentUser ? (
        <>
          {/* Página inicial do usuário */}
          <Route path="/home" element={<HomePage user={currentUser} onLogout={handleLogout} />} />

          {/* Página de listagem de grupos */}
          <Route path="/group" element={<GroupsPage user={currentUser} onLogout={handleLogout} onViewGroup={handleViewGroup} />} />

          {/* Página de detalhes de um grupo */}
          <Route
            path="/group/:id"
            element={<GroupDetailPage user={currentUser} onLogout={handleLogout} onBackToGroups={() => navigate('/group')} group={selectedGroup} />}
          />

          {/* Página de perfil do usuário */}
          <Route path="/profile" element={<ProfilePage user={currentUser} onLogout={handleLogout} />} />
        </>
      ) : (
        <Route path="*" element={<LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => navigate('/register')} />} />
      )}
    </Routes>
  );
}

// Componente principal que encapsula as rotas dentro do Router
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;