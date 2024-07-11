import { createContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { assignUser, removeUser, updateUser as patchUser } from "../store/userSlice";
import jwtDecode from "../utils/jwtDecode";
import userAPI from "../http/userAPI";

type ContextData = {
    user:any,
    accessToken:string  | null,
    setAccessToken: any,
    loginUser: (token:string) => void,
    logoutUser: () => void,
    updateUser: (params:any) => void,
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
        setAccessToken(token)
    }

    const checkToken = () => {
        const token = localStorage.getItem('accessToken')
        if(!token) {
            setAccessToken('');
        }
    }

    const logoutUser = () => {
        //@ts-ignore
        dispatch(removeUser());
        localStorage.removeItem(locStorageName);
    }

    const updateUser = async(params:any) => {
        const result = await userAPI.updateUser({...params, id:user.id});
        if(result) {dispatch(patchUser(params))}
    }

    let contextData: ContextData = {
        user,
        accessToken,
        setAccessToken,
        loginUser,
        logoutUser,
        updateUser
    }

    useEffect(() => {
        checkToken()
        const checkUser = async() => {
            if (!accessToken) return;
            console.log("here")
            const result = await userAPI.checkAuth();
            if(result) {
                loginUser(result)
            } else {
                logoutUser()
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