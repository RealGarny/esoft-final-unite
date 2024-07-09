import { useEffect } from "react"
import communityAPI from "../../http/communityAPI"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { assignPosts } from "../../store/communitySlice"
import Text from "./Text"

type PostListProps = {
    params: {
        limit:number,
    },
    render: (args:any) => React.ReactElement
}

const PostsList:React.FC<PostListProps> = ({params, render}) => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.community.posts)

    useEffect(()=> {
        const getPosts = async() =>{
            const result = await communityAPI.getPosts(params ? params : {});
            if(result) {dispatch(assignPosts(result))}
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