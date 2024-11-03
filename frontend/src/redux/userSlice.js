import { createSlice } from "@reduxjs/toolkit";
// const initialState= { // dont do typo of initailState
//     username: "",
//     password: "",
// }
const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null,
        otherUsers: null,
        convoMappings: null,
        selectedUser: null,
        onlineUsers: null,

    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload; //what is reducer
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload; //what is reducer
        },
        setOtherUsersAndMappings: (state, action) => {
            state.otherUsers = action.payload.otherUsers;
            state.convoMappings = action.payload.convoMappings;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        updateConvoMapping: (state, action) => {
            const { userId, convoId } = action.payload;
            state.convoMappings[userId] = convoId;
        },
       
        reset: () => userSlice.getInitialState(),
    }

});
export const { setAuthUser, setOtherUsers,setOtherUsersAndMappings, setSelectedUser, setOnlineUsers, setBackgroundImage,updateConvoMapping,reset } = userSlice.actions;
export default userSlice.reducer;