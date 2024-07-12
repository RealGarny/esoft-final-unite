import axios, {AxiosError, AxiosResponse} from "axios";
import userAPI from "./userAPI";

const $host = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
})
export default $host;
export const $tokenHost = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true
});

//request interceptor
$tokenHost.interceptors.request.use((config:any) => {
    if(!config.headers){
        return undefined
    } else {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : ''}`
        return config
    };
})

//response interceptors
const tokenResponseInterceptor = (response:AxiosResponse) => {
    return response;
};
const tokenResponseInterceptorError = async(error:AxiosError) => {

    switch(error.response?.status) {
        case 401:   
            const response = await userAPI.checkAuth();
            if(response) {
                localStorage.setItem('accessToken', response) 
            } else {
                console.log(response)
                localStorage.removeItem('accessToken')
            }
    }
}

$tokenHost.interceptors.response.use(tokenResponseInterceptor, tokenResponseInterceptorError)
