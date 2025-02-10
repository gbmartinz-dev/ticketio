import { useState } from "react";

const TicketSidebar = ({ ticket, onClose, onAddComment }) => {
  const [newComment, setNewComment] = useState("");

  if(!ticket) return null; // Se não houver ticket, não renderiza nada

  const handleAddComment =() => {
    if (newComment.trim() === "") return; // Se o comentário estiver vazio, não faz nada
    onAddComment(ticket.id, newComment); // Adiciona o comentário ao ticket
    setNewComment(""); // Limpa o campo de comentário
  };

  return (
    <div className={`sidebar ${ticket ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>x</button>
      <h2>{ticket.title}</h2>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Descrição:</strong> {ticket.description}</p>
      <p><strong>Criado por:</strong> {ticket.creator}</p>
      <p><strong>Data da criação:</strong> {ticket.createdAt}</p>

      {/* Lista de Comentários */}
      <h3>Comentários</h3>
      <ul className="comment-list">
        {ticket.comments.length > 0 ? (
          ticket.comments.map((comment, index) => <li key={index}>{comment}</li>)
        ) : (
          <p>Nenhum comentário ainda.</p>
        )}
      </ul>

      {/* Adicionar Comentário */}
      <div className="comment-box">
        <textarea
          placeholder="Adicione o seu comentário..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Enviar</button>
      </div>
    </div>
  );
};

export default TicketSidebar;