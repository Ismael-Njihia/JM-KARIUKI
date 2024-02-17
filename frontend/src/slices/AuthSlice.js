import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    user: null,
 status: 'idle',
 error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials: (state, action) =>{
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state, action)=>{
            localStorage.removeItem('userInfo');
            state.user = null;
            state.userInfo = null;
        }
    }
})

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;