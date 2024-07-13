/*required data*/
/*{
    images: imageUrl[], //hopefully wil be created in the future    //08.07.2024 - still haven't done it
    text: string
}*/

export interface PostContentProps {
    text: string
}

const PostContent:React.FC<PostContentProps> = ({text}) => {

    return(
        <p className="break-words whitespace-pre-line">{text}</p>
    )
}

export default PostContent;