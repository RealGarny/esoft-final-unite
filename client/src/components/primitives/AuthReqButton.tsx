import routes from "../../routes/routes";
import Button from "./Button"
import { ButtonProps } from "./Button";

const isUserLogged = () => {
    return false;
}

const AuthReqButton:React.FC<ButtonProps> = ({children, onClick, ...args}) => {

    return(
            isUserLogged() ? 
            <Button {...args} onClick={onClick}>
                {children}
            </Button>
            :
            <Button {...args} href={routes.signIn()}>
                {children}
            </Button>
        )
}

export default AuthReqButton;