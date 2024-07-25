import Button from "../primitives/Button";
import FadeContainer from "../primitives/FadeContainer";
import Flexbox from "../primitives/Flexbox";
import Text from "../primitives/Text";
import { useLocation } from "../../utils/router";
import NotFound from "./NotFound";
import CrossIcon from "../icons/CrossIcon";
import useCommunity from "../../context/CommunityContext";
import Section from "../primitives/Feed/Section";
import CreatePostForm from "../primitives/CreatePostForm";
import CommunityInfo from "../primitives/Feed/CommunityInfo";
import CommunityActionBtn from "../primitives/Buttons/CommunityActionBtn";
import PostsFeed from "../primitives/Feed/PostsFeed";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import WithAuthReq from "../primitives/withAuthReq";
import Dialog from "../primitives/Dialog/Dialog";
import { FormConfig } from "../primitives/Form/Form";
import Form from "../primitives/Form/Form";

const Community = () => {

    const location = useLocation();
    const {community} = useCommunity();

    if(!community.id) {
        return(
            <NotFound
                pageUrl={location.pathname}
            />
        )
    }

    return(
        <>
            <FadeContainer
                fadeColor="from-secondary"
                className={`bg-additional h-72 mt-[-64px] flex justify-center items-end`}
                fadeSize="h-52"
            >
                <div className={`min-h-full min-w-full absolute-centered`} style={{backgroundImage:`url(${community.background})`}}></div>
                <Flexbox className="p-8 w-full h-fit max-w-[1212px] z-10 flex-col gap-3">
                    <Flexbox className="items-end">
                        <Text className="font-bold text-5xl">
                            {community.name}
                        </Text>
                    </Flexbox>
                    <Flexbox className="font-bold items-center">
                        <Text>{community.followCount}</Text>
                        <Text className=" opacity-80">{community.followerNickname}</Text>
                        <CommunityActionBtn
                            params = {{
                                name: community.name,
                                creator: community.creator,
                                communityId: community.id,
                                isFollowed: community.isFollowed
                            }}
                        />
                    </Flexbox>
                </Flexbox>
            </FadeContainer>
            <Section
                feed={
                    <PostsFeed
                        params={{limit:15}}
                        topComponents={<CreatePostForm/>}
                    />
                }
                info={<CommunityInfo description={community.description}/>}
            />
            <CreatePostDialog/>
        </>
    )
}

const CreatePostDialog = () => {
    const [isShownPostForm, setIsShownPostForm] = useState(false);
    const [isError, setIsError] = useState(false);
    const [formMessage, setFormMessage] = useState("");
    const {user} = useContext(AuthContext);
    const {createPost} = useCommunity()

    const config:FormConfig = {
        onSubmit: async(e, {values, errors}) => {
            e.preventDefault();
            let error;
            setIsError(()=>{
                error = false;
                return error;
            })
            for(let key in errors) {
                if(errors[key]) {
                    setIsError(()=>{
                        error = true;
                        return error;
                    });
                    break;
                }
            }
            if(isError) {
                return
            }

            try{
                createPost(user.id, values.postText);
            } catch(e) {
                setFormMessage(e);
            }
        },
        inputs: [
            {
                label: 'Post Content',
                name: "postText",
                type: "textarea",
                isError:(value) => value.postText.length >= 500,
                errorMessage: "post cannot be more than 500 characters long."
            },
        ]
    }
    
    return(
        <>
            <WithAuthReq
                render={(path) => (
                    <Button href={path} onClick={()=>setIsShownPostForm(true)} className="fixed right-6 bottom-7 p-7 bg-accent-500 hover:bg-accent-500 shadow-md">
                        <CrossIcon className="absolute stroke-white h-7 rotate-45"></CrossIcon>
                    </Button>
                )}
            />
            <Dialog
                isOpen={isShownPostForm}
                onClose={()=>setIsShownPostForm(false)}
            >
                <Text className="text-2xl text-center font-bold">Create Post</Text>
                {isError && <p>{formMessage}</p>}
                <Form
                    config={config}
                    formAction={(params:any)=><Button onClick={params.onClick}>create post</Button>}
                />
            </Dialog>
        </>
    )
}

export default Community;