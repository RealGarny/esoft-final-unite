import Button from "../primitives/Button";
import Card from "../primitives/Card";
import Hyperlink from "../primitives/Hyperlink";
import routes from "../../routes/routes";
import Form, { FormConfig } from "../primitives/Form";
import userAPI from "../../http/userAPI";
import userUtils from "../../utils/userUtils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { assignUser } from "../../store/userSlice";
import { useNavigate } from "../../utils/router";

const SignInPage = () => {

    const userConfig = userUtils.getUserReqs();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const stringLenError = (minLen:number, maxLen:number) => {
        return(`Should be at least ${minLen}-${maxLen} characters long`)
    }

    const [isError, setIsError] = useState(false);

    const config:FormConfig = {
        onSubmit: (e, {values, errors}) => {
            e.preventDefault();

            let formErrors = false;
            for(let key in errors) {
                if(errors[key]) {
                    formErrors = true;
                    break;
                }
            }

            const getUser = async() => {
                const user = await userAPI.authorization(values.login, values.password);

                if(!user.error) {
                    setIsError(false);
                    dispatch(assignUser(user));
                    navigate(routes.main());
                } else {
                    setIsError(true);
                }
            }

            if(!formErrors) {
                getUser();
            }
        },
        inputs: [
            {
                name: "login",
                type:"text",
                label: "Login",
                errorMessage: stringLenError(userConfig.nameMinLen, userConfig.nameMaxLen),
                isError: (values) => !userUtils.checkName(values.login)
            },
            {
                name: "password",
                type:"password",
                label: "Password",
                errorMessage: "Password is incorrect!",
                isError: (values) => !userUtils.checkPassword(values.password)
            },
        ]
    }

    return(
        <div className="items-center box-border flex justify-center min-h-screen p-0 sm:p-24">
            <Card padding="lg" bg="bg-primary" className="flex-col justify-center sm:justify-normal items-center w-full sm:w-96 sm:min-h-full">
                <p className="font-bold text-2xl pb-4">Welcome back!</p>
                {isError && <p>login or password is incorrect</p>}
                <Form
                    config={config}
                    formAction={<Button rounded="sm" className="w-full font-bold bg-accent text-white hover:bg-orange-600">Sign In</Button>}
                />
                <Button rounded="sm" variant="text" href={routes.main()} className="w-full font-bold">Back to Main</Button>
                <p className="font-bold">don't have an account? <Hyperlink to={routes.signUp()} className="text-accent hover:underline">Sign Up!</Hyperlink></p>
            </Card>
        </div>
    )
}

export default SignInPage;