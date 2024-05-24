import Card from "./Card"
import FadeContainer from "./FadeContainer"
import Flexbox from "./Flexbox"
import Button from "./Button"
import routes from "../../routes/routes"
import Hyperlink from "./Hyperlink"
import Logo from "./Logo"

const requiredProps = {
    bgURL: "https://media.cdn.community.lambdageneration.com/backgrounds/1694882926930B4CsCjBrB2CfBUXB.png?size=search",
    iconURL: "https://media.cdn.community.lambdageneration.com/avatars/1694882926817D8CbBPDqgtBDB7CC.png?size=mega",
    bgColor: "#202020",
    primaryColor: "#",
    CID: "source",
    CName: "Source",
    CDescrition: "A subcommunity focused to all games and mods made on the Source engine. Share news, WIPs, playthroughs, and troubleshoot your mod/Hammer with others!",
    CFollowCount: 10231,
    CFollowersNickname: "Enthusiasts"
}

const CommunityCard = () => {
    return(
        <Card padding="none" className="relative overflow-hidden flex-col gap-0 flex-grow-0 flex-shrink-0 w-96">
            <Hyperlink to={`${routes.communities}/${requiredProps.CID}`} className="absolute z-30 top-0 left-0 w-full h-full"/>
            <FadeContainer fadeColor="from-primary" fadeSize="h-20" className="h-40 w-full">
                <div className="absolute min-h-full min-w-full bg-cover bg-white"
                style={{"backgroundImage":`url(${requiredProps.bgURL})`, "backgroundPosition":"50%"}}
                >
                </div>
            </FadeContainer>
            <Flexbox className="flex-col relative px-5 py-5 gap-4 justify-between">
                <Logo size="lg" alt="communityLogo" rounded="xl" src={requiredProps.iconURL} className="border-black border-4 border-opacity-10 mt-[-70px]"/>
                <Button className="absolute top-2 right-5 z-30 m-auto text-sm bg-accent hover:bg-accent-light text-white font-bold">Join</Button>
                <div className="font-bold text-3xl">{requiredProps.CName}</div>
                <Flexbox padding="none" className="flex-col font-bold w-full text-sm h-36 overflow-hidden">
                    <Card padding="none" rounded="sm" className="px-1 items-center uppercase bg-accent text-sm font-bold min-h-6 w-fit ">New!</Card>
                    <p className=" line-clamp-4 text-ellipsis opacity-60">
                        {requiredProps.CDescrition}
                    </p>
                </Flexbox>
                <Flexbox padding="none" className="font-bold gap-1 text-sm">
                    <img className="max-h-6 max-w-6" src="https://media.cdn.community.lambdageneration.com/emojis/source-infoplayerstartmember.png?size=medium"></img>
                    <span>{requiredProps.CFollowCount}</span>
                    <span className="opacity-60">{requiredProps.CFollowersNickname}</span>
                </Flexbox>
            </Flexbox>
        </Card>
    )
}

export default CommunityCard;