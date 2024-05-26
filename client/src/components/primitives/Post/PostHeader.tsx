import routes from "../../../routes/routes";
import Flexbox from "../Flexbox"
import Hyperlink from "../Hyperlink";
import Logo from "../Logo"

interface PostHeaderProps {
    authorLogoUrl?: string,
    authorId: string,
    authorName: string,
    date: string,
    communityName: string,
    communityId: string,
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
                <div className="relative size-12 mr-2">
                    <Logo 
                        alt="authorLogo"
                        src={props.authorLogoUrl!}
                        href={routes.user(props.authorId)}
                    />
                    <Logo
                        alt="communityLogo"
                        rounded="sm"
                        size="sm"
                        src={props.communityLogoUrl}
                        className="absolute -bottom-2 border-2 border-secondary -right-3"
                        href={routes.community(props.communityId)}
                    />
                </div>
            }
            <div>
                <Flexbox className="items-center">
                    <p className="font-bold text-ellipsis">{props.authorName}</p>
                    <Flexbox className="items-center opacity-25 gap">
                        <p>•</p>
                        <p className="font-bold">{props.date}</p>
                    </Flexbox>
                </Flexbox>
                <Flexbox className="items-center">
                    { props.communityLink &&
                        <Flexbox className="text-sm">
                            <p>icon</p>
                            <Hyperlink to={props.communityLink}>
                                <p className="font-bold" style={{"color": "#fb6400"}}>{props.communityName}</p>
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