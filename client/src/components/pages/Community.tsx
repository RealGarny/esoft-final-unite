import Button from "../primitives/Button";
import FadeContainer from "../primitives/FadeContainer";
import Flexbox from "../primitives/Flexbox";
import Text from "../primitives/Text";
import { useLocation } from "../../utils/router";
import NotFound from "./NotFound";
import CrossIcon from "../icons/CrossIcon";
import useCommunity from "../../context/CommunityContext";
import Section from "../primitives/Feed/Section";
import Feed from "../primitives/Feed/Feed";
import CreatePostForm from "../primitives/CreatePostForm";
import CommunityInfo from "../primitives/Feed/CommunityInfo";
import CommunityActionBtn from "../primitives/Buttons/CommunityActionBtn";

const Community = () => {

    const location = useLocation();
    const {community} = useCommunity();
    if(!community.id) {
        return(
            <NotFound
                pageUrl={location.pathname}
            />
        )
    }
    return(
        <>
            <FadeContainer
                fadeColor="from-secondary"
                className="bg-additional h-72 mt-[-64px] flex justify-center items-end"
                fadeSize="h-20"
            >
                <Flexbox className="p-8 w-full h-fit max-w-[1212px] z-10 flex-col gap-3">
                    <Flexbox className="items-end">
                        <Text className="font-bold text-5xl">
                            {community.name}
                        </Text>
                    </Flexbox>
                    <Flexbox className="font-bold items-center">
                        <Text>{community.followCount}</Text>
                        <Text className=" opacity-80">{community.followerNickname}</Text>
                        <CommunityActionBtn
                            params = {{
                                name: community.name,
                                creator: community.creator,
                                communityId: community.id,
                                isFollowed: community.isFollowed
                            }}
                        />
                    </Flexbox>
                </Flexbox>
            </FadeContainer>
            <Section
                feed={<Feed 
                    params={{limit:15}}
                    topComponents={<CreatePostForm/>}/>
                }
                info={<CommunityInfo description={community.description}/>}
            />
            <Button className="fixed right-6 bottom-7 p-7 bg-accent-500 hover:bg-accent-500 shadow-md">
                <CrossIcon className="absolute stroke-white h-7 rotate-45"></CrossIcon>
            </Button>
        </>
    )
}

export default Community;