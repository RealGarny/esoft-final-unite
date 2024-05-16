import { ChildrenProp } from "../../interfaces"
import routes from "../../routes/routes";
import Flexbox from "../Flexbox";
import Button from "./Button";
import Card from "./Card";

const Splash:React.FC<ChildrenProp> = () => {

    return(
        <div className="bg-secondary">
            <div className="mt-[-64px] relative h-[600px] z-10 w-full uppercase overflow-hidden">
                    <video
                        className="min-h-full min-w-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                        poster="https://static.cdn.lambdageneration.com/video/LG_VideoBanner_v4_frame.jpg"
                        playsInline={false}
                        autoPlay={true}
                        muted={true}
                        loop={true}
                    >
                        <source src="https://static.cdn.lambdageneration.com/video/LG_VideoBanner_v4.mp4" type="video/mp4"/>
                    </video>
                <div className="absolute size-full bg-black bg-opacity-20"></div>
                <div className="bottom-0 left-0 bg-gradient-to-t from-secondary to-transparent absolute w-full h-[200px]"/>
            </div>
            <Flexbox className="mt-10 flex-col">
                <Flexbox className="justify-between items-center px-2">
                    <p className="font-bold uppercase text-white text-2xl">Communities</p>
                    <Button href={routes.communities} className="font-bold opacity-75" variant="text">View All</Button>
                </Flexbox>
                <Flexbox className="pl-2">
                    <Card className=" bg-primary min-w-64 min-h-52">
                        <div className="relative h-44 w-full">
                            <div className="absolute top-0 left-0">
                                <img src="https://media.cdn.community.lambdageneration.com/backgrounds/1694882926930B4CsCjBrB2CfBUXB.png?size=search"></img>
                            </div>
                        </div>
                        <div className="bottom-0 left-0 bg-gradient-to-t from-secondary to-transparent absolute w-full h-[200px]"></div>
                    </Card>
                </Flexbox>
            </Flexbox>
        </div>
    )
}

export default Splash;