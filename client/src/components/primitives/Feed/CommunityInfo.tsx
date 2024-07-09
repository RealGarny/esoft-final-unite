import Card from "../Card";
import Flexbox from "../Flexbox";
import Text from "../Text";

export type CommunityInfo = {
    description:string
}
const CommunityInfo:React.FC<CommunityInfo> = (props) => {
    return(
        <Flexbox className="flex-col hidden lg:block">
            {props.description && 
                <Flexbox className="flex-col gap-2 font-bold">
                    <Text className="opacity-80 text-md">About</Text>
                    <Card className="flex-col text-sm p-4">
                        <Text>{props.description}</Text>
                    </Card>
                </Flexbox>
            }
        </Flexbox>
    )
}

export default CommunityInfo;