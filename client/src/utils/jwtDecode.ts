import { jwtDecode as jwtDec } from "jwt-decode";

const jwtDecode = (token:string, options: Parameters<typeof jwtDec>[1] = {}) => {
    return jwtDec(token, options);
}

export default jwtDecode;