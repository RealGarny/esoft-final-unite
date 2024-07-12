import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import PostsFeed from "./PostsFeed";

const UserPostsFeed = () => {
    const {user} = useContext(AuthContext);
    return(
        <PostsFeed
            params={{authorId:user.id}}
        />
    )
}

export default UserPostsFeed;