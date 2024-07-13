import { createSlice, PayloadAction } from "../utils/globalStorage"

export interface postsState {
    posts: any[] | null
}

const initialState:postsState = {
    posts: null
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        assignPosts(state, action:PayloadAction<postsState>) {
            state.posts = action.payload;
        },
        addPost(state, action:PayloadAction<postsState>) {
            state.posts = [action.payload, ...state.posts];
        },
        removePost(state, action:PayloadAction<postsState>) {
            state.post.filter((item:any) => item.id === action.payload);
        },
        clearPosts(state) {
            state.posts = initialState.posts;
        },
    }
})

export const {
    assignPosts,
    clearPosts,
    addPost,
    removePost
} = postsSlice.actions;
export default postsSlice.reducer;