'use client'

import { Movie, User } from "@prisma/client";
import { useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/app/components/modals/ConfirmModal";
import useConfirmModal from "@/app/hooks/useConfirmModal";
import {toast} from "react-hot-toast"
import  axios  from "axios";
interface PaymentClientProps {
  soldSeats: number[][];
  movietitle: string;
  currentuser: User;
  movieId: number;
  time: number;
}

  const PaymentClient =  ({ movieId, time, soldSeats,movietitle,currentuser}: PaymentClientProps) => {
    
    const confirmModal = useConfirmModal();
    const router=useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState<Number[]>([]);
    if (!soldSeats){
      soldSeats=[]
    }
    const handleSeatClick = (seatNumber: Number) => {
      setSelectedSeats(prevSelectedSeats => {
        
        const isSeatSelected = prevSelectedSeats.includes(seatNumber);
        if (isSeatSelected) {
          // Deselect the seat
          return prevSelectedSeats.filter(seat => seat !== seatNumber);
        } else {
          // Select the seat
          return [...prevSelectedSeats, seatNumber];
        }
      });
    };
    

  const renderSeat = (seatNumber : number) => {
    const isSeatSelected = selectedSeats.includes(seatNumber);

    const isSeatSoldOut = soldSeats.some((section) =>section.includes(seatNumber))
    return (
      
      <button
        key={seatNumber.toString()}
        disabled={(selectedSeats.length>=6 &&!isSeatSelected) || (isSeatSoldOut)?(true):(false)}
        className={`px-2 py-1 mx-1 my-1 rounded ${
          isSeatSelected ? 'bg-green-500' : isSeatSoldOut ? "bg-red-500":'bg-gray-200'
        } disabled:opacity-30 disabled:cursor-not-allowed`}
        onClick={() => handleSeatClick(seatNumber)}
        
      >
        Seat {seatNumber.toString()}
      </button>
    );
  
    }

  const handleCancel = () => {
      router.push(`/movies/${movieId}`);
      router.refresh()
  }
  const onSubmit = async (seats:Number[]) => {
    try {
      setIsLoading(true);
      const convertedSeats = seats.map((seat) => Number(seat));
      const toastId = toast.loading("Loading...");
      const response = await axios.post(`/api/movies/${movieId.toString()}/${time.toString()}`,
        convertedSeats
      );
      if (response?.status === 200) {
        toast.dismiss(toastId);
        toast.success("Ticket Purchased");
        router.refresh();
        confirmModal.onClose();
      } else {
        toast.dismiss(toastId);
        toast.error(response.data.error);
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto xl:w-1/2 md:w-3/4 w-full py-8 px-8">
    <h1 className="text-3xl font-bold text-center mb-5">Select Your Seats</h1>
    <div className="flex flex-col">
      <div className="flex flex-row">
        <button className="p-1 mx-1 my-1 rounded bg-green-500" disabled></button>
        <div>: SELECTED</div>
      </div>
      <div className="flex flex-row">
        <button className="p-1 mx-1 my-1 rounded bg-gray-200" disabled></button>
        <div>: AVAILABLE</div>
      </div>
      <div className="flex flex-row">
        <button className="p-1 mx-1 my-1 rounded bg-red-500" disabled></button>
        <div>: SOLD OUT</div>
      </div>
    </div>
    <div className="grid grid-cols-4 gap-5 sm:grid-cols-6 lg:grid-cols-8">
      <div className="col-span-full flex justify-center items-center mb-4">
        <div className="w-full h-6 bg-gray-400 mt-10 text-center text-white" >SCREEN</div>
      </div>
      {Array.from({ length: 64 }, (_, index) => renderSeat(index + 1))}
    </div>
    <div className="mt-4">
      <p className="text-lg font-bold">Selected Seats: ({selectedSeats.length}/6)</p>
      {selectedSeats.length > 0 ? (
        <ul>
          {selectedSeats.map((seat) => (
            <li key={seat.toString()}>Seat {seat.toString()}</li>
          ))}
        </ul>
      ) : (
        <p>No seats selected</p>
      )}
    </div>
    <div className="flex flex-row justify-center gap-10 mt-10">
    <button onClick={confirmModal.onOpen} disabled={selectedSeats.length==0} className="disabled:opacity-30 disabled:cursor-not-allowed mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
      Checkout
    </button>
    <button
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleCancel}
        
      >
        Cancel
      </button><ConfirmModal seats={selectedSeats} movietitle={movietitle} movieId={movieId} watchdate={new Date(time)} onConfirm={() =>onSubmit(selectedSeats)}/></div>
  </div>
);

};
 
export default PaymentClient;