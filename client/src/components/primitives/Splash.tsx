import { ChildrenProp } from "../../interfaces"
import CommunitiesCarousel from "./CommunitiesCarousel";
import FadeContainer from "./FadeContainer";
import Flexbox from "./Flexbox";
import Text from "./Text";

const Splash:React.FC<ChildrenProp> = () => {

    return(
        <div className="bg-background pb-3">
            <FadeContainer 
                blackOverlay
                fadeColor="from-background"
                fadeSize="h-[300px]"
                className="mt-[-64px] h-[600px] uppercase"
            >
                    <video
                        className="min-h-full min-w-full absolute-centered"
                        poster="https://static.cdn.lambdageneration.com/video/LG_VideoBanner_v4_frame.jpg"
                        playsInline={false}
                        autoPlay={true}
                        muted={true}
                        loop={true}
                    >
                        <source src="https://static.cdn.lambdageneration.com/video/LG_VideoBanner_v4.mp4" type="video/mp4"/>
                    </video>
                    <Flexbox className="absolute font-bold absolute-centered w-full z-[1] items-center flex-col text-center">
                        <Text className=" text-7xl">Welcome To <span className="text-accent-500">Unite</span></Text>
                        <Text className="text-2xl">hope you like it here</Text>
                    </Flexbox>
            </FadeContainer>
            <CommunitiesCarousel/>
        </div>
    )
}

export default Splash;