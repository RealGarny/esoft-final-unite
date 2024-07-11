import Flexbox from "../primitives/Flexbox";
import Text from "../primitives/Text";
import Form, { FormConfig } from "../primitives/Form/Form";
import Button from "../primitives/Button";
import NotFound from "./NotFound";
import useCommunity from "../../context/CommunityContext";
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";

const CommunitySettings = () => {

    const location = useLocation();
    const {community, updateCommunity} = useCommunity();
    const {user} = useContext(AuthContext);

    console.log(community)
    if(!community.id || community.creator !==user.id) {
        return(
            <NotFound
                pageUrl={location.pathname}
            />
        )
    }

    const config:FormConfig = {
        onSubmit: (e, {values, errors}) => {
            e.preventDefault()

            let formErrors = false;
            for(let key in errors) {
                if(errors[key]) {
                    formErrors = true;
                    break;
                }
            }
            if(!formErrors) {
                updateCommunity(values)
            }
        },
        inputs: [
            {
                name: 'followerNickname',
                label: 'Follower Nickname',
                className: 'border border-primary',
                isError: (values) => (values.followerNickname.length < 3 || values.followerNickname.length > 20) && values.followerNickname !== "",
                errorMessage: "must be between 3 and 20 characters long"
            }
        ]
    }

    return(
        <Flexbox className="m-auto max-w-container justify-center p-4">
            <Flexbox className="flex-col w-full">
                <Text className="text-4xl">Community settings</Text>
                <div className="h-[1px] w-40 bg-white bg-opacity-60"></div>
                <div className="max-w-72 pl-3">
                    <Form
                        encType="multipart/form-data"
                        config={config}
                        formAction={(params)=><Button onClick={params.onClick} rounded="sm" className="w-40 font-semibold bg-accent-500 text-white hover:bg-orange-600">Save changes</Button>}
                    />
                </div>
            </Flexbox>
        </Flexbox>
    )
}

export default CommunitySettings;