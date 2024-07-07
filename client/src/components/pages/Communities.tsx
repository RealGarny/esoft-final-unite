import Text from "../primitives/Text";
import Flexbox from "../primitives/Flexbox"
import CreateCommunity from "../primitives/CreateCommunity";
import CommunityCard from "../primitives/CommunityCard";
import { useEffect, useState } from "react";
import communityAPI from "../../http/communityAPI";

const Communities = () => {

    const [communities, setCommunities] = useState<any[]>([])

    useEffect(()=> {
        const getCommunities = async() =>{
            const result = await communityAPI.getCommunities();
            if(result) {setCommunities(result)}
        }
        getCommunities()
    }, [])

    return(
        <Flexbox className="flex-col">
            <Flexbox className="p-4 flex-col w-full bg-secondary items-center justify-center self-center">
                <Text className="font-bold text-2xl text-center">Cannot find community you're looking for?</Text>
                <CreateCommunity/>
            </Flexbox>
            <div className="grid grid-cols-3 self-center gap-2 max-w-container mb-4">
                {communities.map((community) => (
                    <CommunityCard
                        {...community}
                    />
                ))}
            </div>
        </Flexbox>
    )
}

export default Communities;