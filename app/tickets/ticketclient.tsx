'use client'
import { useState, useEffect } from 'react';
import { Transaction } from '@prisma/client';
import getMovieTitleById from '../actions/getMovieTitlebyId';
import axios from 'axios';

interface ClientProps {
  transactions: Transaction[];
}

const TicketClient: React.FC<ClientProps> = ({ transactions }) => {
  const [seats, setSeats] = useState<number[]>([]);

  const handleDeleteSeat = async (seat: number, transactionId: string, amount: number) => {
    try {
      console.log(seat,transactionId,amount)
      const response = await axios.delete(`/api/transactions/${seat}/${transactionId}/${amount}`);

      if (response?.status==200) {
        // Update the seats state or fetch updated transactions from the server
        setSeats((prevSeats) => prevSeats.filter((s) => s !== seat));
      } else {
        console.error('Failed to delete seat:', response.status);
      }
    } catch (error) {
      console.error('Failed to delete seat:', error);
    }
  };

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
            {transactions.map((transaction) =>
              transaction.seats.map((seat) => (
                <tr key={seat} className="border text-center">
                  <td className="py-2 px-4">{seat}</td>
                  <td className="py-2 px-4">{getMovieTitleById(Number(transaction.movieId))}</td>
                  <td className="py-2 px-4">{transaction.watchdatetime?.toDateString()}</td>
                  <td className="py-2 px-4">{Math.abs(transaction.amount)}</td>
                  <td className="py-2 px-4">{Math.abs(transaction.totalprice)}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDeleteSeat(seat, transaction.id, transaction.amount)}
                      
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-4">No Transactions</div>
      )}
    </div>
  );
};

export default TicketClient;
