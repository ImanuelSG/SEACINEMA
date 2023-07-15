'use client'
import { useState } from 'react';
import { Transaction } from '@prisma/client';
import getMovieTitleById from '../actions/getMovieTitlebyId';
import  toast  from 'react-hot-toast';
import DeleteModal from '../components/modals/DeleteModal';
import { useRouter } from 'next/navigation';
import useDeleteModal from '../hooks/useDeleteModal';


interface ClientProps {
  transactions: Transaction[];
}

const TicketClient: React.FC<ClientProps> = ({ transactions }) => {
  const [seat, setSeat] = useState(0);
  const [movietitle, setMovieTitle] = useState("");
  const [watchdate, setWatchDate] = useState(new Date())

  const [TransId, setTransId] = useState("")
  const [amt, setAmt] = useState(0)
  const deletemodal = useDeleteModal();
  const router = useRouter();

  const formatReserveDate = (date : any) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  const handleDeleteSeat = async (seat: number, transactionId: string, amount: number) => {
    try {

      toast.loading("Loading...")
      const response = await fetch(`/api/transactions/${seat}/${transactionId}/${amount}`,
      {
        method:"DELETE"
      })
      const data = await response.json()
      if (response.ok) {
        toast.dismiss()
        toast.success('Ticket Deleted')
        router.refresh()

      } else {
        toast.dismiss()
        toast.error(data.error);
      }
      deletemodal.onClose()
    } catch (error : any) {
      toast.dismiss();
      toast.error(error.message);
    }
  };
  const handleopenmodal = (transaction : Transaction, rowseat :number) =>{
    deletemodal.onOpen()
    setMovieTitle(getMovieTitleById(Number(transaction.movieId)));
    setSeat(rowseat);
    setWatchDate(transaction.watchdatetime || new Date());
    setAmt(transaction.amount);
    setTransId(transaction.id);
  }

  return (
    <div className="container mx-auto">
      <div className="py-10 text-4xl text-center font-bold">YOUR TICKETS</div>
      {Array.isArray(transactions) && transactions.length > 0 ? (
        <table className="w-full table-fixed border text-center-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border text-center">Seat</th>
              <th className="py-2 px-4 border text-center">Movie</th>
              <th className="py-2 px-4 border text-center">Watch Date</th>
              <th className="py-2 px-4 border text-center">Amount</th>
              <th className="py-2 px-4 border text-center">Total Price</th>
              <th className="py-2 px-4 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.filter((s)=>s.totalprice).map((transaction) =>
              transaction.seats.map((seat) => (
                <tr key={seat} className="border text-center">
                  <td className="py-2 px-4">{seat}</td>
                  <td className="py-2 px-4">{getMovieTitleById(Number(transaction.movieId))}</td>
                  <td className="py-2 px-4">{transaction.watchdatetime?.toDateString()}</td>
                  <td className="py-2 px-4">{Math.abs(transaction.amount)}</td>
                  <td className="py-2 px-4">{transaction.totalprice?(Math.abs(transaction.totalprice)):(0)}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:opacity-30
                      disabled:cursor-not-allowed"
                      onClick={()=>handleopenmodal(transaction,seat)}
                      disabled={Date.now() > (transaction.watchdatetime?.getTime() ? (transaction.watchdatetime.getTime()) : (0)) ? true : false}
                      
                      
                    >
                      {`${Date.now() > (transaction.watchdatetime?.getTime() ? (transaction.watchdatetime.getTime()) : (0)) ?("EXPIRED"):("Delete")}`}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <DeleteModal seat={seat} onConfirm={() => handleDeleteSeat(seat, TransId, amt)} movietitle={movietitle} watchdate={formatReserveDate(watchdate)}/>
        </table>
      ) : (
        <div className="text-center py-4">No Transactions</div>
      )}
    </div>
  );
};

export default TicketClient;
