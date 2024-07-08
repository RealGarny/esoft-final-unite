class ServiceUtil {
    protected static _checkString(string:string) {
        const isString = !!string && typeof string === "string";
        return isString ? string.trim() : null;
    }
    
    protected static _urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/

    protected static _emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    protected static _checkNumber(number:number) {
        const isNumber = !!number && typeof number === "number";
        return isNumber ? number : null;
    }
}

export default ServiceUtil;