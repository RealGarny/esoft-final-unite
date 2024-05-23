import Card from "../Card";
import Flexbox from "../Flexbox"
import UserLogo from "../User/UserLogo"

const PostHeader = () => {
    
    return(
    <Flexbox>
        <UserLogo src="https://media.cdn.community.lambdageneration.com/avatars/1694882926817D8CbBPDqgtBDB7CC.png?size=mega"/>
        <Flexbox padding="none" className="flex-col">
            <Flexbox padding="none" className="items-center">
                <p className="font-bold">Garny</p>
                <Flexbox padding="none" className="items-center opacity-30">
                    <Card padding="none" rounded="full" className="size-2 bg-white"></Card>
                    <p className="font-bold">2h</p>
                </Flexbox>
            </Flexbox>
        </Flexbox>
    </Flexbox>
    )
}

export default PostHeader;