'use client'

import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ClientProps {
  path: string; // Updated type to string
  time: string;
  currentTime: number
  showTime: number
  user: User | null

}

const MovieClientButton: React.FC<ClientProps> = ({ path, time,currentTime ,showTime, user}) => {
  const router = useRouter();
  const loginmodal = useLoginModal();
  const handleClick = () => {
    if(user==null){
      loginmodal.onOpen()
    }else
    router.push(`/movies/${path}`);
    router.refresh()
     // Scroll to the top of the page
  };
  const isDisabled = currentTime > showTime;
  return (
    <button
      className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-xl mx-4 my-4 md:mb-0 md:mr-4  disabled:opacity-70
      disabled:cursor-not-allowed"
      onClick={handleClick}
      disabled={isDisabled}
    >
      {time}
    </button>
  );
};

export default MovieClientButton;
