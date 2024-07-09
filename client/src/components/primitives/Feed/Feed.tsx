import Flexbox from "../Flexbox";
import Post from "../Post/Post";
import PostActions from "../Post/PostActions";
import PostContent, {PostContentProps} from "../Post/PostContent";
import PostHeader, {PostHeaderProps} from "../Post/PostHeader";
import PostsList from "../PostsList";
type PostContent = PostHeaderProps & PostContentProps;
type FeedProps = {
    topComponents?: React.ReactNode,
    params: any
}

const Feed = ({topComponents, params}:FeedProps) => {
    if(!params) params = {limit:15}
    return(
        <Flexbox className="flex-col">
            {topComponents && topComponents}
            <PostsList
                params={params}
                render={(post) => (
                    <Post
                        key={post.author}
                        PostHeader={<PostHeader
                            authorLogo={post.authorLogo}
                            author={post.author}
                            authorId={post.authorId}
                            createdAt={post.createdAt}
                            communityLogo={post.communityLogo}
                            communityId = {post.communityId}
                            communityName={post.communityName}
                        />}
                        PostContent={<PostContent
                            text={post.content}
                        />}
                        PostActions={<PostActions/>}
                    />
                )}
            />
        </Flexbox>
    )
}

export default Feed;