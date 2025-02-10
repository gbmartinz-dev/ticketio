const TicketList = ({ tickets, onUpdateStatus, onSelectTicket, onTicketClick, onUpdateTicket }) => {
  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Status</th>
            <th>Tickets</th>
            <th>Processo</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td onClick={() => onTicketClick(ticket)} style={{ cursor: "pointer", color: "blue" }}>
                  {ticket.title}
                </td>
                <td>
                  <button style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }} onClick={() => onSelectTicket(ticket)}>
                    {ticket.title}
                  </button>
                </td>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>
                  <select value={ticket.status} onChange={(e) => onUpdateTicket(ticket.id, { status: e.target.value })}>
                    <option value="Aberto">Aberto</option>
                    <option value="Em progresso">Em progresso</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>Nenhum ticket encontrado...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
