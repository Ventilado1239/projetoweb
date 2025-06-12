import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; 

// Componente de modal para criação de grupos
function CreateGroup({ isOpen, onClose, onCreateGroup }) {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  // Lógica de envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se os campos não estão vazios
    if (groupName.trim() && groupDescription.trim()) {
      onCreateGroup({ name: groupName, description: groupDescription }); 
      setGroupName('');
      setGroupDescription('');
      onClose(); 
    } else {
      alert('Por favor, preencha o nome e a descrição do grupo.');
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <h2 style={modalStyles.title}>Criar Novo Grupo</h2>
          {/* Botão de fechar */}
          <FaTimes style={modalStyles.closeButton} onClick={onClose} />
        </div>

        <p style={modalStyles.subtitle}>
          Crie um grupo para reunir pessoas com interesses similares.
        </p>

        {/* Formulário de criação */}
        <form onSubmit={handleSubmit} style={modalStyles.form}>
          <label htmlFor="group-name" style={modalStyles.label}>
            Nome do Grupo
          </label>
          <input
            id="group-name"
            type="text"
            placeholder="Ex: Tecnologia e Inovação"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            style={modalStyles.input}
            required
          />

          <label htmlFor="group-description" style={modalStyles.label}>
            Descrição
          </label>
          <textarea
            id="group-description"
            placeholder="Descreva o propósito do grupo..."
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            style={modalStyles.textarea}
            rows="4"
            required
          ></textarea>

          {/* Botões de ação */}
          <div style={modalStyles.actions}>
            <button type="button" onClick={onClose} style={modalStyles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" style={modalStyles.createButton}>
              Criar Grupo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// CSS
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    width: '450px',
    maxWidth: '90%',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: '24px',
    color: '#999',
    cursor: 'pointer',
  },
  subtitle: {
    fontSize: '15px',
    color: '#666',
    marginBottom: '25px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
  textarea: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    width: '100%',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginTop: '25px',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    color: '#333',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
  createButton: {
    backgroundColor: '#1a202c',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default CreateGroup;