import { Section } from "../primitives/Feed/Section";
import Splash from "../primitives/Splash";
import Text from "../primitives/Text";
import PostsFeed from "../primitives/Feed/PostsFeed";
import FeedSort from "../primitives/Navigation/FeedSort";
import { useSearchParams } from "../../utils/router";

const MainPage:React.FC = () => {
    return(
        <>
            <Splash/>
            <Section
                navigation={<FeedSort/>}
                feed={<MainPageFeed/>}
            />
        </>
    )
}

const MainPageFeed:React.FC = () => {
    const [params] = useSearchParams();
    console.log(params.get('new') !== null)

    return(
        <PostsFeed
            topComponents={<Text className="font-bold text-2xl">Recent Posts</Text>}
            params={{limit:15}}
        />
    )
}

export default MainPage;