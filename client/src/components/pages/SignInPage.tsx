import { FormEvent } from "react";
import Button from "../primitives/Button";
import Card from "../primitives/Card";
import Hyperlink from "../primitives/Hyperlink";
import routes from "../../routes/routes";
import Form, { FormConfig } from "../primitives/Form";
import userAPI from "../../http/userAPI";
import userUtils from "../../utils/userUtils";

const SignInPage = () => {

    const userConfig = userUtils.getUserReqs();

    const stringLenError = (minLen:number, maxLen:number) => {
        return(`Should be at least ${minLen}-${maxLen} characters long`)
    }

    const config:FormConfig = {
        onSubmit: (e, {values, errors}) => {
            e.preventDefault();
            console.log(values, errors)

            let formErrors = false;
            for(let key in errors) {
                if(errors[key]) {
                    formErrors = true;
                    break;
                }
            }

            if(!formErrors) {
                userAPI.authorization(values.login, values.password)
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
            <Card padding="lg" bg="bg-primary" className="flex-col items-center">
                <p className="font-bold text-2xl pb-4">Welcome back!</p>
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