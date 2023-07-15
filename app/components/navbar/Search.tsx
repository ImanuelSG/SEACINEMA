'use client'

import { User } from "@prisma/client";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
interface SearchProps {
    currentUser?: User| null 
}
const Search : React.FC<SearchProps>= ({currentUser}) => {
    const loginModal = useLoginModal();
    const router= useRouter();
    return (
        <div
        className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        transition
        cursor-pointer">
            <div className="
            flex flex-row items-center justify-between ">
                <div 
                onClick={() => {currentUser? (router.push(`/balance`)) : (loginModal.onOpen())
                    
                }}
                className="
                text-sm font-semibold px-6 text-white transition-colors duration-200 ease-in-out hover:text-red-500 ">
                    BALANCE  
                    
                </div>
                <div 
                onClick={() => {currentUser? (router.push(`/tickets`)) : (loginModal.onOpen())
                    
            }}
                className="
                hidden
                sm:block
                text-sm
                text-white
                font-semibold
                px-6
                border-x-[1px]
                flex-1
                text-center
                transition-colors duration-200 ease-in-out hover:text-red-500">
                TICKETS

                </div>
                <div onClick={()=>(router.replace(`/`)) } className="
                text-sm font-semibold px-6 text-white transition-colors duration-200 ease-in-out hover:text-red-500 ">
                    
                    MOVIES
                </div>
                
            </div>

        </div>
    )
}

export default Search ;