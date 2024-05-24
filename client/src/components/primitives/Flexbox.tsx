import { ContainerProps } from "../../interfaces"
import { cva, VariantProps } from "class-variance-authority"

export interface FlexboxProps extends ContainerProps, VariantProps<typeof FlexboxVariants> {}

const Flexbox:React.FC<FlexboxProps> = ({padding, className, children}) => {
    
    return(
    <div className={FlexboxVariants({padding, className})}>
        {children}
    </div>
    )
}

const FlexboxVariants = cva("flex gap-2", {
    variants: {
        padding: {
            none: "",
            sm: "px-2 py-1",
            md: "px-4 py-2",
            lg: "px-8 py-4",
        },
    },
    defaultVariants: {
        padding: "none"
    }
})

export default Flexbox 