import WithAuthReq from "../primitives/withAuthReq";
import Button from "../primitives/Button";
import FadeContainer from "../primitives/FadeContainer";
import Flexbox from "../primitives/Flexbox";
import Text from "../primitives/Text";
import FeedSection from "../primitives/Feed/FeedSection";

const Community = () => {
    const fetchedCommunity = {
        id: 0,
        name: 'Source',
        bgUrl: '',
        iconUrl: '',
        description: 'a test description',
        followCount: 123,
        followerNickname: 'braindeads'
    }
    return(
        <div>
            <FadeContainer
                fadeColor="from-secondary"
                className="bg-accent h-72 mt-[-64px] flex justify-center items-end" //TODO: figure out how to save myself from addign mt manually for every header
                fadeSize="h-20"
            >
                <Flexbox className="p-8 w-full h-fit max-w-[1212px] z-10 flex-col">
                    <Flexbox className="items-end">
                        <Text className="font-bold text-5xl">
                            {fetchedCommunity.name}
                        </Text>
                    </Flexbox>
                    <Flexbox className="font-bold items-center">
                        <Text>{fetchedCommunity.followCount}</Text>
                        <Text className=" opacity-80">{fetchedCommunity.followerNickname}</Text>
                        <WithAuthReq render={(path) => (
                            <Button href={path} className="font-bold h-8 text-sm" padding={"md"}>Join</Button>
                        )}/>
                    </Flexbox>
                </Flexbox>
            </FadeContainer>
            <FeedSection></FeedSection>
        </div>
    )
}

export default Community;