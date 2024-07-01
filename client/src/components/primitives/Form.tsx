import { useState, cloneElement, ReactElement } from "react"
import Input from "./Input"
import { ChangeEvent } from "react"
import { InputHTMLAttributes } from "react"

export type InputItem = InputHTMLAttributes<HTMLInputElement> & {
    label: string,
    name: string,
    className?: string,
    isError: (values:any) => boolean,
    errorMessage: string
}

interface submitValues {
    values:any,
    errors:boolean[]
}
export interface FormConfig {
    onSubmit: (e:MouseEvent, {values, errors}:submitValues) => void,
    inputs: InputItem[]
}

export interface FormProps {
    config: FormConfig,
    formAction: ReactElement;
}

const Form = ({formAction, config}:FormProps) => {
    const initialFormState = config.inputs.reduce((acc:Partial<InputItem>, obj) => {
        acc[obj.name as keyof InputItem] = '';
        return acc;
    }, {});
    
    const [formState, setFormState] = useState(initialFormState)
    const formErrrors:boolean[] = []
    
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormState((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }

    const handleError = (index:number) => {
        console.log(index)
        const result = config.inputs[index].isError(formState);
        formErrrors[index] = result;

        return result;
    }

    return(
        <form className="flex flex-col w-full gap-4">
            {config.inputs.map((input, index)=> (
                <Input
                    {...input}
                    key={`${index}`+input.name}
                    value={formState.value}
                    isError={handleError(index)}
                    errorMessage={input.errorMessage}
                    className={`bg-additional ${input.className ? input.className : ""}`}
                    onChange={handleChange}
                />
            ))}
           { cloneElement(formAction, {onClick: (e:MouseEvent) => {config.onSubmit(e, {values: formState, errors: formErrrors})}}) }
        </form>
    )
}

export default Form;