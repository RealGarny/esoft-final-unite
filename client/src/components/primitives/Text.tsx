import { HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {

}

const Text:React.FC<TextProps> = ({children, ...args}) => {
    return(
        <p {...args}>
            {children}
        </p>
    )
}

export default Text;