import { ChildrenProp } from "../../interfaces"
import routes from "../../routes/routes";
import Flexbox from "./Flexbox";
import Button from "./Button";
import Card from "./Card";
import FadeContainer from "./FadeContainer";

const Splash:React.FC<ChildrenProp> = () => {

    return(
        <div className="bg-secondary">
            <FadeContainer 
                blackOverlay
                fadeColor="from-secondary"
                fadeSize="h-[300px]"
                className="mt-[-64px] h-[600px] uppercase"
            >
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
            </FadeContainer>
            <Flexbox className="mt-10 flex-col">
                <Flexbox className="justify-between items-center px-2">
                    <p className="font-bold uppercase text-white text-2xl">Communities</p>
                    <Button href={routes.communities} className="font-bold opacity-75" variant="text">View All</Button>
                </Flexbox>
                <Flexbox className="pl-2">
                    <Card className=" bg-primary min-w-96 min-h-52 transition duration-300 hover:-translate-y-1">
                        <FadeContainer fadeColor="from-primary" fadeSize="h-20" className="h-44 w-full">
                            <div className="absolute min-h-full min-w-full left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                                <img src="https://media.cdn.community.lambdageneration.com/backgrounds/1694882926930B4CsCjBrB2CfBUXB.png?size=search"></img>
                            </div>
                        </FadeContainer>
                    </Card>
                </Flexbox>
            </Flexbox>
        </div>
    )
}

export default Splash;