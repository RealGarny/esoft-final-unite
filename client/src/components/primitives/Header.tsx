import { useEffect, useState } from "react";

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
        <div className={`sticky transition-all ease-in-out ${offset === 0 ? "bg-gradient-to-b from-[rgba(0,0,0,.75)] to-transparent" : "bg-blue-600"} top-0 flex p-3 w-full gap-3 justify-between font-bold`}>
            <div className="flex items-center h-10">Logo</div>
            <div className="basis-[400px] rounded-md bg-slate-800 bg-opacity-30">
                <form>
                    <input type="text" className=" bg-none w-full h-10 px-10 font-bold text-white" placeholder="Search"></input>
                </form>
            </div>
            <div className="flex gap-2 items-center">
                <span className="h-[38px] text-white opacity-75 text-center  text-sm hover:bg-white hover:bg-opacity-15 flex items-center px-4 rounded-full uppercase">Sign in</span>
                <span className="bg-white text-orange-600 h-[38px] flex items-center text-center text-sm px-4 rounded-full uppercase">Sign up</span>
            </div>
        </div>
    )
}

export default Header;