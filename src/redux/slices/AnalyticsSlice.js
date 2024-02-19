import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import axiosInstance from '../../helper/AxiosInstance'

const initialState = {
    backlog: {},
    todo: {},
    progress: {},
    done: {},
    low: 0,
    high: 0,
    moderate: 0,
    dueTask: 0
}

export const getBacklogTask = createAsyncThunk("task/backlog", async () => {
    try {
        const response = await axiosInstance.get("/task/status/backlog")
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const getTodoTask = createAsyncThunk("task/todo", async () => {
    try {
        const response = await axiosInstance.get("/task/status/todo")
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const getProgressTask = createAsyncThunk("task/progress", async () => {
    try {
        const response = await axiosInstance.get("/task/status/progress")
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const getDoneTask = createAsyncThunk("task/done", async () => {
    try {
        const response = await axiosInstance.get("/task/status/done")
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const getHighPriority = createAsyncThunk("task/priority/high", async () => {
    try {
        const response = await axiosInstance.get("/task/priority/high")
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const getLowPriority = createAsyncThunk("task/priority/low", async () => {
    try {
        const response = await axiosInstance.get("/task/priority/low")
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const getModeratePriority = createAsyncThunk("task/priority/moderate", async () => {
    try {
        const response = await axiosInstance.get("/task/priority/moderate")
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const getDueTask = createAsyncThunk("task/due", async () => {
    try {
        const response = await axiosInstance.get("/task/all/dueTasks")
        return response.data
    } catch (error) {
        console.log(error);
    }
})

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBacklogTask.fulfilled, (state, action) => {
                state.backlog = action.payload.data;
            })
            .addCase(getTodoTask.fulfilled, (state, action) => {
                state.todo = action.payload.data;
            })
            .addCase(getProgressTask.fulfilled, (state, action) => {
                state.progress = action.payload.data;
            })
            .addCase(getDoneTask.fulfilled, (state, action) => {
                state.done = action.payload.data;
            })
            .addCase(getHighPriority.fulfilled, (state, action) => {
                state.high = action.payload.data.totalTask;
            })
            .addCase(getLowPriority.fulfilled, (state, action) => {
                state.low = action.payload.data.totalTask;
            })
            .addCase(getModeratePriority.fulfilled, (state, action) => {
                state.moderate = action.payload.data.totalTask;
            })
            .addCase(getDueTask.fulfilled, (state, action) => {
                state.dueTask = action.payload.data.overdueTasks;
            })
    }
})

export default analyticsSlice.reducer