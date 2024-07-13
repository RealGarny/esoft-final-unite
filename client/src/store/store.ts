import { configureStore } from "../utils/globalStorage";
import user from './userSlice';
import community from './communitySlice';
import posts from './postsSlice';


export const store = configureStore({
    reducer: {
        user,
        community,
        posts
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;