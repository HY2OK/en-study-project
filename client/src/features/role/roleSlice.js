import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const roleChat = createAsyncThunk('/role', async data => {
    return axios({
        method: 'post',
        url: '/api/role/chat',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    })
        .then(res => res.data)
        .catch(error => error);
});

export const roleSlice = createSlice({
    name: 'role',
    initialState: {
        loading: false,
        error: '',
        message: [],
    },

    reducers: {},

    extraReducers: {
        [roleChat.pending]: state => {
            state.loading = true;
            state.error = '';
        },
        [roleChat.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = '';
            state.message = action.payload;
        },
        [roleChat.rejected]: (state, action) => {
            state.loading = false;
            state.error = 'error';
        },
    },
});

export default roleSlice.reducer;
