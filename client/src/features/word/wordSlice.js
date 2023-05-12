import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const wordQuiz = createAsyncThunk('/word', async data => {
    return axios({
        method: 'post',
        url: '/api/word/quiz',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    })
        .then(res => res.data)
        .catch(error => error);
});

export const uploadFiveWords = createAsyncThunk('/word', async data => {
    return axios({
        method: 'post',
        url: '/api/word/uploadFiveWords',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    })
        .then(res => res.data)
        .catch(error => error);
});

export const getFiveWords = createAsyncThunk('/word', async data => {
    return axios({
        method: 'post',
        url: '/api/word/getFiveWords',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    })
        .then(res => {
            return res.data.result;
        })
        .catch(error => error);
});

export const uploadWord = createAsyncThunk('/word', async data => {
    return axios({
        method: 'post',
        url: '/api/word/uploadWord',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    }).then((res, err) => {
        if (res.status === 201) return res.status;
        return res.data;
    });
});

export const getWord = createAsyncThunk('/word', async data => {
    return axios({
        method: 'post',
        url: '/api/word/getWord',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    })
        .then(res => res.data)
        .catch(error => error);
});

export const delWord = createAsyncThunk('/word', async data => {
    return axios({
        method: 'post',
        url: '/api/word/delWord',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    })
        .then(res => res.data)
        .catch(error => error);
});

export const wordSlice = createSlice({
    name: 'word',
    initialState: {
        loading: true,
        error: '',
        message: [],
    },

    reducers: {},

    extraReducers: {
        [wordQuiz.pending]: state => {
            state.loading = true;
            state.error = '';
        },
        [wordQuiz.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = '';
            state.message = action.payload;
        },
        [wordQuiz.rejected]: (state, action) => {
            state.loading = false;
            state.error = 'error';
        },
        [getFiveWords.pending]: state => {
            state.loading = true;
            state.error = '';
        },
        [getFiveWords.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = '';
            state.message = action.payload;
        },
        [getFiveWords.rejected]: (state, action) => {
            state.loading = false;
            state.error = 'error';
        },
        [uploadWord.pending]: state => {
            state.loading = true;
            state.error = '';
        },
        [uploadWord.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = '';
            state.message = action.payload;
        },
        [uploadWord.rejected]: (state, action) => {
            state.loading = false;
            state.error = 'error';
        },
        [getWord.pending]: state => {
            state.loading = true;
            state.error = '';
        },
        [getWord.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = '';
            state.message = action.payload;
        },
        [getWord.rejected]: (state, action) => {
            state.loading = false;
            state.error = 'error';
        },
        [delWord.pending]: state => {
            state.loading = true;
            state.error = '';
        },
        [delWord.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = '';
            state.message = action.payload;
        },
        [delWord.rejected]: (state, action) => {
            state.loading = false;
            state.error = 'error';
        },
    },
});

export default wordSlice.reducer;
