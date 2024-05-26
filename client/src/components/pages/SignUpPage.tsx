import Card from "../primitives/Card";
import Button from "../primitives/Button";
import { ChangeEvent, FormEvent, InputHTMLAttributes, useState } from "react";
import routes from "../../routes/routes";
import Hyperlink from "../primitives/Hyperlink";
import Input from "../primitives/Input";

interface FormInputs extends InputHTMLAttributes<HTMLInputElement> {
    key:number,
    label:string,
    errorMessage?:string,
    isError?: boolean,
}

const SignUpPage = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        displayName: ''
    });

    const inputs:FormInputs[] = [
        {
            key: 0,
            name: "email",
            type:"email",
            label: "Email",
            value: values.email,
            errorMessage: "Email is incorrect!",
            pattern:"test",
            isError: !/^\S+@\S+\.\S+$/.test(values.email)
        },
        {
            key: 1,
            name: "password",
            type:"password",
            label: "Password",
            value: values.password,
            errorMessage: "Should be at least 8-15 characters long",
            isError: values.password.length < 8 || values.password.length > 15
        },
        {
            key: 2,
            name: "confirmPassword",
            type:"password",
            value:values.confirmPassword,
            label: "Confirm Password",
            errorMessage: "Passwords don't match!",
            isError: values.password !== values.confirmPassword
        },
        {
            key: 3,
            name: "username",
            type: "string",
            value: values.username,
            label: "Username",
            isError: values.username.length > 15 || values.username.length < 4,
            errorMessage: "Should be at least 4-15 characters long",
        },
        {
            key: 4,
            name: "displayName",
            label: "Display name",
            value: values.displayName,
            isError: values.displayName.length > 15 || values.displayName.length < 4,
            errorMessage: "Should be at least 4-15 characters long"
        },
    ]

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setValues((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e:FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    return(
        <div className="sm:items-center box-border flex justify-center min-h-screen p-0 sm:p-16">
            <Card padding="lg" bg="bg-primary" className="flex-col justify-center sm:justify-normal items-center w-full sm:w-96 sm:min-h-full">
                <p className="font-bold text-2xl pb-4">Create an account</p>
                <form className="flex flex-col w-full gap-4">
                    {inputs.map((input)=> (
                        <Input
                            {...input}
                            key={input.key}
                            errorMessage={input.errorMessage}
                            className="bg-additional"
                            onChange={handleChange}
                        />
                    ))}
                    <Button onSubmit={handleSubmit} rounded="sm" className="w-full font-bold bg-accent text-white hover:bg-orange-600">Sign Up</Button>
                </form>
                <p className="font-bold">Already have an account? <Hyperlink to={routes.signIn()} className="text-accent hover:underline">Sign In</Hyperlink></p>
            </Card>
            <Button variant="text" href={routes.main()} className="font-bold absolute top-4 left-4 bg-black bg-opacity-30 text-sm">To Main</Button>
        </div>
    );
}

export default SignUpPage;