import { FormEvent, useState, cloneElement } from "react"
import Input from "../primitives/Input"
import { ChangeEvent } from "react"
import { InputHTMLAttributes } from "react"

export type configItem = InputHTMLAttributes<HTMLInputElement> & {
    key: number,
    label: string,
    name: string,
    className?: string,
    isError: (values:any) => boolean,
    errorMessage: string
}

type FormProps = {
    config: configItem[],
    onSubmit: (e:FormEvent<HTMLFormElement>) => void
    formAction: React.ReactNode
}

const Form = ({formAction, config, onSubmit}:FormProps) => {
    const initialState = config.reduce((acc:Partial<configItem>, obj) => {
        acc[obj.name as keyof configItem] = '';
        return acc;
    }, {});
    const [formState, setFormState] = useState(initialState)
    
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormState((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }

    return(
        <form className="flex flex-col w-full gap-4">
            {config.map((input, index)=> (
                <Input
                    {...input}
                    value={formState.value}
                    isError={config[index].isError(formState)}
                    key={input.key}
                    errorMessage={input.errorMessage}
                    className={`bg-additional ${config[index].className ? config[index].className : ""}`}
                    onChange={handleChange}
                />
            ))}
           {cloneElement(formAction, {onSubmit})}
        </form>
    )
}

export default Form;