import Card from "../primitives/Card";
import { Section } from "../primitives/Feed/Section";
import Splash from "../primitives/Splash";
import Text from "../primitives/Text";
import PostsFeed from "../primitives/Feed/PostsFeed";

const MainPage:React.FC = () => {
    return(
        <>
            <Splash/>
            <Section
                feed={<MainPageFeed/>}
                info={
                    <Card>
                        <Text>Welcome to Unite!</Text>
                    </Card>
                }
            />
        </>
    )
}

const MainPageFeed:React.FC = () => {
    return(
        <PostsFeed
            topComponents={<Text className="font-bold text-2xl">Recent Posts</Text>}
            params={{limit:15}}
        />
    )
}

export default MainPage;