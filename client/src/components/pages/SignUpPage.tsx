import Card from "../primitives/Card";
import Button from "../primitives/Button";
import routes from "../../routes/routes";
import Hyperlink from "../primitives/Hyperlink";
import userAPI from "../../http/userAPI";
import userUtils from "../../utils/userUtils";
import Form, { FormConfig } from "../primitives/Form";

const SignUpPage = () => {

    const userConfig = userUtils.getUserReqs();

    const stringLenError = (minLen:number, maxLen:number) => {
        return(`Should be at least ${minLen}-${maxLen} characters long`)
    }

    const config:FormConfig = {
        onSubmit: (e, {values, errors}) => {
            e.preventDefault()
            console.log(values)
            
            let formErrors = false;
            for(let key in errors) {
                if(errors[key]) {
                    formErrors = true;
                    break;
                }
            }
            console.log(formErrors)
            if(!formErrors) {
                userAPI.registration(values.email, values.displayName, values.login, values.password)
            }
        },
        inputs: [
            {
                name: "email",
                type:"email",
                label: "Email",
                errorMessage: "Email is incorrect!",
                isError: (values) => !userUtils.checkEmail(values.email)
            },
            {
                name: "password",
                type:"password",
                label: "Password",
                errorMessage: stringLenError(userConfig.passwordMinLen, userConfig.passwordMaxLen),
                isError: (values) => !userUtils.checkPassword(values.password)
            },
            {
                name: "confirmPassword",
                type:"password",
                label: "Confirm Password",
                errorMessage: "Passwords don't match!",
                isError: (values) => values.password !== values.confirmPassword
            },
            {
                name: "login",
                type: "string",
                label: "Username",
                isError: (values) => !userUtils.checkName(values.login),
                errorMessage: stringLenError(userConfig.nameMinLen, userConfig.nameMaxLen),
            },
            {
                name: "displayName",
                label: "Display name",
                isError: (values) => !userUtils.checkName(values.displayName),
                errorMessage: stringLenError(userConfig.nameMinLen, userConfig.nameMaxLen)
            },
        ]
    }

    return(
        <div className="sm:items-center box-border flex justify-center min-h-screen p-0 sm:p-16">
            <Card padding="lg" bg="bg-primary" className="flex-col justify-center sm:justify-normal items-center w-full sm:w-96 sm:min-h-full">
                <p className="font-bold text-2xl pb-4">Create an account</p>
                <Form
                    config = {config}
                    formAction = {<Button rounded="sm" className="w-full font-bold bg-accent text-white hover:bg-orange-600">Sign Up</Button>}
                />
                <p className="font-bold">Already have an account? <Hyperlink to={routes.signIn()} className="text-accent hover:underline">Sign In</Hyperlink></p>
            </Card>
            <Button variant="text" href={routes.main()} className="font-bold absolute top-4 left-4 bg-black bg-opacity-30 text-sm">To Main</Button>
        </div>
    );
}

export default SignUpPage;