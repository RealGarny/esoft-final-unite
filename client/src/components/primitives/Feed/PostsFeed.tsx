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

const PostsFeed = ({topComponents, params}:FeedProps) => {
    return(
        <Flexbox className="flex-col">
            {topComponents && topComponents}
            <PostsList
                params={params}
                render={(post) => (
                    <Post
                        key={post.author}
                        PostHeader={
                            <PostHeader
                                authorLogo={post.userIcon}
                                author={post.displayedName}
                                authorLogin={post.login}
                                createdAt={post.createdAt}
                                communityLogo={post.communityLogo}
                                communityName={post.communityName}
                            />
                        }
                        PostContent={<PostContent
                            text={post.content}
                        />}
                        //PostActions={<PostActions/>}
                    />
                )}
            />
        </Flexbox>
    )
}

export default PostsFeed;