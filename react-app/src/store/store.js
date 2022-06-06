import { configureStore } from '@reduxjs/toolkit';
import { contadorReducer } from './my-store';
import newContadorReducer from './contador-slice'
import notificationReducer, { add, remove, clear } from './notification-slice'
import authSlice from './auth-slice';

const store = configureStore({
    reducer: {
      contador: contadorReducer,
      cont: newContadorReducer,
      notification: notificationReducer,
      auth: authSlice
    },
  });

store.AddNotify = data => store.dispatch(add(data));
store.AddErrNotify = error => {
  let msg = error;
  if (error.response) {
    msg = `${error.response.status} ${error.response.statusText}: ${error.message}`;
  } else if (error.request || error.message) {
    msg = error.message;
  }
  store.AddNotify("ERROR: " + msg);
};
store.DeleteNotify = index => store.dispatch(remove(index));
store.ClearNotify = () => store.dispatch(clear());

export default store