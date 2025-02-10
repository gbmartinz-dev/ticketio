import React, { useState } from "react";
import "./AddTicketModal.css"; // Importando estilos

const AddTicketModal = ({ isOpen, onClose, onAddTicket }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [status, setStatus] = useState("Aberto");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !creator) {
      alert("Preencha todos os campos!");
      return;
    }

    // Criando um novo ticket
    const newTicket = {
      id: Date.now(), // Gerando ID único
      title,
      description,
      creator,
      status,
      createdAt: new Date().toISOString().split("T")[0], // Data de criação
      comments: [],
    };

    onAddTicket(newTicket); // Adiciona o ticket na lista
    onClose(); // Fecha o modal
  };

  if (!isOpen) return null; // Se não estiver aberto, não renderiza nada

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Adicionar Novo Ticket</h2>
        <form onSubmit={handleSubmit}>
          <label>Título:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>Descrição:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

          <label>Criador:</label>
          <input type="text" value={creator} onChange={(e) => setCreator(e.target.value)} required />

          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Aberto">Aberto</option>
            <option value="Em progresso">Em progresso</option>
            <option value="Concluído">Concluído</option>
          </select>

          <div className="modal-buttons">
            <button type="submit" className="save-btn">Salvar</button>
            <button type="button" className="close-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTicketModal;
