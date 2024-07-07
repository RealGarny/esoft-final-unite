import axios, {AxiosError, AxiosResponse} from "axios";
import { useNavigate } from "../utils/router";
import userAPI from "./userAPI";

const $host = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})
export default $host;
export const $tokenHost = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

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
    console.log("good response")
    return response;
};
const tokenResponseInterceptorError = async(error:AxiosError) => {
    switch(error.response?.status) {
        case 401:   
            const response = await userAPI.checkAuth();
            localStorage.setItem('accessToken', response ? response : '') 
    }
}

$tokenHost.interceptors.response.use(tokenResponseInterceptor, tokenResponseInterceptorError)
