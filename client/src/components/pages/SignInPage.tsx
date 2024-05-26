import { FormEvent } from "react";
import Button from "../primitives/Button";
import Card from "../primitives/Card";
import Flexbox from "../primitives/Flexbox";
import Hyperlink from "../primitives/Hyperlink";
import routes from "../../routes/routes";
import Input from "../primitives/Input";

const SignInPage = () => {

    const handleSubmit = (e:FormEvent<HTMLButtonElement>) => {
        e.preventDefault;
    }

    return(
        <div className="items-center box-border flex justify-center min-h-screen p-0 sm:p-24">
            <Card padding="lg" bg="bg-primary" className="flex-col items-center">
                <p className="font-bold text-2xl pb-4">Welcome back!</p>
                <form className="flex flex-col w-full gap-4">
                    <Flexbox className="flex-col">
                    <Input className="bg-additional" label="Email"></Input>
                    </Flexbox>
                    <Flexbox className="flex-col">
                        
                        <Input className="bg-additional" label="Password"></Input>
                    </Flexbox>
                    <Button onSubmit={handleSubmit} rounded="sm" className="w-full font-bold bg-accent text-white hover:bg-orange-600">Sign In</Button>
                </form>
                <Button rounded="sm" variant="text" href={routes.main()} className="w-full font-bold">Back to Main</Button>
                <p className="font-bold">dont have an account? <Hyperlink to={routes.signUp()} className="text-accent hover:underline">Sign Up!</Hyperlink></p>
            </Card>
        </div>
    )
}

export default SignInPage;