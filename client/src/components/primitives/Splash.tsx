import { ChildrenProp } from "../../interfaces"

const Splash:React.FC<ChildrenProp> = (props) => {
    return(
        <div className="bg-[color:var(--secondary)]">
            <div className="mt-[-64px] relative h-[600px] z-10 w-full flex items-center align-middle">
                <div className="top-0 left-0 bg-black bg-opacity-20 z-10 absolute size-full"/>
                <div className="top-0 left-0 absolute size-full overflow-hidden">
                    <video 
                        poster="https://static.cdn.lambdageneration.com/video/LG_VideoBanner_v4_frame.jpg"
                        playsInline={false}
                        autoPlay={true}
                        muted={true}
                        loop={true}
                    >
                        <source src="https://static.cdn.lambdageneration.com/video/LG_VideoBanner_v4.mp4" type="video/mp4"/>
                    </video>
                </div>
                <div className="bottom-0 left-0 bg-gradient-to-t from-[color:var(--secondary)] to-transparent z-10 absolute size-full"/>
            </div>
            <div className="mt-10 px-4 flex justify-between">
                <p className="font-bold uppercase text-white text-2xl">Communities</p>
                <p className="text-white opacity-80 font-semibold text-xl">View All</p>
            </div>
        </div>
    )
}

export default Splash;