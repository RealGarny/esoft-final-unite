import Button from "../primitives/Button";
import Card from "../primitives/Card";
import Hyperlink from "../primitives/Hyperlink";
import routes from "../../routes/routes";
import Form, { FormConfig } from "../primitives/Form/Form";
import userAPI from "../../http/userAPI";
import userUtils from "../../utils/userUtils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "../../utils/router";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const SignInPage = () => {

    const userConfig = userUtils.getUserReqs();
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        <div className="items-center box-border flex justify-center min-h-screen p-0 sm:p-24">
            <Card padding="lg" bg="bg-primary" className="flex-col justify-center sm:justify-normal items-center w-full sm:w-96 sm:min-h-full">
                <p className="font-bold text-2xl pb-4">Welcome back!</p>
                {isError && <p>login or password is incorrect</p>}
                <Form
                    config={config}
                    formAction={(params)=><Button onClick={params.onClick} rounded="sm" className="w-full font-bold bg-accent-500 text-white hover:bg-orange-600">Sign In</Button>}
                />
                <Button rounded="sm" variant="text" href={routes.main()} className="w-full font-bold">Back to Main</Button>
                <p className="font-bold">don't have an account? <Hyperlink to={routes.signUp()} className="text-accent-500 hover:underline">Sign Up!</Hyperlink></p>
            </Card>
        </div>
    )
}

export default SignInPage;