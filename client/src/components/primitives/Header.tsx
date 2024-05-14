import { useEffect, useState } from "react";
import Searchbar from "./Searchbar";

const Header:React.FC = () => {

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => setOffset(window.scrollY);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return(
        <div className={`sticky transition-all z-50 duration-500 ease-in-out ${offset === 0 ? "bg-gradient-to-b from-[rgba(0,0,0,.75)] to-transparent" : "bg-[color:var(--primary)]"} top-0 flex p-3 w-full gap-3 justify-between font-bold`}>
            <div className="flex items-center h-10 text-[color:var(--text)]">Unite</div>
            <Searchbar/>
            <div className="flex gap-2 items-center">
                <span className="h-[38px] text-[color:var(--text)] opacity-75 text-center  text-sm hover:bg-white hover:bg-opacity-15 flex items-center px-4 rounded-full uppercase">Sign in</span>
                <span className="bg-white text-[color:var(--accent)] h-[38px] flex items-center text-center text-sm px-4 rounded-full uppercase">Sign up</span>
            </div>
        </div>
    )
}

export default Header;