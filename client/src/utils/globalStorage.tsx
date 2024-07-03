import { 
    createSlice as createS,
    CreateSliceOptions as CreateSliceO,
    createAsyncThunk as createAsyncT,
    configureStore as configureSt,
    ActionReducerMapBuilder as ActionReducerMapBuild,
    PayloadAction as PayloadA
} from "@reduxjs/toolkit"
import {
    Provider as Provide,
    useDispatch as useDisp,
    useSelector as useSelect
} from "react-redux"

type CreateSliceOptions = CreateSliceO;
export type ActionReducerMapBuilder<State> = ActionReducerMapBuild<State>;
export type PayloadAction<payload> = PayloadA<payload>;
type CreateAsyncThunkOptions = Parameters<typeof createAsyncT>
export type ConfigureStoreConfig = Parameters<typeof configureSt>
type Store = ReturnType<typeof configureStore>

export const createSlice = (options: CreateSliceOptions) => {
    return createS(options);
}

export const configureStore: typeof configureSt = (options) => {
    return configureSt(options);
}

export const createAsyncThunk = (
    typePrefix:CreateAsyncThunkOptions[0],
    PayloadCreator:CreateAsyncThunkOptions[1]
) => {
    return createAsyncT(typePrefix, PayloadCreator);
}

export const useDispatch = () => {
    return useDisp();
}

type UseSelectorParams = Parameters<typeof useSelect>
export const useSelector = (selector:UseSelectorParams[0]) => {
    return useSelect(selector);
}

interface ProviderProps {
    children: React.ReactNode,
    store: Store
}
export const Provider = ({children, store}:ProviderProps) => {
    return(
        <Provide store={store}>
            {children}
        </Provide>
    )
}