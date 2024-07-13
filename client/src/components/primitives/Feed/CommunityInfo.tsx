import { Info } from "lucide-react";
import Card from "../Card";
import Flexbox from "../Flexbox";
import Text from "../Text";

export type CommunityInfo = {
    description:string
}
const CommunityInfo:React.FC<CommunityInfo> = (props) => {
    return(
        <Flexbox className="flex-col hidden lg:block max-w-72">
            {props.description && 
                <Flexbox className="flex-col gap-2 font-bold">
                    <Flexbox className="items-center">
                        <Info className="h-5"/>
                        <Text className="opacity-80 text-md">About</Text>
                    </Flexbox>
                    <Card className="flex-col text-sm p-4">
                        <Text>{props.description}</Text>
                    </Card>
                </Flexbox>
            }
        </Flexbox>
    )
}

export default CommunityInfo;