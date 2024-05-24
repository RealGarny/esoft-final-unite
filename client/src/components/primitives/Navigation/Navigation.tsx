import Flexbox from "../Flexbox";

interface NavigationProps {
    sort?:React.ReactNode,
    categories?:React.ReactNode
}

const Navigation:React.FC<NavigationProps> = ({sort, categories}) => {
    return(
        <Flexbox className="sticky top-20 w-40 hidden sm:block size-fit">
            {sort}
            {categories}
        </Flexbox>
    )
}

export default Navigation;