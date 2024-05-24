import Card from "../Card"

export interface PostProps {
    PostHeader?: React.ReactNode,
    PostContent?: React.ReactNode,
    PostActions?: React.ReactNode,
    children?: React.ReactNode
}

const Post:React.FC<PostProps> = ({PostHeader, PostContent, PostActions, children}) => {
    return(
        <Card
            className="border-2 border-primary bg-secondary shadow-md flex-col w-full px-4 py-4"
        >
            {PostHeader}
            {PostContent}
            {PostActions}
            {children}
        </Card>
    )
}

export default Post;