import { ContainerProps } from "../../interfaces";
import { VariantProps, cva } from "class-variance-authority";
import cn from "../../utils/cn";
import { twMerge } from "tailwind-merge";

interface FadeContainerProps extends ContainerProps, VariantProps<typeof fadeVariants>{
    fadeColor: string,
    fadeSize?: string,
    blackOverlay?: boolean
}

const FadeContainer:React.FC<FadeContainerProps> = ({children, fadePos, fadeSize, fadeColor, blackOverlay, className}) => {
    return(
        <div className={twMerge("relative w-full overflow-hidden", `${className}`)}>
            {children}
            {blackOverlay && <div className="absolute size-full bg-black bg-opacity-30"></div>}
            <div className={cn(fadeVariants({fadePos}), `${fadeColor} ${fadeSize}`)}/>
        </div>
    )
}

const fadeVariants = cva("h-[20%] to-transparent absolute", {
    variants: {
        fadePos: {
            left: "bottom-0 left-0 bg-gradient-to-r h-full",
            right: "bottom-0 right-0 bg-gradient-to-l h-full",
            bottom: "bottom-0 left-0 bg-gradient-to-t w-full",
            top: "top-0 left-0 bg-gradient-to-b w-full"
        },
    },
    defaultVariants: {
        fadePos:"bottom"
    }
})

export default FadeContainer;