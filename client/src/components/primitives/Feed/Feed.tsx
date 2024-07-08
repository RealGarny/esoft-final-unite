import Flexbox from "../Flexbox";
import Post from "../Post/Post";
import PostActions from "../Post/PostActions";
import PostContent, {PostContentProps} from "../Post/PostContent";
import PostHeader, {PostHeaderProps} from "../Post/PostHeader";
import Text from "../Text";
type PostContent = PostHeaderProps & PostContentProps;
type FeedProps = {
    topComponents?: React.ReactNode,
    posts: PostContent[],
}

const Feed = ({posts, topComponents}:FeedProps) => {
    return(
        <Flexbox className="flex-col">
            {topComponents}
            {!posts || !Array.isArray(posts) || posts.length < 1 ?
                <Text className="text-2xl font-bold text-center">This community has no posts.</Text>
            :
                posts.map((post) => {
                    return(
                        <Post
                            PostHeader={<PostHeader
                                authorLogo={post.authorLogo}
                                author={post.author}
                                authorId={post.authorId}
                                createdAt={post.createdAt}
                                communityLogo={post.communityLogo}
                                communityName="Source"
                                communityId="TheSource"
                            />}
                            PostContent={<PostContent
                                text="Nuclear Fusion
                                Circa 202X. On-going timeline during White forest rocket launch
                                (Im back yay)"
                            />}
                            PostActions={<PostActions/>}
                        />
                    )
            })}
        </Flexbox>
    )
}

export default Feed;