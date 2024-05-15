import { ContainerProps } from "../interfaces"

interface FlexboxProps extends ContainerProps {
    gap?:string
}

const Flexbox:React.FC<FlexboxProps> = (props) => {

    let gap = typeof props.gap !== undefined ? "gap-2" : `gap-${props.gap}`;
    
    return(
    <div className={`flex ${gap} ${props.className}`}>
        {props.children}
    </div>
    )
}

export default Flexbox 