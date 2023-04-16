import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const authUser = createAsyncThunk('/auth', async () => {
    return axios
        .get('/api/users/auth')
        .then(res => res.data)
        .catch(err => err);
});

export const loginUser = createAsyncThunk('/login', async ({email, password}) => {
    return axios
        .post('/api/users/login', {email, password})
        .then(res => res.data)
        .catch(error => error);
});

export const registerUser = createAsyncThunk('/register', async ({name, email, password}) => {
    return axios
        .post('/api/users/register', {name, email, password})
        .then(res => res.data)
        .catch(error => error);
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: '',
        users: [],
    },

    reducers: {},

    extraReducers: {
        // login
        [loginUser.pending]: state => {
            state.loading = true;
            state.error = '';
        },
        [loginUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = '';
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // register
        [registerUser.pending]: state => {
            state.loading = true;
            state.error = '';
        },
        [registerUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = '';
        },
        [registerUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // auth
        [authUser.pending]: state => {
            state.loading = true;
            state.users = '';
            state.error = '';
        },
        [authUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = '';
        },
        [authUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.users = '';
        },
    },
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
