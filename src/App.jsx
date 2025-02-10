import { useState, useEffect } from "react";
import TicketList from "./components/TicketList";
import TicketSidebar from "./components/TicketSidebar";
import ticketsData from "./data/tickets.json";
import "./App.css";
import "./components/TicketSidebar/TicketSidebar.css";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setTickets(ticketsData);
    }, 500);
  }, []);

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
      <TicketList tickets={filteredTickets} onUpdateStatus={updateTicketStatus} onSelectTicket={setSelectedTicket} />

      {/* Overlay escurecendo fundo ao abrir o painel */}
      <div className={`overlay ${selectedTicket ? "active" : ""}`} onClick={() => setSelectedTicket(null)}></div>

      {/* Painel Lateral */}
      <TicketSidebar
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        onAddComment={addCommentToTicket}
      />
    </div>
  );
};

export default App;
