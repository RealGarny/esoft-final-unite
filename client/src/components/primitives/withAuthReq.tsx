import routes from "../../routes/routes";

const isUserLogged = () => {
    return false;
}

type props = {
    render: (href:string) => React.ReactElement
}

const WithAuthReq = (props:props) => {
    const path = isUserLogged() ? "" : routes.signIn();

    return (
        <>
            {props.render(path)}
        </>
    )
}

export default WithAuthReq;