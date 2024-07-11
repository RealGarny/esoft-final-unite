import { useEffect } from "react"
import communityAPI from "../../http/communityAPI"
import Text from "./Text"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { assignPosts } from "../../store/postsSlice"
import { useLocation, useNavigate } from "../../utils/router"

type PostListProps = {
    params: {
        limit:number,
    },
    render: (args:any) => React.ReactElement
}

const defaultFeedParameters = {
    limit:15,
}

const PostsList:React.FC<PostListProps> = ({params=defaultFeedParameters, render}) => {

    const {posts} = useAppSelector(state => state.posts)
    const dispatch = useAppDispatch();
    const {routes} = useNavigate();
    const location = useLocation();

    useEffect(()=> {
        const getPosts = async() =>{
            let result;
            const communityName = location.pathname.split('/')[location.pathname.split('/').length-1];
            if(communityName && location.pathname === routes.community(communityName)) {
                result = await communityAPI.getPosts({...params, communityName});
            } else {
                result = await communityAPI.getPosts({...params, type:"full"});
            }
            if(result) {
                dispatch(assignPosts(result))
            }
        }
        getPosts()
    }, [])

    if(!Array.isArray(posts) || posts.length < 1) return (<Text className="text-center font-bold text-2xl">No posts availible</Text>);
        
    const components = [];

    for(let i = 0; i < posts.length; i++) {
        components.push(
            render(posts[i])
        )
    }

    return(components)
}

export default PostsList;