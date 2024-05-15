import { Link } from "react-router-dom";
import { ButtonProps as Bprops } from "../../interfaces";

interface ButtonProps extends Bprops {
    primary?:string,
    secondary?:string,
    rounded?:string,
    href?:string
    hover?: string,
    border?: string,
    variant?: "text" | "contained" | "outlined",
    disabled?: never,
    startIcon?: React.ReactNode,
    endIcon?: React.ReactNode,
}

const Button:React.FC<ButtonProps> = (props) => {

    /*
    let primary:string = props.primary && typeof props.primary === "string" ? props.primary : "white";
    let secondary:string = props.secondary && typeof props.secondary === "string" ? props.secondary : "accent";
    let rounded:string = `rounded-${props.rounded && typeof props.rounded === "string" ? props.rounded : "full"}`;
    */
    let variant:string = "bg-white text-accent hover:bg-accent-light";

    if(props.variant && typeof props.variant === "string") {
        switch(props.variant) {
            case "text":
                variant = "text-text hover:bg-text hover:bg-opacity-15"
                break;
            case "contained":
                variant = "bg-white text-accent hover:bg-accent-light"
                break;
            case "outlined":
                variant = "border border-accent border-opacity-30 hover:bg-accent hover:bg-opacity-10 text-accent hover:border-opacity-60"
                break;
        }
    }

    return(
        <button className={`relative rounded-full transition-all flex gap-2 justify-center bg-satu px-4 py-2 align-middle items-center ${variant} ${props.className}`} onClick={props.onClick}>
            {props.href && typeof props.href === "string" && <Link to={props.href} className="absolute top-0 left-0 size-full"></Link>}
            {props.startIcon}
            {props.children}
            {props.endIcon}
        </button>
    )
}

export default Button;