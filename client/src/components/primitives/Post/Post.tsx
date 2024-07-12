import Card from "../Card"

export interface PostProps {
    PostHeader?: React.ReactNode,
    PostContent?: React.ReactNode,
    PostActions?: React.ReactNode,
    children?: React.ReactNode
}

const Post:React.FC<PostProps> = ({PostHeader, PostContent, PostActions, children, ...args}) => {
    return(
        <Card
            className="bg-secondary shadow-md flex-col w-full px-4 py-4"
            {...args}
        >
            {PostHeader}
            {PostContent}
            {PostActions}
            {children}
        </Card>
    )
}

export default Post;