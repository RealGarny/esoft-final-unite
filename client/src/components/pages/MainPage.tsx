
const MainPage:React.FC = () => {
    const test:React.ReactNode[] = [];
    for(let i = 0; i <= 100; i++) {
        test.push(<div>Hallo</div>)
    }
    return(
        test
    )
}

export default MainPage;