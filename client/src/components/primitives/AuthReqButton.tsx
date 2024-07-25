import Button from "./Button"
import { ButtonProps } from "./Button";
import WithAuthReq from "./withAuthReq";

const AuthReqButton:React.FC<ButtonProps> = ({children, onClick, ...args}) => {

    return(
            <WithAuthReq 
                render={(path) => (
                    <Button {...args} href={path ? path : args.href} onClick={onClick}>
                        {children}
                    </Button>
                )}
            />
        )
}

export default AuthReqButton;