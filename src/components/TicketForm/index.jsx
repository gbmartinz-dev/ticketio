import { useState } from "react";

const TicketForm = ({ onSubmit }) => {
  const [ titulo, setTitulo] = useState("");
  const [ descricao, setDescricao ] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ titulo, descricao, status: "pendente" });
    setTitulo("");
    setDescricao("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(event) => setTitulo(event.target.value)}
      />
      <textarea 
        placeholder="Descrição"
        value={descricao}
        onChange={(event) => setDescricao(event.target.value)}
      />
      <button type="submit">Criar Ticket</button>
    </form>
  );
};

export default TicketForm;