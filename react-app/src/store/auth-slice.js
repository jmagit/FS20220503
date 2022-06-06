import { createSlice } from '@reduxjs/toolkit';

const initialState = { isAuth: false, authToken: '', name: '', roles: [] };

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => { 
            state.isAuth = true
            state.authToken= action.payload.authToken
            state.name= action.payload.name
            state.roles= action.payload.roles
         },
        logout: (state, action) => { 
            state.isAuth = false
            state.authToken= ''
            state.name= ''
            state.roles= []
        },
    },
}); 

export const { login, logout } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuth;
export const selectIsInRole = role => (state) => state.auth.roles.includes(role);

export default authSlice.reducer;
