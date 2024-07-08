import Flexbox from "../Flexbox"
import Feed from "./Feed"
import CommunityInfo from "./CommunityInfo"
import FeedSort from "../Navigation/FeedSort"
import CreatePostForm from "../Post/CreatePostForm"

type FeedSectionProps = {
    description:string,
    posts: React.ComponentProps<typeof Feed>['posts']
}

const CommunityFeedSection = (props:FeedSectionProps) => {
    return(
        <Section
            navigation = {<FeedSort/>}
            feed = {
                <Feed
                    topComponents={<CreatePostForm
                        communityId={props.communityId}
                    />}
                    posts={props.posts}
                />
            }
            info = {<CommunityInfo
                description={props.description}
            />}
        />
    )
}

type SectionProps = {
    navigation?: React.ReactNode;
    feed?: React.ReactNode;
    info?: React.ReactNode;
}

export const Section = (props:SectionProps) => {
    return(
        <Flexbox padding="md" className="gap-6 mx-auto max-w-container">
                {props.navigation}
            <div className="w-full max-w-[592px]">
                {props.feed}
            </div>
                {props.info}
        </Flexbox>
    )
}

export default CommunityFeedSection;