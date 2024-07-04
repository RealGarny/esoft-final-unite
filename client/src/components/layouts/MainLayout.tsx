import { Outlet } from "react-router-dom"
import Header from "../primitives/Header"

const MainLayout = () => {
    return(
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default MainLayout;