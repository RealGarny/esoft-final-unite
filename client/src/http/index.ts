import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

const $host = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
export const $tokenHost = $host;

const authReqInterceptor = (config:AxiosRequestConfig) => {
    if(!config.headers){
        return undefined
    } else {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config
    };
}

const authResInterceptor = (response:AxiosResponse) => {

    return response;
};
const authResInterceptorError = (error:AxiosError) => {

    return Promise.reject(error)
}

$tokenHost.interceptors.request.use(authReqInterceptor)
$tokenHost.interceptors.response.use(authResInterceptor, authResInterceptorError)

export default $host
