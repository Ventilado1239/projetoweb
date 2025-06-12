import React, { useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import {
  FaImage,
  FaVideo,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaUserCircle,
} from 'react-icons/fa';

function HomePage({ user, onLogout }) {
  // Conteúdo digitado pelo usuário
  const [postContent, setPostContent] = useState(''); 
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: 'usuario_demo', avatar: null },
      time: 'há menos de um minuto',
      content: 'Esta é a primeira postagem na nossa rede social! Bem-vindos!',
      likes: 5,
      dislikes: 0,
      comments: 1,
      type: 'text',
    },
    {
      id: 2,
      user: { name: 'fotografo_pro', avatar: null },
      time: 'há cerca de 2 horas',
      content: 'Compartilhando uma foto incrível que tirei hoje!',
      likes: 12,
      dislikes: 1,
      comments: 0,
      type: 'image',
      imageUrl: 'https://placehold.co/400x200/cccccc/333333?text=Sua+Imagem',
    },
  ]);

  // Função para criar nova postagem
  const handlePost = () => {
    if (postContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        user: { name: user.name, avatar: user.avatar },
        time: 'agora',
        content: postContent,
        likes: 0,
        dislikes: 0,
        comments: 0,
        type: 'text',
      };
      setPosts([newPost, ...posts]);
      setPostContent('');
    }
  };

  return (
    <div style={homeStyles.container}>
      {/* Barra de navegação */}
      <Navbar user={user} onLogout={onLogout} />

      <div style={homeStyles.content}>
        {/* Criador de postagens */}
        <div style={homeStyles.postCreator}>
          <div style={homeStyles.postCreatorHeader}>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                style={homeStyles.currentUserAvatar}
              />
            ) : (
              <FaUserCircle style={homeStyles.currentUserIconAvatar} />
            )}
            <textarea
              placeholder="O que está acontecendo?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              style={homeStyles.postInput}
            />
          </div>

          <div style={homeStyles.postCreatorActions}>
            <button style={homeStyles.actionButton}>
              <FaImage /> Foto
            </button>
            <button style={homeStyles.actionButton}>
              <FaVideo /> Vídeo
            </button>
            <button style={homeStyles.postButton} onClick={handlePost}>
              Postar
            </button>
          </div>
        </div>

        {/* Lista de postagens */}
        {posts.map((post) => (
          <div key={post.id} style={homeStyles.postCard}>
            <div style={homeStyles.postHeader}>
              {post.user.avatar ? (
                <img
                  src={post.user.avatar}
                  alt="User Avatar"
                  style={homeStyles.postAvatar}
                />
              ) : (
                <FaUserCircle style={homeStyles.postIconAvatar} />
              )}
              <div>
                <div style={homeStyles.postUserName}>{post.user.name}</div>
                <div style={homeStyles.postTime}>{post.time}</div>
              </div>
            </div>

            <div style={homeStyles.postContent}>
              {post.type === 'text' && <p>{post.content}</p>}
              {post.type === 'image' && (
                <>
                  <p>{post.content}</p>
                  <img
                    src={post.imageUrl}
                    alt="Post Image"
                    style={homeStyles.postImage}
                  />
                </>
              )}
            </div>

            <div style={homeStyles.postActions}>
              <div style={homeStyles.postActionItem}>
                <FaThumbsUp style={homeStyles.postActionIcon} /> {post.likes}
              </div>
              <div style={homeStyles.postActionItem}>
                <FaThumbsDown style={homeStyles.postActionIcon} /> {post.dislikes}
              </div>
              <div style={homeStyles.postActionItem}>
                <FaComment style={homeStyles.postActionIcon} /> {post.comments} comentário
                {post.comments !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// CSS
const homeStyles = {
  container: {
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  content: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
  },
  postCreator: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  postCreatorHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  currentUserAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '15px',
    objectFit: 'cover',
  },
  currentUserIconAvatar: {
    fontSize: '50px',
    color: '#555',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    padding: '5px',
    marginRight: '15px',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postInput: {
    flexGrow: 1,
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    minHeight: '80px',
    resize: 'vertical',
    fontSize: '16px',
    fontFamily: 'inherit',
  },
  postCreatorActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #eee',
    paddingTop: '15px',
    marginTop: '15px',
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#555',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    gap: '10px',
  },
  postButton: {
    backgroundColor: '#1a202c',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  postAvatar: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    marginRight: '15px',
    objectFit: 'cover',
  },
  postIconAvatar: {
    fontSize: '45px',
    color: '#555',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    padding: '5px',
    marginRight: '15px',
    width: '45px',
    height: '45px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postUserName: {
    fontWeight: 'bold',
    fontSize: '17px',
    color: '#333',
  },
  postTime: {
    fontSize: '13px',
    color: '#777',
  },
  postContent: {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#333',
    marginBottom: '15px',
  },
  postImage: {
    maxWidth: '100%',
    borderRadius: '8px',
    marginTop: '10px',
    objectFit: 'cover',
  },
  postActions: {
    display: 'flex',
    alignItems: 'center',
    borderTop: '1px solid #eee',
    paddingTop: '15px',
    marginTop: '15px',
    gap: '20px',
  },
  postActionItem: {
    display: 'flex',
    alignItems: 'center',
    color: '#555',
    fontSize: '15px',
    cursor: 'pointer',
  },
  postActionIcon: {
    marginRight: '5px',
    color: '#777',
  },
};

export default HomePage;