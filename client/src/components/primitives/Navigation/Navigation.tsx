import Flexbox from "../Flexbox";

interface NavigationProps {
    sort?:React.ReactNode,
    categories?:React.ReactNode
}

const Navigation:React.FC<NavigationProps> = ({sort, categories}) => {
    return(
        <Flexbox className="w-40">
            {sort}
            {categories}
        </Flexbox>
    )
}

export default Navigation;