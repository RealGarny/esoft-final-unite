import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface StyleColors {
    primary:string,
    secondary:string,
    background:string,
    accent:string,
    text:string
}

export const GetCommunityColors = createAsyncThunk(
    'style/GetCommunityColors',
    async function() {
        //В будующем можно реализовать через API запрос
        // const response = await fetch(api_url);
        // const data = await response.json();
        // return data;
        console.log(window.location.href)
    }
)

const initialState:StyleColors = {
    primary: "",
    secondary: "",
    background: "",
    accent: "",
    text: ""
}

export const styleSlice = createSlice({
    name: 'style',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchFilms.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(fetchFilms.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state._initialFilms = action.payload;
            state.films = state._initialFilms;
        })
        builder.addCase(fetchFilms.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })
    }
})

export const {
    clearFilms
} = filmsSlice.actions;
export default filmsSlice.reducer;