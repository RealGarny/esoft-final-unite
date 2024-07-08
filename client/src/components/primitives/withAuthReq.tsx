import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

type props = {
    render: (href:string) => React.ReactElement
}

const WithAuthReq = (props:props) => {
    const {logoutUser, user} = useContext(AuthContext);
    let path = "";
    if(!user.login) {
        logoutUser();
        path = "/sign-in"
    }
    

    return (
        props.render(path)
    )
}

export default WithAuthReq;