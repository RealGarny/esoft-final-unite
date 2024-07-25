import Button from "../primitives/Button";
import Card from "../primitives/Card";
import Hyperlink from "../primitives/Hyperlink";
import Form, { FormConfig } from "../primitives/Form/Form";
import userAPI from "../../http/userAPI";
import userUtils from "../../utils/userUtils";
import { useState } from "react";
import { useNavigate } from "../../utils/router";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const SignInPage = () => {

    const userConfig = userUtils.getUserReqs();
    const {navigate, routes} = useNavigate();
    const {loginUser} = useContext(AuthContext);

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
                const token = await userAPI.authorization(values.login, values.password);

                if(!token.error) {
                    setIsError(false);
                    loginUser(token);
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
        <div className="sm:items-center box-border flex justify-center min-h-screen p-0 sm:p-16">
            <Card padding="lg" bg="bg-primary" className="flex-col justify-center sm:justify-normal items-center w-full sm:w-96 sm:min-h-full">
                <p className="font-bold text-2xl pb-4">Welcome back!</p>
                {isError && <p>login or password is incorrect</p>}
                <Form
                    className="max-w-80"
                    config={config}
                    formAction={(params)=><Button onClick={params.onClick} rounded="sm" className="w-full mx-auto font-bold bg-accent-500 text-white hover:bg-orange-600">Sign In</Button>}
                />
                <p className="font-bold">don't have an account? <Hyperlink to={routes.signUp()} className="text-accent-500 hover:underline">Sign Up!</Hyperlink></p>
            </Card>
            <Button variant="text" href={routes.main()} className="font-bold absolute top-4 left-4 bg-black bg-opacity-30 text-sm">To Main</Button>
        </div>
    )
}

export default SignInPage;