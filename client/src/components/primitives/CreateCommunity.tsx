import Dialog from "./Dialog"
import Form, {FormConfig} from "./Form/Form";
import Button from "./Button";
import { useState } from "react";
import communityAPI from "../../http/communityAPI";
import WithAuthReq from "./withAuthReq";
import { useNavigate } from "../../utils/router";

const CreateCommunity = () => {
    const [isError, setIsError] = useState(false);
    const [formMessage, setFormMessage] = useState("");
    const [isModal, setIsModal] = useState(false);
    const {navigate, routes} = useNavigate();

    const config:FormConfig = {
        onSubmit: async(e, {values, errors}) => {
            e.preventDefault();
            let error;
            setIsError(()=>{
                error = false;
                return error;
            })
            for(let key in errors) {
                if(errors[key]) {
                    setIsError(()=>{
                        error = true;
                        return error;
                    });
                    break;
                }
            }
            if(isError) {
                return
            }

            try{
                let communityRoute = await communityAPI.createCommunity(values);
                navigate(routes.community(communityRoute))
            } catch(e) {
                setFormMessage(e);
            }
        },
        inputs: [
            {
                label: "Community Name",
                name: "name",
                isError: (values) => values.name.length < 3 || values.name.length > 20,
                errorMessage: "must be between 3 and 20 characters long and cannot have white spaces"
            },
            {
                label: "description",
                type: "textarea",
                name: "description",
                isError: (values) => values.description.length >= 200,
                errorMessage: "cannot be more than 200 characters long"
            },
            {
                label: "follower nickname",
                name: "followerNickname",
                isError: (values) => (values.followerNickname.length < 3 || values.followerNickname.length > 20) && values.followerNickname !== "",
                errorMessage: "must be between 3 and 20 characters long"
            }
        ]
    }

    return(
        <>
            <WithAuthReq
                render={(path) => (
                    <Button href={path} onClick={()=>setIsModal(true)} className="font-bold">Create a new Community!</Button>
                )}
            />
            <Dialog
                isOpen={isModal}
                onClose={()=>setIsModal(false)}
            >
                {<Button onClick={()=>setIsModal(false)}>close</Button>}
                {isError && <p>{formMessage}</p>}
                <Form
                    config={config}
                    formAction={(params)=><Button onClick={params.onClick}>create community</Button>}
                />
            </Dialog>
        </>
    )
}

export default CreateCommunity;