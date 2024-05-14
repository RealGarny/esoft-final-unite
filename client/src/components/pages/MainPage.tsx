import Splash from "../primitives/Splash";

const MainPage:React.FC = () => {
    return(
        <>
            <Splash/>
            <div className="h-[600px] z-10 w-full bg-[color:var(--additional)]"></div>
        </>
    )
}

export default MainPage;