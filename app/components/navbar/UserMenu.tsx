'use client' ;

import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from "../Avatar";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";

interface UserMenuProps{
    currentUser?: User | null
}
const UserMenu : React.FC<UserMenuProps>= ({currentUser}) => {
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => (!value));
    }, []);
    
    const onSignOut = ()=>{
        toast.promise(
            signOut(),{
                loading: 'Signing out...',
      success: 'Signed out',
      error: (error) => error.message || 'Something went wrong.',
            }
        )
    }

   
    return(
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                {currentUser?(<div onClick={toggleOpen}
                className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200
                flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    
                    <div className="px-2 text-lg text-white font-bold">
                    Hello, {currentUser.username}
                    </div>
                </div>):( <div onClick={toggleOpen}
                className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200
                flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <div className="pl-3">
                    <AiOutlineMenu color="white"/>
                    </div>
                    <div className="hidden md:block px-3">
                        <Avatar/>
                        
                    </div>
                
                </div>)}
                
                {isOpen&&(
                    <div className="
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                    ">
                        <div className="flex flex-col cursor-pointer ">
                            {currentUser? ( <>

                        <MenuItem onClick={onSignOut} label="Sign Out"/> </>):(
                       <>
                        <MenuItem onClick={loginModal.onOpen } label="Log in"/>
                        <MenuItem onClick={registerModal.onOpen} label="Sign Up"/></>)}
                        </div>
                    </div>
                )}</div>
        </div>
    );
}

export default UserMenu;