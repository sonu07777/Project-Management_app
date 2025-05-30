import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance/authAxio.js";
import toast from "react-hot-toast";
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data") || "{}"),
};

export const registerUser = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("api/users/register", data);
    toast.promise(res, {
      loading: "wait creating account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to login",
    });
    return (await res).data;
  } catch (error) {
    console.log(error);
  }
});
export const loginUser = createAsyncThunk("/auth/Login", async (data) => {
  try {
    const res = axiosInstance.post("api/users/login", data);
    toast.promise(res, {
      loading: "wait creating account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to signup",
    });
    return (await res).data;
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {},
  extraReducers: () => {},
});
export default authSlice.reducer;
