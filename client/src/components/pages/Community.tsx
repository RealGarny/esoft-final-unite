import WithAuthReq from "../primitives/withAuthReq";
import Button from "../primitives/Button";
import FadeContainer from "../primitives/FadeContainer";
import Flexbox from "../primitives/Flexbox";
import Text from "../primitives/Text";
import CommunityFeedSection from "../primitives/Feed/FeedSection";
import { useLocation } from "../../utils/router";
import { useEffect, useState } from "react";
import communityAPI from "../../http/communityAPI";
import NotFound from "./NotFound";
import { CommunityActionBtn } from "../primitives/CommunityCard";
import CrossIcon from "../icons/CrossIcon";

const Community = () => {

    type CommunityData = {
        name: string,
        followCount: string,
        followerNickname: string,
        creator: number,
        description:string,
    }

    const location = useLocation();
    const [community, setCommunity] = useState<CommunityData>();
    const [isFound, setIsFound] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(()=> {
        const pathArr:string[] = location.pathname.split("/");

        const getCommunities = async() =>{
            const result = await communityAPI.getCommunities({name:pathArr[pathArr.length-1]});
            if(!result) {
                return;
            }
            setCommunity(result);
            setIsFound(true);
        }
        getCommunities()
    }, [])

    if(!isFound || !community) {
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
                className="bg-additional h-72 mt-[-64px] flex justify-center items-end" //TODO: figure out how to save myself from addign mt manually for every header
                fadeSize="h-20"
            >
                <Flexbox className="p-8 w-full h-fit max-w-[1212px] z-10 flex-col">
                    <Flexbox className="items-end">
                        <Text className="font-bold text-5xl">
                            {community.name}
                        </Text>
                    </Flexbox>
                    <Flexbox className="font-bold items-center">
                        <Text>{community.followCount}</Text>
                        <Text className=" opacity-80">{community.followerNickname}</Text>
                        <CommunityActionBtn
                            name={community.name}
                            creator={community.creator}
                        />
                    </Flexbox>
                </Flexbox>
            </FadeContainer>
            <CommunityFeedSection
                posts={posts}
                communityId = {community.id}
                description={community.description && community.description}
            />
            <Button className="fixed right-6 bottom-7 p-7 bg-accent-500 hover:bg-accent-500 shadow-md">
                <CrossIcon className="absolute stroke-white h-7 rotate-45"></CrossIcon>
            </Button>
        </>
    )
}

export default Community;