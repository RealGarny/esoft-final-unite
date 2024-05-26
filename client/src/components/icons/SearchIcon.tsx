import { ClickableComp } from "../../interfaces";

const SearchIcon:React.FC<ClickableComp> = (props) => (
    <svg onClick={props.onClick} className={props.className ? props.className : "size-full stroke-white"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m19 19-6-6m2-5A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default SearchIcon;