import Flexbox from "../Flexbox"
import Text from "../Text"
import Form from "../Form/Form"
import Button from "../Button"
import WithAuthReq from "../withAuthReq"
import communityAPI from "../../../http/communityAPI"
import { useContext } from "react"
import AuthContext from "../../../context/AuthContext"

const PostFormButton = (props:any) => {
    return(
        <WithAuthReq render={(path) => (
            <Button href={path} onClick={props.onClick} className="font-bold self-end" rounded={"md"}>Post</Button>
        )}/>
    )
}

const CreatePostForm = (props) => {
    const {user} = useContext(AuthContext);

    const formConfig:React.ComponentProps<typeof Form>['config'] = {
        onSubmit: async(e, {values, errors}) => {
            e.preventDefault();
            const createdPost = await communityAPI.createPost({
                authorId: user.id,
                communityId: props.communityId,
                content:values.postText
            })

            console.log(createdPost)
        },
        inputs: [
            {
                name: "postText",
                type: "textarea",
                isError:(value) => value.postText.length >= 500,
                errorMessage: "post cannot be more than 500 characters long."
            }
        ]
    }

    return(
        <Flexbox className="flex-col">
            <Text className="font-bold opacity-80">Create Post</Text>
            <Form
                config={formConfig}
                formAction={(params) => (<PostFormButton onClick={params.onClick}/>)}
            />
        </Flexbox>
    )
}

export default CreatePostForm;