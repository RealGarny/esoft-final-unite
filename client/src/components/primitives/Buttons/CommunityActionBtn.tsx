import { useContext } from "react";
import { useNavigate } from "../../../utils/router";
import WithAuthReq from "../withAuthReq";
import Button from "../Button";
import FollowButton from "./FollowButton";
import AuthContext from "../../../context/AuthContext";

export const CommunityActionBtn = ({params, className}:any) => {
    const {user} = useContext(AuthContext);
    const {routes} = useNavigate();
    if(!params) {return<div>invalid params</div>}
    return(
        <WithAuthReq
            render={(path) => (
                params.creator === user.id ?
                <Button
                    href={path ? path : `${routes.community(params.name)}/settings`}
                    className={`text-sm bg-accent-500 hover:bg-accent-600 text-white font-bold ${className}`}
                >Edit</Button>
                :
                <FollowButton
                    params = {{isFollowed:params.isFollowed, communityId:params.communityId}}
                    className={className}
                />
            )}
        />
    )
}

export default CommunityActionBtn;