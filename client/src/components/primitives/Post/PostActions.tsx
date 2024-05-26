import AuthReqButton from "../AuthReqButton"
import Button from "../Button"
import Flexbox from "../Flexbox"

const PostActions = () => {
    return(
        <Flexbox className="justify-center">
            <AuthReqButton variant="text" rounded="sm" className="w-auto">Like</AuthReqButton>
            <Button variant="text" rounded="sm" className="w-auto">comment</Button>
            <Button variant="text" rounded="sm" className="w-auto">share</Button>
            <Button variant="text" rounded="sm" className="w-auto">others</Button>
        </Flexbox>
    )
}

export default PostActions