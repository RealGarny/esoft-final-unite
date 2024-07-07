import { useState, cloneElement, ReactElement, useEffect } from "react"
import Input from "./Input"
import { ChangeEvent } from "react"
import { InputHTMLAttributes } from "react"
import Textarea from "./Textarea"
import FormElement from "./FormElement"

export type InputItem = InputHTMLAttributes<HTMLInputElement> & {
    label: string,
    name: string,
    className?: string,
    isError: (values:any) => boolean,
    errorMessage: string,
    variant?: any,
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
    if(!config || !config.inputs) {
        return(<div>config was not provided</div>)
    }

    const initialFormState = config.inputs.reduce((acc:Partial<InputItem>, obj) => {
        acc[obj.name as keyof InputItem] = obj.value ? obj.value : '';
        return acc;
    }, {});
    
    const [formState, setFormState] = useState(initialFormState)
    const formErrors:boolean[] = [];
    
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormState((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }

    const handleError = (index:number) => {
        const result = config.inputs[index].isError(formState);
        formErrors[index] = result;

        return result;
    }

    return(
        <form className="flex flex-col w-full gap-4">
            {config.inputs.map((input, index)=> {
                if(!input.name || typeof input.name !== "string") {return <div>provided input name is icorrect. input id:{index}</div>}
                return(
                    <FormElement
                        {...input}
                        isError={handleError(index)}
                        key={input.name}
                        errorMessage={input.errorMessage}
                        render={(props) => {
                            if(props.type !== "textarea") {
                                return(<Input
                                        {...props}

                                        variant={input.variant ? input.variant : "contained"}
                                        //@ts-ignore
                                        value={formState[input.name]}
                                        className={`${input.className ? input.className : ""}`}
                                        onChange={handleChange}
                                    />)
                            } else {
                                return(<Textarea
                                    {...props}
                                    variant={input.variant ? input.variant : "contained"}
                                    //@ts-ignore
                                    value={formState[input.name]}
                                    className={`${input.className ? input.className : ""}`}
                                    onChange={handleChange}
                                />)
                            }
                    }}
                    />
            )})}
           { cloneElement(formAction, {onClick: (e:MouseEvent) => {config.onSubmit(e, {values: formState, errors: formErrors})}}) }
        </form>
    )
}

export default Form;