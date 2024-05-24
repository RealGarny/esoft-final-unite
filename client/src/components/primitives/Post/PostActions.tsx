import Button from "../Button"
import Flexbox from "../Flexbox"

const PostActions = () => {
    return(
        <Flexbox className="justify-center">
            <Button variant="text" rounded="sm" className="w-auto">Like</Button>
            <Button variant="text" rounded="sm" className="w-auto">comment</Button>
            <Button variant="text" rounded="sm" className="w-auto">share</Button>
            <Button variant="text" rounded="sm" className="w-auto">others</Button>
        </Flexbox>
    )
}

export default PostActions