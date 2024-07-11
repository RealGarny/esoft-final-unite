import Text from "../primitives/Text";
import {Section} from "../primitives/Feed/Section";
import { NavLink, useLocation, useNavigate } from "../../utils/router";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import userAPI from "../../http/userAPI";
import FadeContainer from "../primitives/FadeContainer";
import Flexbox from "../primitives/Flexbox";
import WithAuthReq from "../primitives/withAuthReq";
import Feed from "../primitives/Feed/Feed";
import CommunityActionBtn from "../primitives/Buttons/CommunityActionBtn";
import Button from "../primitives/Button";
import { GitGraph, MessageCircleHeart } from "lucide-react";
import { Outlet } from "react-router-dom";

const Userpage = () => {

    type CommunityData = {
        login: string,
        displayedName: string,
        createdAt: string,
    }

    const location = useLocation();
    const [user, setUser] = useState<CommunityData>();
    const [isFound, setIsFound] = useState(false);
    const {routes} = useNavigate();

    useEffect(()=> {
        const pathArr:string[] = location.pathname.split("/");

        const getCommunities = async() =>{
            let index = 0;
            for(let i = 0; i < pathArr.length; i++) {
                if(pathArr[i] === "user") {
                    index = i+1;
                }
            }
            index = index ? index : location.pathname.split("/").length - 1

            const result = await userAPI.getUsers({login:pathArr[index]});
            if(!result) {
                return;
            }
            setUser(result);
            setIsFound(true);
        }
        getCommunities()
    }, [])
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
                    </Flexbox>
                    <Flexbox className="flex-col font-bold opacity-80">
                        <Text>@{user.login}</Text>
                        <Text className="">A member since {new Date(user.createdAt).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric' })}</Text>
                    </Flexbox>
                </Flexbox>
            </FadeContainer>
            <Section
                navigation={
                    <Flexbox className="flex-col">
                        <NavLink
                            to={routes.user(user.login)}
                            end
                        >
                            {({ isActive, isPending, isTransitioning }) => {console.log(isActive);return(
                                <Button variant={isActive ? "contained" : "outlined"} className="gap-0 w-full text-lg font-bold justify-start" rounded={"sm"}><MessageCircleHeart className="h-5"/>Posts</Button>
                            )}}
                        </NavLink>
                        <NavLink
                            to={routes.userCommunities(user.login)}
                        >
                            {({ isActive, isPending, isTransitioning }) => (
                                <Button variant={isActive ? "contained" : "outlined"} className={`gap-0 w-full text-lg font-bold justify-start`} rounded={"sm"}><GitGraph className="h-4"/>Communities</Button>
                            )}
                        </NavLink>
                    </Flexbox>
                }
                feed={
                    <Outlet/>
                }
            />
        </>
    )
}

export default Userpage;