import Flexbox from "../primitives/Flexbox";
import Text from "../primitives/Text";
import Form, { FormConfig } from "../primitives/Form/Form";
import Button from "../primitives/Button";

const Settings = () => {

    const config:FormConfig = {
        onSubmit: (e, {values, errors}) => {
            e.preventDefault()
            console.log(e.target.files)
        },
        inputs: [
            {
                name: 'avatar',
                label: 'Avatar',
                type: "file",
                className: 'border border-primary',
                isError: (value) => {console.log(value); return false},
                errorMessage: ""
            },
            {
                name: 'displayedName',
                label: 'Displayed Name',
                className: 'border border-primary',
                isError: (value) => (value< 3 || value > 15),
                errorMessage: ""
            }
        ]
    }

    return(
        <Flexbox className="m-auto max-w-container justify-center p-4">
            <Flexbox className="flex-col w-full">
                <Text className="text-4xl">User Settings</Text>
                <div className="h-[1px] w-40 bg-white bg-opacity-60"></div>
                <div className="max-w-72 pl-3">
                    <Form
                        encType="multipart/form-data"
                        config={config}
                        formAction={<Button rounded="sm" className="w-40 font-semibold bg-accent-500 text-white hover:bg-orange-600">Save changes</Button>}
                    />
                </div>
            </Flexbox>
        </Flexbox>
    )
}

export default Settings;