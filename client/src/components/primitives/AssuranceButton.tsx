import { useState } from "react"
import Button from "./Button"
import AssuranceDialog from "./Dialog/AssuranceDialog"

const AssuranceButton:React.FC<React.ComponentProps<typeof Button>> = ({children, onClick, ...args}) => {
    if(!onClick) return;

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsOpen(true)
    }
    console.log(isOpen)
    return (
        <Button {...args} onClick={handleOpenDialog}>
            {children}
            <AssuranceDialog
                isOpen={isOpen}
                result={(isConfirmed:boolean) => {
                    if(isConfirmed) {
                        onClick;
                    }
                    setIsOpen(false);
                }}
            />
        </Button>
    )
}

export default AssuranceButton;