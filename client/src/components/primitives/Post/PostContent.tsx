/*required data*/
/*{
    images: imageUrl[], //hopefully wil be created in the future
    text: string
}*/

interface PostContentProps {
    images?: string[],
    text: string
}

const PostContent:React.FC<PostContentProps> = ({images, text}) => {
    
    if(!text && !images) return;

    return(
        <p className="break-words whitespace-pre-line">{text}</p>
    )
}

export default PostContent;