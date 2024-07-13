import { statusCode } from "../utils/httpStatusCodes";

const uploadFile = (uploadHandler:any) => {
    const upload = uploadHandler;

    return (req:any,res:any,next:any) => {
        upload(req,res, (err:any)=> {
            if(err) {
                console.log(err)
                return res.status(statusCode.badRequest).json({message: "BAD_FILES"})
            } else {
                next();
            }
        })
    }
}

export default uploadFile;