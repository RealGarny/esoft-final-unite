import Text from "../primitives/Text";
import FeedSection from "../primitives/Feed/FeedSection";
import { useLocation } from "../../utils/router";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import userAPI from "../../http/userAPI";
import FadeContainer from "../primitives/FadeContainer";
import Flexbox from "../primitives/Flexbox";
import WithAuthReq from "../primitives/withAuthReq";
import Button from "../primitives/Button";

const Userpage = () => {

    type CommunityData = {
        login: string,
        displayedName: string,
        createdAt: string,
    }

    const location = useLocation();
    const [user, setUser] = useState<CommunityData>();
    const [isFound, setIsFound] = useState(false);

    useEffect(()=> {
        const pathArr:string[] = location.pathname.split("/");

        const getCommunities = async() =>{
            const result = await userAPI.getUsers({login:pathArr[pathArr.length-1]});
            if(!result) {
                return;
            }
            setUser(result);
            setIsFound(true);
        }
        getCommunities()
    }, [])
    console.log(isFound)
    if(!isFound || !user) {
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
                <Flexbox className="p-8 w-full h-fit max-w-[832px] z-10 flex-col">
                    <Flexbox className="relative items-center">
                        <Text className="font-bold text-4xl">
                            {user.displayedName}
                        </Text>
                        <WithAuthReq
                            render={(path) => (
                                <Button href={path} className="absolute right-2 text-sm bg-accent-500 hover:bg-accent-600 text-white font-bold">Follow</Button>
                            )}
                        />
                    </Flexbox>
                    <Flexbox className="flex-col font-bold opacity-80">
                        <Text>@{user.login}</Text>
                        <Text className="">A member since {new Date(user.createdAt).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric' })}</Text>
                    </Flexbox>
                </Flexbox>
            </FadeContainer>
            <FeedSection></FeedSection>
        </>
    )
}

export default Userpage;