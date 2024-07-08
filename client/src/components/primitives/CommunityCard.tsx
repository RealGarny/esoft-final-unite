import Card from "./Card"
import FadeContainer from "./FadeContainer"
import Flexbox from "./Flexbox"
import routes from "../../routes/routes"
import Hyperlink from "./Hyperlink"
import Logo from "./Logo"
import WithAuthReq from "./withAuthReq"
import Button from "./Button"
import Text from "./Text"
import { useContext } from "react"
import AuthContext from "../../context/AuthContext"

type CommunityCardProps = {
    name:string,
    description:string,
    icon?:string,
    followCount:string,
    followerNickname:string,
    followerIcon?:string,
    bgURL?:string,
    creator?: number
    tags?: string[]
}

const checkParam = (param:any) => {
    return typeof param === "string";
}

const CommunityCard:React.FC<CommunityCardProps> = ({
    name,
    description,
    icon,
    followCount,
    followerNickname,
    followerIcon,
    bgURL,
    creator,
    tags
}) => {
    if(!checkParam(name) || !checkParam(description) || !checkParam(followerNickname)) {
        return <Card className="p-2">Props are invalid</Card>
    }

    return(
        <Card padding="none" className="relative overflow-hidden flex-col gap-0 flex-grow-0 flex-shrink-0 w-auto w-96">
            {<FadeContainer fadeColor="from-primary" fadeSize="h-20" className="h-40 w-full">
                <div className="absolute min-h-full min-w-full bg-cover bg-additional"
                style={{"backgroundImage":`url(${bgURL})`, "backgroundPosition":"50%"}}
                >
                </div>
            </FadeContainer>}
            <Flexbox className="flex-col relative px-5 py-5 gap-4 h-full">
                    {icon && <Logo size="lg" alt="communityLogo" rounded="xl" src={icon ? icon : ""} className="border-black border-4 border-opacity-10 mt-[-70px]"/>}
                <Flexbox className="w-2/3 break-words">
                    <Text className="font-bold text-3xl">
                        {name}
                    </Text>
                    <CommunityActionBtn
                        creator = {creator}
                        name = {name}
                        className="absolute z-[1] right-5 m-auto"
                    />
                </Flexbox>
                <Flexbox padding="none" className="flex-col font-bold w-full text-sm h-36 overflow-hidden">
                    <CommunityTags tags={tags}/>
                    <p className="line-clamp-4 text-ellipsis opacity-60">
                        {description}
                    </p>
                </Flexbox>
                <CommunityFollowers
                    followCount = {followCount}
                    followerIcon = {followerIcon}
                    followerNickname = {followerNickname}
                />
            </Flexbox>
            <Hyperlink to={routes.community(name)} className="absolute top-0 left-0 w-full h-full"/>
        </Card>
    )
}

const CommunityFollowers = (props:any) => {
    if(typeof props.followCount !== "number") return null;
    
    return(
        <Flexbox padding="none" className="font-bold gap-1 text-sm mt-auto">
            {checkParam(props.followerIcon) && <img className="max-h-6 max-w-6" src={props.followerIcon}></img>}
            {<span>{props.followCount}</span>}
            <span className="opacity-60">{props.followerNickname}s</span>
        </Flexbox>
    )
}

export const CommunityActionBtn = (props:any) => {
    const {user} = useContext(AuthContext);

    if(props.creator === user.id) {
        return(
            <Button
                href={`${routes.community(props.name)}/settings`}
                className={`text-sm bg-accent-500 hover:bg-accent-600 text-white font-bold ${props.className}`}
            >Edit</Button>
        )
    }
    return(
        <WithAuthReq render={(path) => (
            <Button href={path} className={`text-sm bg-accent-500 hover:bg-accent-600 text-white font-bold ${props.className}`}>Join</Button>
        )}/>
    )
}

const CommunityTags = (props:any) => {
    if(!props.tags || !Array.isArray(props.tags)) return null
    return(
        props.tags?.map(
            (tag:string)=>(
                <Card
                    padding="none"
                    rounded="sm"
                    className="px-1 items-center uppercase bg-accent-500 text-sm font-bold min-h-6 w-fit "
                >{tag}</Card>
            )
        )
    )
}

export default CommunityCard;