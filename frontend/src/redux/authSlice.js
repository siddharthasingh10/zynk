import { createSlice } from "@reduxjs/toolkit";   

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,// this is for logged in user
        suggestedUsers: [],
        userProfile:null, // user whose profile is getting accessed
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        setSuggestedUsers: (state, action) => {
            state.suggestedUsers = action.payload; 
        },
        setUserProfile:(state,action)=>{
            state.userProfile=action.payload
        }
    }
});

export const { setAuthUser, setSuggestedUsers,setUserProfile } = authSlice.actions;
export default authSlice.reducer;
