import { createSlice, PayloadAction } from "../utils/globalStorage"

export interface CommunityState {
    id: number | null,
    name: string,
    creator: number | null,
    description: string
    followCount: number,
    followerNickname: string,
    createdAt: string,
    updatedAt: string,
    isFollowed: boolean | undefined;
}

const initialState:CommunityState = {
    id: null,
    creator: null,
    name: '',
    description: '',
    followCount: 0,
    followerNickname: '',
    createdAt: '',
    updatedAt: '',
    isFollowed: undefined,
}

const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers: {
        assignCommunity(state, action:PayloadAction<CommunityState>) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.creator = action.payload.creator;
            state.followCount = action.payload.followCount;
            state.description = action.payload.description;
            state.followerNickname = action.payload.followerNickname;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
            state.isFollowed= action.payload.isFollowed;
        },
        removeCommunity(state) {
            state.id = null;
            state.name = '';
            state.creator = null;
            state.followCount = '';
            state.description = '';
            state.followerNickname = '';
            state.createdAt = '';
            state.createdAt = '';
            state.updatedAt = '';
            state.isFollowed= undefined;
        },
        updateCommunity(state, action:PayloadAction<CommunityState>) {
            for(let[key,value] of Object.entries(action.payload)) {
                state[key] = value;
            }
        },
    }
})

export const {
    assignCommunity,
    removeCommunity,
    updateCommunity
} = communitySlice.actions;
export default communitySlice.reducer;