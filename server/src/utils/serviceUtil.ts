class ServiceUtil {
    public static checkString(string:string) {
        const isString = !!string && typeof string === "string";
        return isString ? string.trim() : null;
    }
    
    protected static _urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/

    protected static _emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    public static checkNumber(number:number|string) {
        let isNumber = !!number && typeof number === "number";
        if(!isNumber && typeof parseInt(number as string) === 'number') {
            number = parseInt(number as string);
            isNumber = true;
        }

        return isNumber ? number : null;
    }

    public static parseBoolean(string:string) {
        if(typeof string !== 'string') return null;

        switch(string.toLowerCase()) {
            case "true": return true;
            case "false": return false;
            case "": return true;
            default: return null;
        }
    }

    public static paramChecker(checks:any, params:any) {
        let filteredParams:any = {}

        for(let [key, value] of Object.entries(params)) {
            //checks if such key exists in the checks object and passes its conditions
            if(key in checks && checks[key as  keyof typeof checks](value)) {
                filteredParams[key] = checks[key as  keyof typeof checks](value);
            }
        }
        return filteredParams;
    }
}

export default ServiceUtil;