import Card from "../Card";
import Flexbox from "../Flexbox"
import Hyperlink from "../Hyperlink";
import Logo from "../Logo"

interface PostHeaderProps {
    authorLogoUrl?: string,
    authorName: string,
    date: string,
    communityName: string,
    communityCategoryName: string,
    communityLogoUrl: string,
    communityLink: string,
    communitySublink: string
    communityColor?: string
}

const PostHeader:React.FC<PostHeaderProps> = (props) => {
    
    const checkAuthorLogo = props.authorLogoUrl && typeof props.authorLogoUrl === "string" && props.authorLogoUrl.length > 0

    return(
        <Flexbox>
            {checkAuthorLogo &&
                <div className="relative size-fit pr-2">
                    <Logo alt="authorLogo" src={props.authorLogoUrl!}/>
                    <Logo
                        alt="communityLogo"
                        rounded="sm"
                        size="sm"
                        src={props.communityLogoUrl}
                        className="absolute -bottom-2 border-2 border-secondary -right-3"
                    />
                </div>
            }
            <div>
                <Flexbox className="items-center">
                    <p className="font-bold text-ellipsis">{props.authorName}</p>
                    <Flexbox className="items-center opacity-25">
                        <Card rounded="full" className="size-2 bg-white"></Card>
                        <p className="font-bold">{props.date}</p>
                    </Flexbox>
                </Flexbox>
                <Flexbox className="items-center opacity-30">
                    { props.communityLink &&
                        <Flexbox>
                            <p>icon</p>
                            <Hyperlink to={props.communityLink}>
                                <p className="font-bold">{props.communityName}</p>
                            </Hyperlink>
                            <span>/</span>
                            <Hyperlink to={props.communitySublink}>
                                <p className="font-bold">{props.communityCategoryName}</p>
                            </Hyperlink>
                        </Flexbox>
                    }
                </Flexbox>
            </div>
        </Flexbox>
    )
}

export default PostHeader;