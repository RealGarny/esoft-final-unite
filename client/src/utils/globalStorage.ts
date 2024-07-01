import { 
    createSlice as createS,
    CreateSliceOptions as CreateSliceO,
    createAsyncThunk as createAsyncTh
} from "@reduxjs/toolkit"

type CreateSliceOptions = CreateSliceO;
type createAsyncThunkOptions = Parameters<typeof createAsyncTh>


export const createSlice = (options: CreateSliceOptions) => {
    return createS(options);
}

export const createAsyncThunk = (
    typePrefix:createAsyncThunkOptions[0],
    PayloadCreator:createAsyncThunkOptions[1]
) => {
    return createAsyncTh(typePrefix, PayloadCreator);
}