import { createContext, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    addPost,
    assignCommunity,
    assignPosts,
    CommunityState,
    removeCommunity as remCommunity
} from "../store/communitySlice";
import communityAPI from "../http/communityAPI";

type CommunityContextType = {
    removeCommunity: () => void,
    getCommunity: (params:any) => void,
    getPosts: (params:any) => void,
    createPost: (userId: number, content:string) => void
    community: CommunityState['community'],
    posts: CommunityState['posts'],
}

const CommunityContext = createContext({});

export const CommunityProvider = (props:any) => {
    const dispatch = useAppDispatch();
    const {community, posts} = useAppSelector(state => state.community)
    console.log(community)
    const removeCommunity = () => {
        dispatch(remCommunity());
    }

    const getCommunity = async(params:any) => {
        const result = await communityAPI.getCommunities(params ? params : {});
        if(result) {dispatch(assignCommunity(result))}
    }

    const getPosts = async(params:any) =>{
        const result = await communityAPI.getPosts(params ? params : {});
        if(result) {dispatch(assignPosts(result))}
    }

    const createPost:CommunityContextType["createPost"] = async(authorId, content) => {
        if(!authorId || !content) return;
        console.log(authorId, community.id, content)
        const createdPost = await communityAPI.createPost({
            authorId: authorId,
            communityId: community.id,
            content:content
        })
        console.log(createdPost)
        if(createdPost) {
            dispatch(addPost(createdPost));
        }
    }

    const data = {
        removeCommunity,
        getCommunity,
        createPost,
        getPosts,
        community,
        posts,
    }

    useEffect(()=> {
        const pathArr:string[] = location.pathname.split("/");
        getCommunity({name:pathArr[pathArr.length-1]});
    })

    return(
        <CommunityContext.Provider value={data}>
            {props.children}
        </CommunityContext.Provider>
    )
}

const useCommunity = () => useContext(CommunityContext) as CommunityContextType;
export default useCommunity;