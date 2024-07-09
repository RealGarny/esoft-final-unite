import { configureStore } from "../utils/globalStorage";
import user from './userSlice';
import community from './communitySlice';


export const store = configureStore({
    reducer: {
        user,
        community
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;