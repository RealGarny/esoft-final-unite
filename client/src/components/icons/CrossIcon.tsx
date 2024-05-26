import { ClickableComp } from "../../interfaces";

const CrossIcon = (props:ClickableComp) => (
    <svg className={props.className ? props.className : "size-full stroke-white"} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 13L13 1M1 1L13 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default CrossIcon;