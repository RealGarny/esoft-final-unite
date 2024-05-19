import Flexbox from "../Flexbox"
import Feed from "./Feed"
import Navigation from "../Navigation/Navigation"
import CommunityInfo from "./CommunityInfo"
import FeedSort from "../Navigation/FeedSort"

const FeedSection = () => {
    return(
        <Flexbox className="gap-6 justify-center">
            <Navigation
                sort={<FeedSort/>}
            />
            <Feed/>
            <CommunityInfo/>
        </Flexbox>
    )
}

export default FeedSection;