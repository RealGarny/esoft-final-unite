import Card from "../Card"

export interface UserLogoProps {
    src: string
}

const UserLogo:React.FC<UserLogoProps> = ({src}) => {

    return(
        <Card rounded="full" className="relative h-14 w-14">
            <img src={src} className="absolute-centered"></img>
        </Card>
    )
}

export default UserLogo;