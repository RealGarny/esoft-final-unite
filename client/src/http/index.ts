import axios, {AxiosRequestConfig} from "axios";

const $host = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
export const $tokenHost = $host;

const authInterceptor = (config: AxiosRequestConfig) => {
    if(!config.headers){
        return undefined
    } else {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config
    };
}

$tokenHost.interceptors.request.use(authInterceptor)

export default $host
