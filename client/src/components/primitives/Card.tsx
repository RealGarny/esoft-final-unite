import { ContainerProps } from "../../interfaces";
import Flexbox, { FlexboxProps } from "./Flexbox"
import { cva, VariantProps } from "class-variance-authority";
import cn from "../../utils/cn";

export interface CardProps extends ContainerProps, VariantProps<typeof CardVariants> {
    bg?:string,
    padding?: FlexboxProps["padding"]
}

const Card:React.FC<CardProps> = ({children, className, bg, rounded, padding}) => {

    return(
        <Flexbox padding={padding} className={cn(CardVariants({rounded, className}), bg)}>
            {children}
        </Flexbox>
    )
}

const CardVariants = cva("bg-primary", {
    variants: {
        rounded: {
            xs: "rounded-md",
            sm: "rounded-lg",
            md: "rounded-xl",
            lg: "rounded-2xl",
            xl: "rounded-3xl",
            full: "rounded-full"
        }
    },
    defaultVariants: {
        rounded: "md"
    }
})

export default Card;