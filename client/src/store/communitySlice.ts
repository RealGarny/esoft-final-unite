import { createSlice, PayloadAction } from "../utils/globalStorage"

export interface CommunityState {
    community: {
        id: number | null,
        name: string,
        creator: number | null,
        description: string
        followCount: number,
        followerNickname: string,
        createdAt: string,
        updatedAt: string,
    },
    posts: any[]
}

const initialState:CommunityState = {
    community: {
        id: null,
        creator: null,
        name: '',
        description: '',
        followCount: 0,
        followerNickname: '',
        createdAt: '',
        updatedAt: '',
    },
    posts: []
}

const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers: {
        assignCommunity(state, action:PayloadAction<CommunityState['community']>) {
            state.community.id = action.payload.id;
            state.community.name = action.payload.name;
            state.community.creator = action.payload.creator;
            state.community.followCount = action.payload.followCount;
            state.community.description = action.payload.description;
            state.community.followerNickname = action.payload.followerNickname;
            state.community.createdAt = action.payload.createdAt;
            state.community.createdAt = action.payload.createdAt;
            state.community.updatedAt = action.payload.updatedAt;
        },
        removeCommunity(state) {
            state.community = initialState.community;
        },
        assignPosts(state, action:PayloadAction<CommunityState>) {
            state.posts = action.payload.posts;
        },
        addPost(state, action:PayloadAction<CommunityState>) {
            state.posts = [action.payload, ...state.posts];
        },
        removePost(state, action:PayloadAction<CommunityState>) {
            state.post.filter((item:any) => item.id === action.payload);
        },
        clearPosts(state) {
            state.posts = initialState.posts;
        },
    }
})

export const {
    assignCommunity,
    removeCommunity,
    assignPosts,
    clearPosts,
    addPost,
    removePost
} = communitySlice.actions;
export default communitySlice.reducer;