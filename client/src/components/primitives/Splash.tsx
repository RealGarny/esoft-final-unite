import { ChildrenProp } from "../../interfaces"

const Splash:React.FC<ChildrenProp> = (props) => {
    return(
        <div className="relative h-[600px] z-10 w-full bg-[color:var(--secondary)] my-[-64px] flex items-center align-middle">
            <div className="absolute size-full"></div>
        </div>
    )
}

export default Splash;