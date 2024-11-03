import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        messages:null,
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages = action.payload;
        },
        reset: () => messageSlice.getInitialState(),
    }
});
export const {setMessages,reset} = messageSlice.actions;
export default messageSlice.reducer;