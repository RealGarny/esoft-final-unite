import { createPortal } from "react-dom";
import Card from "./Card";

type DialogProps = {
    isOpen: boolean,
    children: React.ReactNode,
    onClose: () => void
}

const Dialog:React.FC<DialogProps> = ({isOpen, children, onClose}) => {
    return(
        isOpen && createPortal(
        <>
            <div className="fixed flex z-10 top-0 left-0 w-screen h-screen bg-black bg-opacity-50" onClick={onClose}></div>
            <Card className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 flex-col w-5/6  sm:w-[400px] bg-secondary p-6 rounded-lg m-auto">
                {children}
            </Card>
        </>,
        document.body)
    )
}
export default Dialog;