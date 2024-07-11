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
            state.id = null
            state.login = ''
            state.displayedName = ''
            state.email = ''
            state.globalRole = null
            state.createdAt = ''
            state.updatedAt = ''
        },
        updateUser(state, action:PayloadAction<UserState>) {
            for(let[key,value] of Object.entries(action.payload)) {
                state[key] = value;
            }
        }
    }
})

export const {
    assignUser,
    removeUser,
    updateUser
} = userSlice.actions;
export default userSlice.reducer;