import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import roleReducer from '../features/role/roleSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        role: roleReducer,
    },
});
