import PostsFeed from "./PostsFeed";
import { useOutletContext } from "react-router-dom";

const UserPostsFeed = () => {
    const {user} = useOutletContext()
    return(
        <PostsFeed
            params={{authorId:user.id}}
        />
    )
}

export default UserPostsFeed;