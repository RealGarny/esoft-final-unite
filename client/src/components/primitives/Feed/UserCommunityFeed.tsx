import CommunitiesList from "../CommunitiesList"
import Flexbox from "../Flexbox"

const UserCommunityFeed = () => {
    return(
        <Flexbox className="flex-col">
            <CommunitiesList
                type={"horizontal"}
            />
        </Flexbox>
    )
}

export default UserCommunityFeed;