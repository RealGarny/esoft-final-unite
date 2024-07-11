import { useNavigate as useNav,
    ScrollRestoration as ScrollRestore,
    useLocation as useLoc,
    NavLink as Nav
} from "react-router-dom"
import routes from "../routes/routes"
import { ComponentProps } from "react"

export const useNavigate = () => {
    
    return {
        routes,
        navigate: useNav()
    }
}

export const useLocation = () => {
    return useLoc()
}

export const NavLink:React.FC<ComponentProps<typeof Nav>> = (props) => {
    return <Nav
        {...props}
        />
}


export const ScrollRestoration = () => {
    return <ScrollRestore/>
}