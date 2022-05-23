import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0, delta: 1 };

export const contadorSlice = createSlice({
    name: 'contador',
    initialState,
    reducers: {
        increment: (state) => { state.value += state.delta; },
        decrement: (state) => { state.value -= state.delta; },
        init: (state, action) => {
            state.value = action.payload.value;
            state.delta = action.payload.delta;
        },
    },
}); 

export const { increment, decrement, init } = contadorSlice.actions;

export const selectCount = (state) => state.cont.value;

export const initCount = (value, delta = 1) => (dispatch, getState) => {
    dispatch(init({ value, delta }));
};

export const defaultInitCount = () => (dispatch, getState) => {
    dispatch(init(initialState));
};

export default contadorSlice.reducer;
