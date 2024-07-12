import { createContext, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    assignCommunity,
    CommunityState,
    removeCommunity as remCommunity,
    updateCommunity as patchCommunity
} from "../store/communitySlice";
import communityAPI from "../http/communityAPI";
import { addPost } from "../store/postsSlice";

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
    const community = useAppSelector(state => state.community)
    const posts = useAppSelector(state => state.posts)

    const removeCommunity = () => {
        dispatch(remCommunity());
    }

    const getCommunity = async(params:any) => {
        const result = await communityAPI.getCommunities(params ? params : {});
        if(result) {dispatch(assignCommunity(result))}
    }

    const updateCommunity = async(params:any) => {
        params.append('id', community.id)
        const result = await communityAPI.updateCommunity(params);
        if(result) {dispatch(patchCommunity(params))}
    }

    /*
    const getPosts = async(params:any) =>{
        const result = await communityAPI.getPosts(params ? params : {});
        if(result) {dispatch(assignPosts(result))}
    }*/ 

    const createPost:CommunityContextType["createPost"] = async(authorId, content) => {
        if(!authorId || !content) return;
        const createdPost = await communityAPI.createPost({
            authorId: authorId,
            communityId: community.id,
            content:content
        })
        if(createdPost) {
            dispatch(addPost(createdPost))
        }
    }

    const data = {
        removeCommunity,
        getCommunity,
        createPost,
        updateCommunity,
        //getPosts,
        community,
        posts,
    }

    useEffect(()=> {
        const pathArr:string[] = location.pathname.split("/");
        let index;
        for(let i = 0; i < pathArr.length; i++) {
            if(pathArr[i] === "communities") {
                index = i+1;
            }
        }
        getCommunity({name:pathArr[index]});
    }, [])

    return(
        <CommunityContext.Provider value={data}>
            {props.children}
        </CommunityContext.Provider>
    )
}

const useCommunity = () => useContext(CommunityContext) as CommunityContextType;
export default useCommunity;