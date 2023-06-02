import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const diaryUpdate = createAsyncThunk('/diary', async data => {
    return axios({
        method: 'post',
        url: '/api/diary/update',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    })
        .then(res => res.data)
        .catch(error => error);
});

export const diarySave = createAsyncThunk('/diary', async data => {
    return axios({
        method: 'post',
        url: '/api/diary/save',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    })
        .then(res => res.data)
        .catch(error => error);
});

export const diaryGet = createAsyncThunk('/diary', async data => {
    return axios({
        method: 'post',
        url: '/api/diary/getDiary',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    })
        .then(res => res.data)
        .catch(error => error);
});

export const diarySlice = createSlice({
    name: 'diary',
    initialState: {
        loading: false,
        error: '',
        message: [],
    },

    reducers: {},

    extraReducers: {
        [diaryUpdate.pending]: state => {
            state.loading = true;
            state.error = '';
        },
        [diaryUpdate.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = '';
            state.message = action.payload;
        },
        [diaryUpdate.rejected]: (state, action) => {
            state.loading = false;
            state.error = 'error';
        },
    },
});

export default diarySlice.reducer;
