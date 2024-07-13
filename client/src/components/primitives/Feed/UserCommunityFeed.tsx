import { useEffect, useState } from "react"
import CommunitiesList from "../CommunitiesList"
import Flexbox from "../Flexbox"
import { useLocation, useOutletContext } from "react-router-dom"

const UserCommunityFeed = () => {
    const location = useLocation();
    const [userLogin, setUserLogin] = useState()
    const {user} = useOutletContext();
    useEffect(()=> {
        const pathArr:string[] = location.pathname.split("/");
        let index = 0;
        for(let i = 0; i < pathArr.length; i++) {
            if(pathArr[i] === "user") {
                index = i+1;
            }
        }
        console.log(user)
        setUserLogin(pathArr[index])
    })

    return(
        <Flexbox className="flex-col">
            <CommunitiesList
                params={{creator:user.id}}
            />
        </Flexbox>
    )
}

export default UserCommunityFeed;