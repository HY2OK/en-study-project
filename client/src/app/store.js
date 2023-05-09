import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import roleReducer from '../features/role/roleSlice';
import wordReducer from '../features/word/wordSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        role: roleReducer,
        word: wordReducer,
    },
});
