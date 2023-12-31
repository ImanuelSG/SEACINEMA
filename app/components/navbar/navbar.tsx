
import Container from "../Container";
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu";
import { User } from "@prisma/client";

interface NavbarProps {
    currentUser?: User | null;
}
const Navbar: React.FC<NavbarProps> =  ({currentUser}) => {
    
    return (
        <div className="fixed w-full bg-black z-10 shadown-sm">
        <div className="py-4 border-b-[1px]"> 
        <Container>
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
        <Logo/>
        <Search currentUser={currentUser}/>
        <UserMenu currentUser={currentUser}/>
        </div>
        </Container>

        </div>
        </div>
    );
}
export default Navbar;