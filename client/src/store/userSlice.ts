import { createAsyncThunk, createSlice, PayloadAction } from "../utils/globalStorage"

export interface UserState {
    id: number,
    login: string,
    displayedName: string,
    email: string,
    globalRole: number,
    createdAt: string,
    updatedAt: string
}

const initialState:UserState = {
    id: 0,
    login: '',
    displayedName: '',
    email: '',
    globalRole: 0,
    createdAt: '',
    updatedAt: '',
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        assignUser(state, action:PayloadAction<UserState>) {
            if(
                !action.payload.id ||
                !action.payload.login ||
                !action.payload.displayedName ||
                !action.payload.email ||
                !action.payload.globalRole ||
                !action.payload.createdAt ||
                !action.payload.updatedAt
            ) return
            
            state.id = action.payload.id;
            state.login = action.payload.login;
            state.displayedName = action.payload.displayedName;
            state.email = action.payload.email;
            state.globalRole = action.payload.globalRole;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
        },
        removeUser(state) {
            state.id = 0;
            state.login = '';
            state.displayedName = '';
            state.email = '';
            state.globalRole = 0;
            state.createdAt = '';
            state.updatedAt = '';
        }
    }
})

export const {
    assignUser,
    removeUser
} = userSlice.actions;
export default userSlice.reducer;