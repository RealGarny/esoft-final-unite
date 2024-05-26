import { VariantProps, cva } from "class-variance-authority";
import Card from "./Card"
import cn from "../../util/cn";
import { CardProps } from "./Card";
import Hyperlink from "./Hyperlink";

export interface UserLogoProps extends CardProps, VariantProps<typeof logoVariants> {
    src: string,
    alt: string,
    href?: string,
}

const Logo:React.FC<UserLogoProps> = ({src, alt, className, size, rounded, href}) => {

    return(
        <Card rounded={rounded ? rounded : "full"} className={cn(logoVariants({className, size}))}>
            <img alt={alt} src={src} className="absolute-centered min-w-full min-h-full"></img>
            {href && <Hyperlink className="absolute size-full" to={href}/>}
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