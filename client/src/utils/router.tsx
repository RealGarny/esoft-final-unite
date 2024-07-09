import { useNavigate as useNav,
    ScrollRestoration as ScrollRestore,
    useLocation as useLoc
} from "react-router-dom"
import routes from "../routes/routes"

export const useNavigate = () => {
    
    return {
        routes,
        navigate: useNav()
    }
}

export const useLocation = () => {
    return useLoc()
}

export const ScrollRestoration = () => {
    return <ScrollRestore/>
}