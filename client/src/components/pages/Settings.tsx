import Flexbox from "../primitives/Flexbox";
import Text from "../primitives/Text";
import Form, { FormConfig } from "../primitives/Form";
import Button from "../primitives/Button";
import { useAppSelector } from "../../store/hooks";

const Settings = () => {
    const user = useAppSelector(state => state.user)

    const config:FormConfig = {
        onSubmit: (e, {values, errors}) => {
    
        },
        inputs: [
            {
                name: 'displayedName',
                value: user.displayedName,
                label: 'Displayed Name',
                isError: (value) => (value< 3 || value > 15),
                errorMessage: ""
            }
        ]
    }

    return(
        <Flexbox className="m-auto max-w-container justify-center p-4">
            <Flexbox className="flex-col w-full">
                <p className="text-4xl">User Settings</p>
                <div className="h-[1px] w-40 bg-white bg-opacity-60"></div>
                <div className="max-w-72 pl-3">
                    <Form
                        config={config}
                        formAction={<Button rounded="sm" className="w-40 font-semibold bg-accent text-white hover:bg-orange-600">Save changes</Button>}
                    />
                </div>
            </Flexbox>
        </Flexbox>
    )
}

export default Settings;