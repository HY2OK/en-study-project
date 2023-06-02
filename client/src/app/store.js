import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import roleReducer from '../features/role/roleSlice';
import wordReducer from '../features/word/wordSlice';
import diaryReducer from '../features/diary/diarySlice';

export default configureStore({
    reducer: {
        user: userReducer,
        role: roleReducer,
        word: wordReducer,
        diary: diaryReducer,
    },
});
