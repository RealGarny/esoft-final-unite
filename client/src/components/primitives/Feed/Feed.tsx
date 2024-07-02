import Flexbox from "../Flexbox";
import Post from "../Post/Post";
import PostActions from "../Post/PostActions";
import PostContent from "../Post/PostContent";
import PostHeader from "../Post/PostHeader";

const Feed = () => {
    return(
        <Flexbox className="flex-col">
            <Post
                PostHeader={<PostHeader
                    authorLogoUrl="https://media.cdn.community.lambdageneration.com/avatars/1691202325152qyDABLBtDPBmCHsn.png?size=large"
                    authorName="Garny"
                    authorId="RealGarny"
                    date="2h"
                    communityLogoUrl="https://media.cdn.community.lambdageneration.com/avatars/16989520711478_DwC_CtCqDfcBMC.png?size=small"
                    communityName="Source"
                    communityId="TheSource"
                    communityLink="http://localhost:5173/communities/source"
                    communityCategoryName="Main"
                    communitySublink="http://localhost:5173/communities/source/main"
                />}
                PostContent={<PostContent
                    text="Nuclear Fusion
                    Circa 202X. On-going timeline during White forest rocket launch
                    (Im back yay)"
                />}
                PostActions={<PostActions/>}
            />
            <Post
                PostHeader={<PostHeader
                    authorLogoUrl="https://media.cdn.community.lambdageneration.com/avatars/1691202325152qyDABLBtDPBmCHsn.png?size=large"
                    authorName="Garny"
                    authorId="RealGarny"
                    date="2h"
                    communityLogoUrl="https://media.cdn.community.lambdageneration.com/avatars/16989520711478_DwC_CtCqDfcBMC.png?size=small"
                    communityName="Source"
                    communityId="TheSource"
                    communityLink="http://localhost:5173/communities/source"
                    communityCategoryName="Main"
                    communitySublink="http://localhost:5173/communities/source/main"
                />}
                PostContent={<PostContent
                    text="Nuclear Fusion
                    Circa 202X. On-going timeline during White forest rocket launch
                    (Im back yay)"
                />}
                PostActions={<PostActions/>}
            />
            <Post
                PostHeader={<PostHeader
                    authorLogoUrl="https://media.cdn.community.lambdageneration.com/avatars/1691202325152qyDABLBtDPBmCHsn.png?size=large"
                    authorName="Garny"
                    authorId="RealGarny"
                    date="2h"
                    communityLogoUrl="https://media.cdn.community.lambdageneration.com/avatars/16989520711478_DwC_CtCqDfcBMC.png?size=small"
                    communityName="Source"
                    communityId="TheSource"
                    communityLink="http://localhost:5173/communities/source"
                    communityCategoryName="Main"
                    communitySublink="http://localhost:5173/communities/source/main"
                />}
                PostContent={<PostContent
                    text="Nuclear Fusion
                    Circa 202X. On-going timeline during White forest rocket launch
                    (Im back yay)"
                />}
                PostActions={<PostActions/>}
            />
            <Post
                PostHeader={<PostHeader
                    authorLogoUrl="https://media.cdn.community.lambdageneration.com/avatars/1719916026765CACxB6CkCTBtDpDz.jpg?size=large"
                    authorName="Garny"
                    authorId="RealGarny"
                    date="2h"
                    communityLogoUrl="https://media.cdn.community.lambdageneration.com/avatars/16989520711478_DwC_CtCqDfcBMC.png?size=small"
                    communityName="Source"
                    communityId="TheSource"
                    communityLink="http://localhost:5173/communities/source"
                    communityCategoryName="Main"
                    communitySublink="http://localhost:5173/communities/source/main"
                />}
                PostContent={<PostContent
                    text="Nuclear Fusion
                    Circa 202X. On-going timeline during White forest rocket launch
                    (Im back yay)"
                />}
                PostActions={<PostActions/>}
            />
        </Flexbox>
    )
}

export default Feed;