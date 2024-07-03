import Flexbox from "../Flexbox"
import Feed from "./Feed"
import Navigation from "../Navigation/Navigation"
import CommunityInfo from "./CommunityInfo"
import FeedSort from "../Navigation/FeedSort"

const FeedSection = () => {
    return(
        <Flexbox padding="md" className="gap-6 max-w-container w-fit mx-auto">
            <Navigation
                sort={<FeedSort/>}
            />
            <div className="w-full max-w-[592px]">
                <Feed/>
            </div>
            <CommunityInfo
            />
        </Flexbox>
    )
}

export default FeedSection;