import { useState, useEffect } from "react";
import TicketList from "./components/TicketList";
import TicketSidebar from "./components/TicketSidebar";
import AddTicketModal from "./components/AddTicketModal";
import "./components/TicketSidebar/TicketSidebar.css";
import ticketsData from "./data/tickets.json";
import "./App.css";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado do modal

  useEffect(() => {
    setTimeout(() => {
      setTickets(ticketsData);
    }, 500);
  }, []);

  // Carregar tickets do JSON mockado ao iniciar
  useEffect(() => {
    fetch("/tickets.json")
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, []);

  // Função para adicionar novo ticket
  const addTicket = (newTicket) => {
    setTickets([...tickets, { ...newTicket, id: tickets.length + 1 }]);
  };

  // Função para atualizar um ticket (ex: mudar status)
  const updateTicket = (id, updatedFields) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, ...updatedFields } : ticket
      )
    );
  };

  const updateTicketStatus = (id, newStatus) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  const addCommentToTicket = (id, comment) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, comments: [...ticket.comments, comment] } : ticket
      )
    );
  };

  const filteredTickets = statusFilter
    ? tickets.filter((ticket) => ticket.status === statusFilter)
    : tickets;

  return (
    <div className="container">
      <h1>Ticket.io - Sistema de Tickets</h1>
      <button className="add-ticket-btn" onClick={() => addTicket({ title: "Novo Ticket", status: "Aberto", description: "Teste", creator: "Usuário" })}>
        ➕ Adicionar Ticket
      </button>

      {/* Filtro de Status */}
      <div className="filter-container">
        <label>Filtrar por Status: </label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Todos</option>
          <option value="Aberto">Aberto</option>
          <option value="Em progresso">Em progresso</option>
          <option value="Concluído">Concluído</option>
        </select>
      </div>

      {/* Lista de Tickets */}
      <TicketList tickets={filteredTickets} onUpdateStatus={updateTicketStatus} onSelectTicket={setSelectedTicket} onTicketClick={setSelectedTicket} onUpdateTicket={updateTicket} />
      {selectedTicket && <TicketSidebar ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />}

      {/* Overlay escurecendo fundo ao abrir o painel */}
      <div className={`overlay ${selectedTicket ? "active" : ""}`} onClick={() => setSelectedTicket(null)}></div>

      {/* Painel Lateral */}
      <TicketSidebar
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        onAddComment={addCommentToTicket}
      />

      {/* Modal de adicionar ticket */}
      <AddTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTicket={addTicket} />
    </div>
  );
};

export default App;
