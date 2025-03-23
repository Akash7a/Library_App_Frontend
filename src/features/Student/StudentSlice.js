import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_URL || "http://localhost:3000";

const initialState = {
    error: null,
    pending: false,
    success: false,
    message: null,
    students: null,
    enrolledStudents: 0,
    dueFees: 0,
    previousFeesCollection: 0,
    previousMonthForFee:"",
    singleStudent: null,
    studentWithFinishSubscription: [],
};

export const getStudents = createAsyncThunk("student/students", async (_, thunkApi) => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/student/getStudents`, { withCredentials: true });
        console.log("get students response", response.data);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data || "Invalid token");
    }
});

export const getSingleStudent = createAsyncThunk("student/singleStudent", async (studentId, thunkApi) => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/student/getOneStudentProfile/${studentId}`, { withCredentials: true });
        console.log("get single student response", response.data);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data || "Invalid token");
    }
});

export const addStudents = createAsyncThunk("student/addStudents", async (userData, thunkApi) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/student/addNewStudent`, userData, { withCredentials: true });
        console.log("adding student response", response.data);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data || "Invalid token");
    }
});

export const deleteStudent = createAsyncThunk("student/deleteStudent", async (studentId, thunkApi) => {
    try {
        const response = await axios.delete(`${API_URL}/api/v1/student/delete/${studentId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data || "Invalid token");
    }
});

export const updateStudent = createAsyncThunk("student/updateStudent", async ({ studentId, updateData }, thunkApi) => {
    try {
        const response = await axios.put(`${API_URL}/api/v1/student/update/${studentId}`, updateData, { withCredentials: true });
        console.log("update response", response.data)
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data || "Invalid token");
    }
});

export const getFeeCollection = createAsyncThunk(
    "student/feeCollection",
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/student/getFeesCollection`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("Error in getFeeCollection:", error);
            return thunkApi.rejectWithValue(error.response?.data || "Invalid token");
        }
    }
);

export const subscriptionAboutToFinishStudents = createAsyncThunk("student/subscriptionfinishCollection", async (_, thunkApi) => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/student/getAllEndSubscriptions`, {
            withCredentials: true,
        });
        console.log("student with end subscriptions", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in send messagents:", error);
        return thunkApi.rejectWithValue(error.response?.data || "Invalid token");
    }
});

export const sendWhatsappMessage = createAsyncThunk(
    'student/sendWhatsappMessage',
    async ({ number, message }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/v1/whatsapp/sendMessage`,
                { number, message },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

const studentSlice = createSlice({
    name: "student",
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
            .addCase(getStudents.pending, (state) => {
                state.pending = true;
                state.message = "Request in Progress";
            })
            .addCase(getStudents.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                state.success = true;
                state.message = action.payload.message;
                state.students = action.payload.myStudents || [];
                state.enrolledStudents = action.payload.totalStudents || 0;
                state.dueFees = action.payload.unpaidFeeStudents.length || 0;

            })
            .addCase(getStudents.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.message = "Failed to get students.";
            });

        builder
            .addCase(addStudents.pending, (state) => {
                state.pending = true;
                state.message = "Request in Progress";
            })
            .addCase(addStudents.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                state.success = true;
                state.message = action.payload?.message || "Student added successfully.";

                const newStudent = action.payload.student;
                state.students = [newStudent, ...state.students];
            })
            .addCase(addStudents.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.message = "Failed to add students.";
            });
        builder
            .addCase(deleteStudent.pending, (state) => {
                state.pending = true;
                state.message = "Deleting student...";
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                state.success = true;
                state.message = action.payload.message || "Student deleted successfully.";
                const studentId = action.payload.id;
                state.students = state.students.filter(student => student._id !== studentId);
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.message = "Failed to delete student.";
            });
        builder
            .addCase(updateStudent.pending, (state) => {
                state.pending = true;
                state.message = "Updating student...";
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                state.success = true;
                state.message = action.payload?.message || "Student updated successfully.";

                const updatedStudent = action.payload.student;
                state.students = state.students.map(student =>
                    student._id === updatedStudent._id ? updatedStudent : student
                );
            })
            .addCase(updateStudent.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.message = "Failed to update student.";
            });
        builder
            .addCase(getFeeCollection.pending, (state) => {
                state.pending = true;
                state.message = "Fetching fee collection...";
            })
            .addCase(getFeeCollection.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                state.success = true;
                state.message = "Fees Collection fetched successfully";
                state.previousFeesCollection = action.payload.previousMonthFeesCollected || 0;
                state.previousMonthForFee = action.payload.previousMonthName || "";
            })
            .addCase(getFeeCollection.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.previousFeesCollection = 0;
            });
        builder
            .addCase(getSingleStudent.pending, (state) => {
                state.pending = true;
                state.message = "Fetching student...";
            })
            .addCase(getSingleStudent.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                state.success = true;
                state.message = action.payload.message || "Student fetched successfully";
                state.singleStudent = action.payload?.student || null;
            })
            .addCase(getSingleStudent.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload?.message || "Failed to fetch student.";
                state.singleStudent = null;
            });
        builder
            .addCase(subscriptionAboutToFinishStudents.pending, (state) => {
                state.pending = true;
                state.message = "Getting students with end subscription...";
            })
            .addCase(subscriptionAboutToFinishStudents.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                state.success = true;
                state.studentWithFinishSubscription = action.payload?.students || [];
                state.message = action.payload?.message || "students fetched successfully!";
            })
            .addCase(subscriptionAboutToFinishStudents.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload;
                state.message = action.payload || "Failed to fetch students";
                state.studentWithFinishSubscription = [];
            });
        builder
            .addCase(sendWhatsappMessage.pending, (state) => {
                state.pending = true;
                state.message = "Sending Whatsapp message...";
            })
            .addCase(sendWhatsappMessage.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(sendWhatsappMessage.rejected, (state, action) => {
                state.pending = false;
                state.error = action.payload || "Failed to send whatsapp message";
                state.message = "Failed to send whatsapp message";
            });
    }
});

export const { clearError, clearSuccess } = studentSlice.actions;
export default studentSlice.reducer;