import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance/authAxio.js";
import toast from "react-hot-toast";
// Removed import of LoginForm component, define LoginFormData type below if not already defined
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data") || "{}"),
};

export const registerUser = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("api/users/register", data);
    console.log(res);
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
// export const loginUser = createAsyncThunk("/auth/Login", async (form) => {
//   try {
//     const res = axiosInstance.post("api/users/login", form);
//     toast.promise(res, {
//       loading: "wain login on process",
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: "Failed to login",
//     });
//     return (await res).data;
//   } catch (error) {
//     console.log(error);
//   }
// });
 // adjust the path if needed

// Define the type for login form data
type LoginFormData = {
  email: string;
  password: string;
};

export const loginUser = createAsyncThunk(
  "/auth/Login",
  async (form: LoginFormData) => {
    try {
      const res = axiosInstance.post("api/users/login", form);
      toast.promise(res, {
        loading: "wait login on process",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to login",
      });
      return (await res).data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.post("/api/users/logout");
    // console.log("the response is :- ", res);
    // console.log("data is :- ",(await res).data);
    // console.log("message is :", (await res).data.message);

    toast.promise(res, {
      loading: "Wait! logout in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log out",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.res?.data?.message);
  }
});
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
const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const user = action?.payload; 
      // console.log(user);
        if (user) {
          localStorage.setItem("data", JSON.stringify(user));
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("role", user.role);
          state.data = user;
          state.isLoggedIn = true;
          state.role = user.role;
        } else {
          // Clear invalid login artifacts if any
          localStorage.removeItem("data");
          localStorage.setItem("isLoggedIn", "false");
          localStorage.removeItem("role");
          state.data = {};
          state.isLoggedIn = false;
          state.role = "";
        }
    })
    .addCase(logout.fulfilled, (state) => {
        // console.log(state);
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
  },
});
export default authSlice.reducer;
