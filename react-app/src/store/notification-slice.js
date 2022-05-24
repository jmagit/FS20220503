import { createSlice } from '@reduxjs/toolkit';

const initialState = { listado: [], hayNotificaciones: false };

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        add: (state, action) => { 
            state.listado = [...state.listado, action.payload];
            state.hayNotificaciones = true;
        },
        remove: (state, action) => { 
            state.listado = state.listado.filter((item, index) => index !== action.payload);
            state.hayNotificaciones = state.listado.length > 0;
        },
        clear: (state) => { 
            state.listado = [];
            state.hayNotificaciones = false;
        }
    },
}); 

export const { add, remove, clear } = notificationSlice.actions;

export const selectListado = (state) => state.notification.listado;
export const selectHayNotificaciones = (state) => state.notification.hayNotificaciones;

export default notificationSlice.reducer;
