import routes from "../../../routes/routes";
import { useLocation } from "../../../utils/router";
import Flexbox from "../Flexbox"
import Hyperlink from "../Hyperlink";
import Logo from "../Logo"

export interface PostHeaderProps {
    authorLogo?: string,
    authorId: string,
    author: string,
    createdAt: string,
    communityName: string,
    communityId: string,
    communityLogo: string,
}

const PostHeader:React.FC<PostHeaderProps> = (props) => {
    
    const checkAuthorLogo = props.authorLogo && typeof props.authorLogo === "string" && props.authorLogo.length > 0
    const location = useLocation();
    return(
        <Flexbox>
            {checkAuthorLogo &&
                <div className="relative size-12 mr-2">
                    <Logo 
                        alt="authorLogo"
                        src={props.authorLogo!}
                        href={routes.user(props.authorId)}
                    />
                    <Logo
                        alt="communityLogo"
                        rounded="sm"
                        size="sm"
                        src={props.communityLogo}
                        className="absolute -bottom-2 border-2 border-secondary -right-3"
                        href={routes.community(props.communityId)}
                    />
                </div>
            }
            <div>
                <Flexbox className="items-center">
                    <p className="font-bold text-ellipsis">{props.author}</p>
                    <Flexbox className="items-center opacity-25 gap">
                        <p>•</p>
                        <p className="font-bold">{props.createdAt}</p>
                    </Flexbox>
                </Flexbox>
                <Flexbox className="items-center">
                    { props.communityName &&
                      location.pathname.split("/")[location.pathname.split("/").length - 1] !== props.communityName &&
                        <Flexbox className="text-sm">
                            <p>icon</p>
                            <Hyperlink to={routes.community(props.communityName)}>
                                <p className="font-bold" style={{"color": "#fb6400"}}>{props.communityName}</p>
                            </Hyperlink>
                            {/*
                            <span>/</span>
                            <Hyperlink to={props.communitySublink}>
                                <p className="font-bold">{props.communityCategoryName}</p>
                            </Hyperlink>
                            */}
                        </Flexbox>
                    }
                </Flexbox>
            </div>
        </Flexbox>
    )
}

export default PostHeader;