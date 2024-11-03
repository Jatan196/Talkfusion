import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
    name:"group",
    initialState:{
        groups:null,
        selectedGroup:null 
    },
    reducers:{
        setGroups:(state,action)=>{
            state.groups = action.payload;
        },
        setSelectedGroup:(state,action)=>{
            state.selectedGroup=action.payload;;
        },
        reset: () => groupSlice.getInitialState(),
    }
});
export const {setGroups,setSelectedGroup,reset}= groupSlice.actions;
export default groupSlice.reducer;