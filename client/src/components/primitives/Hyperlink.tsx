import { Link } from "react-router-dom";
import { ContainerProps } from "../../interfaces";

interface HyperlinkProps extends ContainerProps {
    to: string
}

const Hyperlink:React.FC<HyperlinkProps> = ({to, children, className}) => (
    <Link className={className} to={to}>{children}</Link>
)

export default Hyperlink;