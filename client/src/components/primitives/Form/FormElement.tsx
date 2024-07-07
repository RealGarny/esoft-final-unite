import { InputHTMLAttributes, useState } from "react";

interface FormElement extends InputHTMLAttributes<HTMLInputElement> {
    render: (args:any) => React.ReactElement,
    label?:string,
    errorMessage?:string,
    isError?:boolean,
    labelClassname?:string,
}

const FormElement:React.FC<FormElement> = ({
    render,
    errorMessage,
    isError,
    label,
    labelClassname,
    ...args
}) => {

    const [blur, setBlur] = useState(false);
    
    const onBlur = () => {
        if(!isError) {
            setBlur(false)
        } else {
            setBlur(true)
        }
    }

    return(
        <div className="flex flex-col gap-1">
            {label && <label htmlFor={args.name} className={labelClassname}>{label}</label>}
            {render({onBlur, ...args})}
            {isError && blur && <span className=" text-red-500">{errorMessage}</span>}
        </div>
    )
}

export default FormElement