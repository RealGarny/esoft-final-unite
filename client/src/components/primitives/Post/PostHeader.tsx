import { CornerDownRight } from "lucide-react";
import { useLocation, useNavigate } from "../../../utils/router";
import Flexbox from "../Flexbox"
import Hyperlink from "../Hyperlink";
import Logo from "../Logo"

export interface PostHeaderProps {
    authorLogo?: string,
    authorLogin: string,
    author: string,
    createdAt: string,
    communityName: string,
    communityId: string,
    communityLogo: string,
}

const PostHeader:React.FC<PostHeaderProps> = (props) => {
    
    const checkAuthorLogo = props.authorLogo && typeof props.authorLogo === "string" && props.authorLogo.length > 0
    const location = useLocation();
    const {routes} = useNavigate();
    let postTime;

    if(props.createdAt) {
        const timeDif = Date.now() - new Date(props.createdAt);
        const Min = Math.floor(timeDif / 1000 / 60);
        const Hour = Math.floor(Min / 60);
        const Day = Math.floor(Hour / 24);

        if(Min < 60000) {
            postTime = `now`;
        }
        if(Min < 60) {
            postTime = `${Min}min`;
        }
        else if(Hour < 24) {
            postTime = `${Hour}h`;
        }
        else if(Day < 7) {
            postTime = `${Day}d`;
        }
        else {
            postTime = new Date(props.createdAt).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric' });
        }
    }

    return(
        <Flexbox>
            {checkAuthorLogo &&
                <div className="relative size-12 mr-2">
                    <Logo 
                        alt="authorLogo"
                        src={props.authorLogo!}
                        href={routes.user(props.authorLogin)}
                    />
                    {props.communityLogo &&
                    <Logo
                        alt="communityLogo"
                        rounded="sm"
                        size="sm"
                        src={props.communityLogo}
                        className="absolute -bottom-2 border-2 border-secondary -right-3"
                        href={routes.community(props.communityName)}
                    />
                    }
                </div>
            }
            <div>
                <Flexbox className="items-center">
                    <Hyperlink to={routes.user(props.authorLogin)}>
                        <p className="font-bold text-ellipsis">{props.author}</p>
                    </Hyperlink>
                    {postTime &&
                    <Flexbox className="items-center opacity-25 gap">
                        <p>•</p>
                        <p className="font-bold">{postTime}</p>
                    </Flexbox>
                    }
                </Flexbox>
                <Flexbox className="items-center">
                    { props.communityName &&
                      location.pathname.split("/")[location.pathname.split("/").length - 1] !== props.communityName &&
                        <Flexbox className="text-sm">
                            <CornerDownRight className="h-4"/>
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