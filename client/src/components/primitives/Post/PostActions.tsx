import { useState } from "react"
import EllipsisIcon from "../../icons/EllipsisIcon"
import FlagIcon from "../../icons/FlagIcon"
import HeartIcon from "../../icons/HeartIcon"
import MessageIcon from "../../icons/MessageIcon"
import PencilIcon from "../../icons/PencilIcon"
import ShareIcon from "../../icons/ShareIcon"
import TrashIcon from "../../icons/TrashIcon"
import AuthReqButton from "../AuthReqButton"
import Button from "../Button"
import AssuranceDialog from "../Dialog/AssuranceDialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../Dropdown"
import Flexbox from "../Flexbox"
import Text from "../Text"

const PostActions = () => {
    return(
        <Flexbox className="justify-around gap-3">
            <AuthReqButton endIcon={<HeartIcon className="size-5 opacity-50 group-hover:stroke-red-500 group-hover:opacity-100"/>} variant="text" rounded="sm" className="flex-1 group"/>
            <AuthReqButton endIcon={<MessageIcon className="size-5 opacity-50 group-hover:stroke-sky-500 group-hover:opacity-100"/>} variant="text" rounded="sm" className="flex-1 group"/>
            <Button variant="text" startIcon={<ShareIcon className="size-5 opacity-50 group-hover:opacity-100"/>} rounded="sm" className="flex-1 group"></Button>
            <EllipsisActions/>
        </Flexbox>
    )
}

const EllipsisActions = () => {
    const [isOpen, setIsOpen] = useState(false);



    const openDialog = () => {
        setIsOpen(true);
    }
    return(
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex-1"> {/*TODO: figure out how to get rid of div container*/}
                        <Button
                            variant="text"
                            startIcon={<EllipsisIcon className="size-5 opacity-50 group-hover:opacity-100"/>}
                            rounded="sm"
                            className="group w-full"
                        />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                       <PencilIcon className="h-4"/>
                       <Text>Edit</Text>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <FlagIcon className="h-4"/>
                        <Text>Report</Text>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={openDialog}>
                            <TrashIcon className="stroke-red-500 h-4"/>
                            <Text className="text-red-500">Delete</Text>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AssuranceDialog
                result={(isConfirmed:boolean) => {
                    if(isConfirmed) {
                        console.log("yaaay!")
                    }
                    setIsOpen(false);
                }}
                isOpen={isOpen}
            />
        </>
    )
}

export default PostActions