import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type Cn = (inputs: string, additionals?:string) => string;

const cn:Cn = (inputs, additionals ="") => {
    return twMerge(clsx(inputs), additionals);
}

export default cn;