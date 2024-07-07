import { createContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { assignUser, removeUser } from "../store/userSlice";
import jwtDecode from "../utils/jwtDecode";
import userAPI from "../http/userAPI";

type ContextData = {
    user:any,
    accessToken:string  | null,
    setAccessToken: any,
    loginUser: (token:string) => void,
    logoutUser: () => void 
}
const AuthContext = createContext<ContextData | null>(null);

export default AuthContext;

type AuthProviderProps = {
    children: React.ReactNode,
} 

export const AuthProvider = ({children}:AuthProviderProps) => {
    const [accessToken, setAccessToken] = useState<string|null>(()=>localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '')
    const user = useAppSelector(state => state.user)
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();
    const locStorageName = "accessToken"

    const loginUser = async(token:string) => {
        localStorage.setItem(locStorageName, token)
        const tokenData = jwtDecode(token)
        dispatch(assignUser(tokenData))
    }

    const checkToken = () => {
        const token = localStorage.getItem('accessToken')
        if(!token) {
            setAccessToken('');
        }
    }

    const logoutUser = () => {
        //@ts-ignore
        useAppDispatch(removeUser());
        localStorage.removeItem(locStorageName);
    }

    let contextData: ContextData = {
        user,
        accessToken,
        setAccessToken,
        loginUser,
        logoutUser
    }

    useEffect(() => {
        checkToken()
        const checkUser = async() => {
            if (accessToken) return loginUser(accessToken);

            const result = await userAPI.checkAuth();
            if(!result) {
                logoutUser;
            } else {
                setAccessToken(() => (result))
                loginUser(result)
            }
        }
        checkUser();
        setIsLoading(false)
    }, [])

    return(
        <AuthContext.Provider value={contextData}>
            {isLoading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    )
}