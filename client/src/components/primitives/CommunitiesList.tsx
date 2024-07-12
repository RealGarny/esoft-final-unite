import CommunityCard from "./CommunityCard"
import { useState, useEffect } from "react"
import communityAPI from "../../http/communityAPI"

type CommunitiesList = {
    params: any,
    limit?:number,
    render?:(props:any) => React.ReactElement
}

const defaultParams = {
    limit: 100,
}

const CommunitiesList:React.FC<CommunitiesList> = ({params=defaultParams, render, ...args}) => {
    const [communities, setCommunities] = useState<any[]>([])

    useEffect(()=> {
        const getCommunities = async() =>{
            const result = await communityAPI.getCommunities(params);
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
       if(!render) {
            components.push(
                <CommunityCard
                    {...args}
                    key={communities[i].name? communities[i].name : i}
                    {...communities[i]}
                    tags={tags}
                />
            )
        } else {
            components.push(render({...communities[i], ...args, tags, }))
        }
    }

    return components;
}
export default CommunitiesList;