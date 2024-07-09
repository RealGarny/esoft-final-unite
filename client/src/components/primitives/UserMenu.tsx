import { useContext } from "react"
import AuthContext from "../../context/AuthContext"
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "./Dropdown";
import { LogOut, Settings, User } from "lucide-react";
import Text from "./Text";
import { useNavigate } from "../../utils/router";

const UserMenu:React.FC = () => {
    const {navigate, routes} = useNavigate();
    const {user, logoutUser} = useContext(AuthContext);

    return(
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
            <p>{user.displayedName}</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{user.displayedName}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={()=>navigate(routes.user(user.login))}>
                    <User className="h-4"/>
                    <Text>Profile</Text>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>navigate(routes.settings())}>
                    <Settings className="h-4"/>
                    <Text>Settings</Text>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=> logoutUser()}>
                        <LogOut className="h-4"/>
                        <Text>Logout</Text>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserMenu;