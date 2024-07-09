import { createSlice, PayloadAction } from "../utils/globalStorage"

export interface CommunityState {
    id: number,
    name: string,
    followCount: number,
    followerNickname: string,
    createdAt: string,
    updatedAt: string,
    posts: any[]
}

const initialState:CommunityState = {
    id: 0,
    name: '',
    followCount: 0,
    followerNickname: '',
    createdAt: '',
    updatedAt: '',
    posts: []
}

const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers: {
        assignCommunity(state, action:PayloadAction<CommunityState>) {
            
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.followCount = action.payload.followCount;
            state.followerNickname = action.payload.followerNickname;
            state.createdAt = action.payload.createdAt;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
        },
        removeCommunity(state) {
            return initialState;
        },
        assignPosts(state, action:PayloadAction<CommunityState>) {
            state.posts = action.payload.posts;
        },
        addPost(state, action:PayloadAction<CommunityState>) {
            state.posts = [action.payload, ...state.posts];
        },
        removePost(state, action:PayloadAction<CommunityState>) {
            state.post.filter((item:any) => item.id === action.payload);
        }
    }
})

export const {
    assignCommunity,
    removeCommunity,
} = communitySlice.actions;
export default communitySlice.reducer;