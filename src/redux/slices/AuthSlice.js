import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import axiosInstance from '../../helper/AxiosInstance'

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    data: {}
}

export const createAccount = createAsyncThunk("auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("/user/signup", data);
        toast.dismiss()
        toast.promise(res, {
            loading: "Wait! Creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error) => {
                return error?.response?.data?.message
            },
        });
        return (await res).data
    } catch (error) {
        console.error(error.message)
    }
})

export const login = createAsyncThunk("auth/login", async (data) => {
    try {
        const res = axiosInstance.post("/user/login", data);
        toast.dismiss()
        toast.promise(res, {
            loading: "Loading...",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error) => {
                return error?.response?.data?.message
            },
        });
        return (await res).data
    } catch (error) {
        console.error(error.message)
    }
})

export const logout = createAsyncThunk("auth/logout", async () => {
    toast.dismiss()
    try {
        const res = axiosInstance.post("/user/logout");
        toast.promise(res, {
            loading: "Loging out...",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error) => {
                return error?.response?.data?.message
            },
        });
        return (await res).data
    } catch (error) {
        console.error(error.message)
    }
})

export const getProfile = createAsyncThunk("auth/profile", async () => {
    toast.dismiss()
    try {
        const res = axiosInstance.get("/user/profile");
        toast.promise(res, {
            loading: "Loading...",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error) => {
                return error?.response?.data?.message
            },
        });
        return (await res).data
    } catch (error) {
        console.error(error.message)
    }
})

export const updateProfile = createAsyncThunk("auth/updateProfile", async (data) => {
    toast.dismiss()
    try {
        const res = axiosInstance.patch("/user/update-profile", data);
        toast.promise(res, {
            loading: "Loading...",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error) => {
                return error?.response?.data?.message
            },
        });
        return (await res).data
    } catch (error) {
        console.error(error.message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.data = action?.payload?.data
            if (action?.payload?.data) {
                localStorage.setItem("isLoggedIn", true);
                state.isLoggedIn = true
            }
        })
        builder.addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false
        })
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.data = action?.payload?.data
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.data = action?.payload?.data
        })
    }
})

export default authSlice.reducer