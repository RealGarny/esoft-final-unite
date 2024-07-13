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
            const result = await communityAPI.getCommunities({});
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
                <MappedCommunities
                    communities={communities}
                />
            </div>
        </Flexbox>
    )
}

const MappedCommunities = ({communities}:{communities:any[]}) => {

    if(!Array.isArray(communities) || communities.length < 1) return null;

    const components = [];
    const oneDay = new Date().getTime() + (1 * 24 * 60 * 60 * 1000)

    for(let i = 0; i < communities.length; i++) {
        let tags = communities[i].tags ? communities[i].tags : [];

       if(Date.now() - new Date(communities[i].createdAt) < oneDay) {
            tags.push("NEW!")
       }
        components.push(
            <CommunityCard
                key={communities[i].name? communities[i].name : i}
                {...communities[i]}
                tags={tags}
            />
        )
    }

    return components;
}

export default Communities;