import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "../../utils/router";
import { useState } from "react";

type props = {
    render: (href:string) => React.ReactElement
}

const WithAuthReq = (props:props) => {
    const {logoutUser, user} = useContext(AuthContext);
    const {routes} = useNavigate()
    const [path, setPath] = useState('')
    
    useEffect(()=> {
        if(!user.login) {
            logoutUser();
            setPath(routes.signIn());
        } else {
            setPath('')
        }
    },[])

    return (
        props.render(path)
    )
}

export default WithAuthReq;