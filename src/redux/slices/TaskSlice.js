import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axiosInstance from '../../helper/AxiosInstance'

const initialState = {
    tasks: []
}

export const getTimeFrameTask = createAsyncThunk("task/get", async (timeFrame) => {
    try {
        const response = await axiosInstance.get(`/task/sort?timeFrame=${timeFrame}`)
        return response.data
    } catch (error) {
        console.error(error.message)
    }
})

export const markChecklist = createAsyncThunk("task/toggle", async (data) => {
    try {
        const response = await axiosInstance.patch(`/task/toggleCheck/${data?.taskId}/${data?.checklistId}`, data)
        return response.data
    } catch (error) {
        console.error(error.message)
    }
})

export const changeTaskStatus = createAsyncThunk("task/change-status", async (data) => {
    try {
        const response = await axiosInstance.patch(`/task/change-status/${data?.taskId}`, data)
        return response.data
    } catch (error) {
        console.error(error.message)
    }
})

export const deleteTask = createAsyncThunk("task/delete-task", async (data) => {
    try {
        const response = await axiosInstance.delete(`/task/deleteTask/${data}`)
        return response.data
    } catch (error) {
        console.error(error.message)
    }
})


const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTimeFrameTask.fulfilled, (state, action) => {
            if (action?.payload?.data) {
                state.tasks = action?.payload?.data
            }
        })
    }
})

export default taskSlice.reducer