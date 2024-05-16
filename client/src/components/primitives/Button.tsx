import { Link } from "react-router-dom";
import { ButtonHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import cn from "../../util/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariants> {
    href?:string
    hover?: string,
    startIcon?: React.ReactNode,
    endIcon?: React.ReactNode,
}

const Button:React.FC<ButtonProps> = ({variant, padding, startIcon, endIcon, children, href, className, ...args}) => {

    let variantStyle:string = "bg-white text-accent hover:bg-accent-light";

    if(variant && typeof variant === "string") {
        switch(variant) {
            case "text":
                variantStyle = ""
                break;
            case "contained":
                variantStyle = ""
                break;
            case "outlined":
                variantStyle = ""
                break;
        }
    }

    return(
        <button {...args} className={cn(ButtonVariants({variant, padding, className}))}>
            {href && typeof href === "string" && <Link to={href} className="absolute top-0 left-0 size-full"></Link>}
            {startIcon}
            {children}
            {endIcon}
        </button>
    )
}

    const ButtonVariants = cva("relative transition-all rounded-full flex gap-2 justify-center align-middle items-center", {
        variants: {
            variant: {
                text: "text-text hover:bg-text hover:bg-opacity-15",
                contained: "bg-white text-accent hover:bg-accent-light",
                outlined: "border border-accent border-opacity-30 hover:bg-accent hover:bg-opacity-10 text-accent hover:border-opacity-60"
            },
            padding: {
                none: "",
                sm: "px-2 py-1",
                md: "px-4 py-2",
                lg: "px-8 py-4"
            },
        },
        defaultVariants: {
            variant: "contained",
            padding: "md"
        }
    })

export default Button;