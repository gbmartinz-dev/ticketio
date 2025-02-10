import { createContext, useState } from "react";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  const adicionarTicket = (ticket) => setTickets([...tickets, { ...ticket, id: Date.now() }]);
  const atualizarTicket = (id, status) => {
    setTickets(tickets.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket)));
  };

  return (
    <TicketContext.Provider value={{ tickets, adicionarTicket, atualizarTicket}}>
      {children}
    </TicketContext.Provider>
  );
};