import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const $host = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})
export const $tokenHost = $host;
export default $host

//request interceptor
$tokenHost.interceptors.request.use((config:any) => {
    if(!config.headers){
        return undefined
    } else {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
        return config
    };
})

//response interceptors
const tokenResponseInterceptor = (response:AxiosResponse) => {
    console.log("response")
    return response;
};
const tokenResponseInterceptorError = async(error:AxiosError) => {
    console.log(error)
    if(error.response?.status !== 401) { return Promise.reject(error) }
    console.log("also here")
    try {
        const res = await $host.get("/users/checkAuth", {withCredentials: true})
        console.log(res)
    } catch(e) {
        if(e instanceof AxiosError) {
            "error"
            if(e.response?.status === 401) {
                "unauhtorized"
            }
        }
    }
}

$tokenHost.interceptors.response.use(tokenResponseInterceptor, tokenResponseInterceptorError)
