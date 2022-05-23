import { configureStore } from '@reduxjs/toolkit';
import { contadorReducer } from './my-store';
import newContadorReducer from './contador-slice'

export default configureStore({
    reducer: {
      contador: contadorReducer,
      cont: newContadorReducer,
    },
  });
