import { ButtonHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import cn from "../../utils/cn";
import Hyperlink from "./Hyperlink";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariants> {
    href?:string
    hover?: string,
    startIcon?: React.ReactNode,
    endIcon?: React.ReactNode
}

const Button:React.FC<ButtonProps> = ({
    variant,
    padding,
    startIcon,
    endIcon,
    children,
    href,
    rounded,
    className,
    ...args
}) => {

    return(
        <button {...args} className={cn(ButtonVariants({variant, padding, rounded, className}))}>
            {href && typeof href === "string" && <Hyperlink to={href} className="absolute top-0 left-0 size-full"></Hyperlink>}
            {startIcon}
            {children}
            {endIcon}
        </button>
    )
}

    const ButtonVariants = cva("relative text-nowrap transition-all rounded-full flex gap-2 justify-center align-middle items-center", {
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
            rounded: {
                sm: "rounded-lg",
                md: "rounded-xl",
                lg: "rounded-2xl",
                xl: "rounded-3xl",
                full: "rounded-full"
            }
        },
        defaultVariants: {
            variant: "contained",
            padding: "md",
            rounded: "full"
        }
    })

export default Button;