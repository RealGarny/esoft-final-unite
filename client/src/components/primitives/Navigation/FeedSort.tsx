import TrendingIcon from "../../icons/TrendingIcon";
import Button from "../Button"
import Flexbox from "../Flexbox";

const sortTypes = ["Trending", "Top", "New", "Featured"]

const FeedSort = () => {
    return(
        <Flexbox padding="none" className="flex-col w-full">
            {sortTypes.map((type)=>{
                return(
                    <Button
                        startIcon={<TrendingIcon className="fill-accent h-5 w-5"/>}
                        rounded="sm"
                        className="text-sm justify-start pl-1 font-bold w-full bg-white text-white bg-opacity-10 hover:bg-primary"
                    >{type}</Button>
                )
            })}
        </Flexbox>
    )
}

export default FeedSort;