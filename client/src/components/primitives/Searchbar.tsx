import { useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import SearchIcon from "../icons/SearchIcon";

const Searchbar = () => {

    const [value, setValue] = useState<string>("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return(
        <div className="basis-[400px]">
            <form className="relative flex rounded-md bg-black bg-opacity-20">
                {/*
                <SearchIcon
                    className="absolute top-3 left-3 w-4 h-4 stroke-white opacity-50 cursor-pointer"
                    onClick={()=>{}}
                />*/}
                <input
                    type="text"
                    className="h-10 px-10 w-full font-bold text-white"
                    value={value}
                    onChange={handleChange}
                    placeholder="Search"></input>
                {value !== "" &&
                <CrossIcon
                    className="absolute top-3 right-3 w-4 h-4 stroke-white opacity-50 cursor-pointer"
                />
                }
            </form>
        </div>
    )
}

export default Searchbar;