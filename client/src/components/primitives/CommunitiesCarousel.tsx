import Flexbox from "./Flexbox"
import CommunityCard from "./CommunityCard"
import Button from "./Button"
import routes from "../../routes/routes"

const CommunitiesCarousel = () => {
    return(
        <Flexbox className="mt-10 flex-col">
            <Flexbox className="justify-between items-center px-2">
                <p className="font-bold uppercase text-white text-2xl">Communities</p>
                <Button href={routes.communities} className="font-bold opacity-75" variant="text">View All</Button>
            </Flexbox>
            <Flexbox className="pl-2 overflow-hidden">
                <CommunityCard />
                <CommunityCard />
                <CommunityCard />
                <CommunityCard />
            </Flexbox>
        </Flexbox>
    )
}

export default CommunitiesCarousel;