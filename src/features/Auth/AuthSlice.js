import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = import.meta.VITE_API_URL || "https://library-app-backend-rl3l.onrender.com";

const initialState = {
    admin: localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : null,
    error: null,
    pending: false,
    success: false,
    message: null,
    token: localStorage.getItem("token") || null,
};

export const registeAdmin = createAsyncThunk(
    "auth/register",
    async (userData, thunkApi) => {
        try {
            const response = await axios.post(`${API_URL}/api/v1/admin/register`, userData, { withCredentials: true });
            return response.data;
        } catch (error) {
            const isValidationError = error.response?.status === 400;
            return thunkApi.rejectWithValue(
                isValidationError ? "Invalid input data" : "Something went wrong"
            );
        }
    }
);

export const loginAdmin = createAsyncThunk("auth/login", async (userData, thunkApi) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/admin/login`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("🔥 Login API Error:", error.response?.data || error.message); // Log the error
        return thunkApi.rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
});

export const logoutAdmin = createAsyncThunk("auth/logout", async (_, thunkApi) => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/admin/logout`, {
            withCredentials: true, headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    } catch (error) {
        const isValidationError = error.response?.status === 400;
        return thunkApi.rejectWithValue(
            isValidationError ? "Invalid input data" : "Something went wrong"
        );
    }
});

export const loadAdminFromToken = createAsyncThunk("auth/load", async (_, thunkApi) => {
    const token = localStorage.getItem("token");

    if (!token) return thunkApi.rejectWithValue("No token found");

    try {
        const response = await axios.get(`${API_URL}/api/v1/admin/getProfile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data || "Invalid token");
    }
});


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registeAdmin.pending, (state) => {
                state.pending = true;
                state.error = null;
                state.message = "Request in progress";
            })
            .addCase(registeAdmin.fulfilled, (state, action) => {
                state.pending = false;
                state.success = true;
                state.admin = action.payload.admin;
                state.message = action.payload.message || "Admin registered successfully";
                state.token = action.payload.token || null;

                if (action.payload.token) {
                    localStorage.setItem("token", action.payload.token);
                }
            })
            .addCase(registeAdmin.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.message = "Registration failed";
            });
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.pending = true;
                state.message = "Request in Progress"
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                state.success = true;
                state.message = action.payload.message;
                state.admin = action.payload.admin;
                state.token = action.payload.token || null;

                if (action.payload.token) {
                    localStorage.setItem("token", action.payload.token);
                }
                if (action.payload.admin) {
                    localStorage.setItem("admin", JSON.stringify(action.payload.admin));
                }
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.message = "Registration failed";
            });
        builder
            .addCase(logoutAdmin.pending, (state) => {
                state.pending = true;
                state.message = "Request in Progress"
            })
            .addCase(logoutAdmin.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                state.message = action.payload;
                state.token = null;
                state.admin = null;
                localStorage.removeItem("token");
                localStorage.removeItem("admin");
            })
            .addCase(logoutAdmin.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.message = "Logout failed.";
            });
        builder
            .addCase(loadAdminFromToken.pending, (state) => {
                state.pending = true;
                state.message = "Loading admin data...";
            })
            .addCase(loadAdminFromToken.fulfilled, (state, action) => {
                state.pending = false;
                state.success = true;
                state.admin = action.payload.admin;
                state.token = localStorage.getItem("token");
                state.message = "Admin loaded successfully";
                
                if (action.payload.admin) { 
                    localStorage.setItem("admin", JSON.stringify(action.payload.admin));
                }
            })
            .addCase(loadAdminFromToken.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.message = "Failed to load admin data.";
                if (action.payload === "Invalid token") {
                    state.token = null;
                    state.admin = null;
                    localStorage.removeItem("token");
                }
            });
    },
});

export const { clearError, clearSuccess } = authSlice.actions;
export default authSlice.reducer;
