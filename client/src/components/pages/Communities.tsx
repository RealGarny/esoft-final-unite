import { useState } from "react"
import communityAPI from "../../http/communityAPI"
import routes from "../../routes/routes"
import { useNavigate } from "../../utils/router"
import Button from "../primitives/Button"
import Flexbox from "../primitives/Flexbox"
import Form, { FormConfig } from "../primitives/Form"

const Communities = () => {
    const navigate = useNavigate()
    const [isError, setIsError] = useState(false);
    const [formMessage, setFormError] = useState("");

    const config:FormConfig = {
        onSubmit: async(e, {values, errors}) => {
            e.preventDefault();
            let result = await communityAPI.createCommunity(values);
            if (!result?.error) navigate(routes.community(values.name));
            setFormError(result?.error);
            setIsError(true)
            console.log(result)
        },
        inputs: [
            {
                label: "community name",
                name: "communityName",
                isError: (values) => values.communityName >= 3 && values.communityName <= 20,
                errorMessage: "must be between 3 and 20 characters long"
            },
            {
                label: "description",
                type: "textarea",
                name: "description",
                isError: (values) => values.communityName <= 200,
                errorMessage: "must be between 3 and 20 characters long"
            },
            {
                label: "follower nickname",
                name: "followerNickname",
                isError: (values) => values.communityName >= 3 && values.communityName <= 20,
                errorMessage: "must be between 3 and 20 characters long"
            }
        ]
    }

    return(
        <Flexbox>
            <div>Communities</div>
            {isError && <p>{formMessage}</p>}
            <Form
                config={config}
                formAction={<Button>create community</Button>}
            />
        </Flexbox>
    )
}

export default Communities;