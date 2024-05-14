import { ButtonProps } from "../../interfaces";

const Button:React.FC<ButtonProps> = (props) => {
    return(
        <div className={props.className} onClick={props.onClick}>{props.children}</div>
    )
}

export default Button;