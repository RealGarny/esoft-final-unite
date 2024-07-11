import CommunityCard from "./CommunityCard"
import { useState, useEffect } from "react"
import communityAPI from "../../http/communityAPI"

type CommunitiesList = {
    limit?:number
}

const CommunitiesList:React.FC<CommunitiesList> = (props) => {
    const [communities, setCommunities] = useState<any[]>([])

    useEffect(()=> {
        const getCommunities = async() =>{
            const result = await communityAPI.getCommunities(props.limit ? {limit:props.limit} : {});
            if(result) {setCommunities(result)}
        }
        getCommunities()
    }, [])

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
export default CommunitiesList;