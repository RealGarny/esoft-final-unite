import Dialog from "./Dialog"
import Flexbox from "../Flexbox"
import Text from "../Text"
import Button from "../Button"

const AssuranceDialog = ({result, isOpen}) => {

    return(
        <Dialog isOpen={isOpen}>
            <Flexbox className="flex-col items-center">
                <Text className="font-bold">Are you sure?</Text>
                <Text>The following action cannot be undone.</Text>
            </Flexbox>
            <Flexbox className="justify-center">
                <Button onClick={()=>result(true)} rounded={"sm"} className="bg-accent-500 text-white hover:bg-accent-600">Confirm</Button>
                <Button onClick={()=>result(false)} rounded={"sm"} className="bg-primary hover:bg-additional text-white">Cancel</Button>
            </Flexbox>
        </Dialog>
    )
}

export default AssuranceDialog;