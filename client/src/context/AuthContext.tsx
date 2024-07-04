import { createContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { assignUser, removeUser } from "../store/userSlice";
import jwtDecode from "../utils/jwtDecode";

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
    const [loading, isLoading] = useState(true);
    const dispatch = useAppDispatch();

    const loginUser = async(token:string) => {
        localStorage.setItem("accessToken", token)
        const tokenData = jwtDecode(token)
        console.log(tokenData)
        dispatch(assignUser(tokenData))
    }

    const logoutUser = () => {
        //@ts-ignore
        useAppDispatch(removeUser());
        localStorage.removeItem('accessToken');
    }

    let contextData: ContextData = {
        user,
        accessToken,
        setAccessToken,
        loginUser,
        logoutUser
    }

    useEffect(() => {
        if(!accessToken) {
            logoutUser;
        } else {
            loginUser(accessToken);
        }
    }, [])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}