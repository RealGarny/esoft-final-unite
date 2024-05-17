import { twMerge } from "tailwind-merge";
import { ContainerProps } from "../../interfaces";
import Flexbox from "./Flexbox"

const Card:React.FC<ContainerProps> = ({children, className}) => {

    //requested props:
    //rounded, border, 

    return(
        <Flexbox className={twMerge("rounded-xl bg-secondary overflow-hidden", className)}>
            {children}
        </Flexbox>
    )
}

export default Card;