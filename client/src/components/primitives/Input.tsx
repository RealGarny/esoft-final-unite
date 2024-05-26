import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes, useState } from "react";
import cn from "../../util/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof InputVariants> { 
    label?:string,
    errorMessage?:string,
    isError?:boolean,
}

const Input:React.FC<InputProps> = ({
    variant,
    padding,
    errorMessage,
    rounded,
    isError,
    label,
    className,
    ...args
}) => {

    const [blur, setBlur] = useState(false);
    
    const handleBlur = () => {
        if(!isError) {
            setBlur(false)
        } else {
            setBlur(true)
        }
    }

    return(
        <div className="flex flex-col gap-1">
            {label && <label htmlFor={args.name}>{label}</label>}
            <input
                {...args}
                className={cn(InputVariants({variant, padding, rounded, className}))}
                onBlur={handleBlur}
            />
            {isError && blur && <span className=" text-red-500">{errorMessage}</span>}
        </div>
    )
}

const InputVariants = cva("bg-primary", {
    variants: {
        variant: {
            text: "text-text",
            contained: "bg-white text-white",
            outlined: "border border-accent border-opacity-30 text-accent"
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

export default Input