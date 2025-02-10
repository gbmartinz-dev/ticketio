import { useState } from "react";

const TicketForm = ({ onSubmit }) => {
  const [ title, setTitle] = useState("");
  const [ description, setDescription ] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, description, status: "pendente" });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Título"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <textarea 
        placeholder="Descrição"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button type="submit">Criar Ticket</button>
    </form>
  );
};

export default TicketForm;