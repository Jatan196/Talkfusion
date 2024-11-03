import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name:"socket",
    initialState:{
        socket:null
    },
    reducers:{
        setSocket:(state,action)=>{
            state.socket = action.payload;
        },
        reset: () => socketSlice.getInitialState(),
    }
});
export const {setSocket,reset}= socketSlice.actions;
export default socketSlice.reducer;