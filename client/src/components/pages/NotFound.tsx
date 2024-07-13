import routes from "../../routes/routes"
import Flexbox from "../primitives/Flexbox"
import Hyperlink from "../primitives/Hyperlink"
import Text from "../primitives/Text"
type NotFoundProps = {
    pageUrl: string
}
const NotFound:React.FC<NotFoundProps> = (props) => {
    return(
        <Flexbox className="flex-col w-full h-full items-center">
            <Text className="font-bold text-xl">
                404. not found
            </Text>
            {props.pageUrl &&
                <Text>
                    Requested page {props.pageUrl.toString()} was not found.
                </Text>
            }
            <Hyperlink to={routes.main()} className="text-accent-500 underline">go to main</Hyperlink>
        </Flexbox>
    )
}

export default NotFound;