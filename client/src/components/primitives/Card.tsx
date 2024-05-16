import { twMerge } from "tailwind-merge";
import { ContainerProps } from "../../interfaces";
import Flexbox from "../Flexbox"

const Card:React.FC<ContainerProps> = ({children, className}) => {

    return(
        <Flexbox className={twMerge("rounded-xl bg-secondary px-4 py-2 overflow-hidden", className)}>
            {children}
        </Flexbox>
    )
}

export default Card;