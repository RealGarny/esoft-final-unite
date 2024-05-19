import { twMerge } from "tailwind-merge";
import { ClickableComp } from "../../interfaces";

const TrendingIcon:React.FC<ClickableComp> = (props) => (
    <svg onClick={props.onClick} className={twMerge("size-full fill-white", props.className)} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.806,6c2.757,7.389 1.323,11.415 -1.765,14.613c-3.364,3.529 -8.602,6.176 -12.297,11.359c-4.908,6.893 -5.735,22.058 11.966,26.028c-7.444,-3.915 -9.043,-15.275 -0.992,-22.388c-2.096,6.893 1.764,11.304 6.562,9.705c4.687,-1.599 7.775,1.765 7.664,5.625c-0.055,2.647 -1.102,4.907 -3.804,6.176c11.524,-2.041 16.157,-11.58 16.157,-18.859c-0,-9.595 -8.548,-10.919 -4.247,-18.969c-5.128,0.441 -6.892,3.804 -6.396,9.319c0.331,3.639 -3.474,6.121 -6.286,4.466c-2.261,-1.378 -2.206,-4.025 -0.221,-6.01c4.246,-4.191 5.9,-13.841 -6.341,-21.065Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default TrendingIcon;