import routes from "../../routes/routes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeUser } from "../../store/userSlice";

const isUserLogged = () => {
    return false;
}

type props = {
    render: (href:string) => React.ReactElement
}

const WithAuthReq = (props:props) => {
    const userLogin = useAppSelector(state => state.user.login);
    const dispatch = useAppDispatch();
    let path = "";
    if(!userLogin) {
        //@ts-ignore
        dispatch(removeUser())
    }
    

    return (
        <>
            {props.render(path)}
        </>
    )
}

export default WithAuthReq;