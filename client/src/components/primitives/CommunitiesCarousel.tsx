import Flexbox from "./Flexbox"
import Button from "./Button"
import CommunitiesList from "./CommunitiesList"
import { useNavigate } from "../../utils/router";

const CommunitiesCarousel = () => {

    const {routes} = useNavigate();

    return(
        <Flexbox className="mt-10 flex-col">
            <Flexbox className="justify-between items-center px-2">
                <p className="font-bold uppercase text-white text-2xl">Communities</p>
                <Button href={routes.communities()} className="font-bold opacity-75" variant="text">View All</Button>
            </Flexbox>
            
            <Flexbox className="pl-2 overflow-hidden">
                <CommunitiesList
                    limit={4}
                />
            </Flexbox>
        </Flexbox>
    )
}

export default CommunitiesCarousel;