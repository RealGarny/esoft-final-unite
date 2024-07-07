import routes from "../../routes/routes"
import Hyperlink from "../primitives/Hyperlink"
import Text from "../primitives/Text"
type NotFoundProps = {
    pageUrl: string
}
const NotFound:React.FC<NotFoundProps> = (props) => {
    return(
        <div className="w-screen h-screen">
            <Text>
                404. not found
            </Text>
            {props.pageUrl &&
                <Text>
                    Requested page {props.pageUrl.toString()} was not found.
                </Text>
            }
            <Hyperlink to={routes.main()}>go to main</Hyperlink>
        </div>
    )
}

export default NotFound;