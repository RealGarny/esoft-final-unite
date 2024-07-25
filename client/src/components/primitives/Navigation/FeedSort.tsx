import SparklesIcon from "../../icons/SparklesIcon";
import Button from "../Button"
import Flexbox from "../Flexbox";
import FlameIcon from "../../icons/FlameIcon";
import TrophyIcon from "../../icons/TrophyIcon";
import { useSearchParams } from "../../../utils/router";

type SortType = {
    title: string,
    icon: React.ReactNode,
    path?:string
}

const sortTypes:SortType[] = [
    {
        title: "Trending",
        icon: <FlameIcon className="fill-accent-500 stroke-none size-6"/>
    },
    {
        title: "Top",
        path: "top",
        icon: <SparklesIcon className="fill-accent-500 size-6"/>
    },
    {
        title: "New",
        path: "new",
        icon: <TrophyIcon className="fill-accent-500 size-6"/>
    }
]

const FeedSort = () => {

    const [params, setParams] = useSearchParams();

    const handleSearchParams = (sortType:SortType) => {
        setParams((prev) => {
            if(sortType.path) {
                return {...prev, postsFilter: sortType.path}
            }
            params.delete("postsFilter")
            return(prev)
        })
    }

    return(
        <Flexbox padding="none" className="flex-col flex-1 max-w-52">
            {sortTypes.map((type)=>{
                return(
                    <Button
                        key={type.title}
                        onClick={()=>handleSearchParams(type)}
                        rounded="sm"
                        className="text-sm justify-start pl-2 font-bold w-full text-white bg-white bg-opacity-10 hover:bg-primary"
                    >{type.icon}{type.title}</Button>
                )
            })}
        </Flexbox>
    )
}

export default FeedSort;