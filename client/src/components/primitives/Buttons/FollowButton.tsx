import { useContext, useEffect, useState } from "react";
import Button from "../Button";
import WithAuthReq from "../withAuthReq";
import AuthContext from "../../../context/AuthContext";
import communityAPI from "../../../http/communityAPI";

const FollowButton = ({params, className}:any) => {

    const {user} = useContext(AuthContext);
    const [isFollow, setIsFollow] = useState(params.followed ? params.followed : false);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if(!user.login) return;
        setIsClicked(true);
        setIsFollow(!isFollow);
    }

    const handleFollow = async() => {
        await communityAPI.setFollow({communityId:params.communityId, deleteFollow:!isFollow})
    }

    useEffect(()=> {
        if(isClicked) {
            const apiCall = setTimeout(()=> {
                handleFollow();
            },1000)
            return () => clearTimeout(apiCall)
        }
        setIsClicked(false);
    },[isFollow])

    return(     
        <WithAuthReq
            render={path => (
                <Button
                    href={path}
                    className={`text-sm bg-accent-500 hover:bg-accent-600 text-white font-bold ${className}`}
                    onClick={handleClick}
                >{isFollow ? "Unfollow":"Follow"}</Button>
            )}
        />
    )
}

export default FollowButton;