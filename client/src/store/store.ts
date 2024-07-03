import { configureStore } from "../utils/globalStorage";
import user from './userSlice';


export const store = configureStore({
    reducer: {
        user
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;