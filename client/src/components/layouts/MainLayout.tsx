import { Outlet } from "react-router-dom"
import Header from "../primitives/Header"
import TokenUtils from "../../utils/tokenUtils"
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { assignUser } from "../../store/userSlice";

const MainLayout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const tokenData = TokenUtils.getTokenData();
        if(tokenData !== '') {
            dispatch(assignUser(tokenData))
        }
    },[])
    return(
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default MainLayout;