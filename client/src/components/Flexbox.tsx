import { twMerge } from "tailwind-merge"
import { ContainerProps } from "../interfaces"

const Flexbox:React.FC<ContainerProps> = (props) => {
    
    return(
    <div className={twMerge("flex gap-2", props.className)}>
        {props.children}
    </div>
    )
}

export default Flexbox 