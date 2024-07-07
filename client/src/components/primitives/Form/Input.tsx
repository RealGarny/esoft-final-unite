import { VariantProps } from "class-variance-authority"
import { InputHTMLAttributes } from "react"
import cn from "../../../utils/cn"
import { cva } from "class-variance-authority"

interface FormElement extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof InputVariants> {
}

const Input:React.FC<FormElement> = ({variant, padding, rounded, className, ...args}) => {
    return(
        <input
            {...args}
            className={cn(InputVariants({variant, padding, rounded, className}))}
        />
    )
}

export const InputVariants = cva("", {
    variants: {
        variant: {
            text: "text-text",
            contained: "border-solid border border-white border-opacity-20 bg-primary",
            outlined: "bg-none border-solid border border-accent-500 border-opacity-60 text-accent-500"
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
        rounded: "sm"
    }
})

export default Input;