import { useNavigate as useNav,
    ScrollRestoration as ScrollRestore,
    useLocation as useLoc,
    NavLink as Nav,
    useSearchParams as useSearchPar,
    useParams as usePar,
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

export const useSearchParams = () => {
    return useSearchPar();
}

export const useParams = () => {
    return usePar();
}

export const NavLink:React.FC<ComponentProps<typeof Nav>> = (props) => {
    return <Nav
        {...props}
        />
}


export const ScrollRestoration = () => {
    return <ScrollRestore/>
}