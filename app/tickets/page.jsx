import TicketClient from "./ticketclient";
import getTickets from "../actions/getTickets";
import { redirect } from "next/navigation";
import getCurrentUser from "../actions/getCurrentUser";

const Tickets = async () => {
  const transactions = await getTickets();
  const user = await getCurrentUser()
  if (!transactions | !user) {
    redirect('/');
  }

  return (
    <TicketClient transactions={transactions} />
  );
};

export default Tickets;
