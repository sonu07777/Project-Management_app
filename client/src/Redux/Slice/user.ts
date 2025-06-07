import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance/authAxio";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Fetch all users
export const fetchUsers =createAsyncThunk ("/auth/allUser",async (token) => {
  try {
    console.log("Making API request with token:", token);
    const response = await axiosInstance.get("/api/users/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
});

// Update a user
interface UpdateUserArgs {
  userId: string;
  updatedData: Record<string, any>;
}

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, updatedData }: UpdateUserArgs, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { auth: { token: string } };
      const token = state.auth.token;

      const response = await API.put(`users/${userId}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("Update user error:", error.response?.data || error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { auth: { token: string } };
      const token = state.auth.token;

      await API.delete(`users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return userId; // return ID so it can be removed from state
    } catch (error: any) {
      console.error("Delete user error:", error.response?.data || error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
