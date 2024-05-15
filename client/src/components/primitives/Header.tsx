import { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import unite_logo from "/unite_logo.svg" 
import Button from "./Button";

const Header:React.FC = () => {

    const [offset, setOffset] = useState(0);

    //fix later
    useEffect(() => {
        const onScroll = () => setOffset(window.scrollY);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return(
        <div className={`sticky transition-all z-50 duration-500 ease-in-out ${offset === 0 ? "bg-gradient-to-b from-[rgba(0,0,0,.75)] to-transparent" : "bg-primary"} top-0 flex p-3 w-full gap-3 justify-between font-bold`}>
            <div className="flex items-center h-10 shrink-0 text-text">
                <img src={unite_logo}></img>
            </div>
            <Searchbar/>
            <div className="flex gap-2 items-center">
                <Button variant="text" className="uppercase font-bold opacity-75 text-sm">sign in</Button>
                <Button className="uppercase font-bold text-sm">sign up</Button>
            </div>
        </div>
    )
}

export default Header;