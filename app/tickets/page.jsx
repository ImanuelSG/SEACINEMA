import TicketClient from "./ticketclient";
import getTickets from "../actions/getTickets";
import { redirect } from "next/navigation";

const Tickets = async () => {
  const transactions = await getTickets();
  if (!transactions) {
    redirect('/');
  }

  return (
    <TicketClient transactions={transactions} />
  );
};

export default Tickets;
