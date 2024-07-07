import { useNavigate as useNav,
    ScrollRestoration as ScrollRestore,
    useLocation as useLoc
} from "react-router-dom"

export const useNavigate = () => {
    return useNav()
}

export const useLocation = () => {
    return useLoc()
}

export const ScrollRestoration = () => {
    return <ScrollRestore/>
}