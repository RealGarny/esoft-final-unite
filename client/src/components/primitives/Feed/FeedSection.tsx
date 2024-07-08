import Flexbox from "../Flexbox"
import Feed from "./Feed"
import Navigation from "../Navigation/Navigation"
import CommunityInfo from "./CommunityInfo"
import FeedSort from "../Navigation/FeedSort"

const FeedSection = () => {
    return(
        <Section
            navigation = {
                <Navigation
                    sort={<FeedSort/>}
                />
            }
            feed = {<Feed/>}
            info = {<CommunityInfo/>}
        />
    )
}

type FeedSectionProps = {
    navigation?: React.ReactNode;
    feed?: React.ReactNode;
    info?: React.ReactNode;
}

export const Section = (props:FeedSectionProps) => {
    return(
        <Flexbox padding="md" className="gap-6 max-w-container w-fit mx-auto">
                {props.navigation}
            <div className="w-full max-w-[592px]">
                {props.feed}
            </div>
                {props.info}
        </Flexbox>
    )
}

export default FeedSection;