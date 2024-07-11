import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Feed from "./Feed";

const UserPostsFeed = () => {
    const {user} = useContext(AuthContext);
    return(
        <Feed
            params={{authorId:user.id}}
        />
    )
}

export default UserPostsFeed;