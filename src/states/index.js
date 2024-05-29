import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import userReducer from './users/reducer';
import isPreloadReducer from './isPreload/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: userReducer,
    isPreload: isPreloadReducer,
  },
});

export default store;
