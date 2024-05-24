import { VariantProps, cva } from "class-variance-authority";
import Card from "./Card"
import cn from "../../util/cn";
import { CardProps } from "./Card";

export interface UserLogoProps extends CardProps, VariantProps<typeof logoVariants> {
    src: string,
    alt: string
}

const Logo:React.FC<UserLogoProps> = ({src, alt, className, size, rounded}) => {

    return(
        <Card rounded={rounded ? rounded : "full"} className={cn(logoVariants({className, size}))}>
            <img alt={alt} src={src} className="absolute-centered min-w-full min-h-full"></img>
        </Card>
    )
}

const logoVariants = cva("relative overflow-hidden", {
    variants: {
        size: {
            xs: "size-4",
            sm: "size-7",
            md: "size-12",
            lg: "size-28"
        }
    },
    defaultVariants: {
        size: "md"
    }
})

export default Logo;