import userAPI from "../../http/userAPI"
import Button from "../primitives/Button"
import Flexbox from "../primitives/Flexbox"
import Form, { FormConfig } from "../primitives/Form"

const Communities = () => {

    const config:FormConfig = {
        onSubmit: (e, {values, errors}) => {
            userAPI.
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
                name: "communityName",
                isError: (values) => values.communityName <= 200,
                errorMessage: "must be between 3 and 20 characters long"
            },
            {
                label: "follower nickname",
                name: "communityName",
                isError: (values) => values.communityName >= 3 && values.communityName <= 20,
                errorMessage: "must be between 3 and 20 characters long"
            },
            {
                label: "community name",
                name: "communityName",
                isError: (values) => values.communityName >= 3 && values.communityName <= 20,
                errorMessage: "must be between 3 and 20 characters long"
            }
        ]
    }

    return(
        <Flexbox>
            <div>Communities</div>
            <Form
                config={config}
                formAction={<Button>create community</Button>}
            />
        </Flexbox>
    )
}

export default Communities;