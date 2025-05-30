import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance/authAxio.js";
import toast from "react-hot-toast";

interface ProjectState {
  loading: boolean;
  error: string | null;
  projects: any[]; // Replace `any` with your project type if available
  success: boolean;
}

const initialState: ProjectState = {
  loading: false,
  error: null,
  projects: [],
  success: false,
};

// export const createProject = createAsyncThunk(
//   "/project/createProject",
//   async (projectData, token) => {
//     console.log(projectData,"the token is ",token)
//     try {
//       const resPromise = axiosInstance.post("/api/projects", projectData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       console.log(resPromise);
//       const res = await toast.promise(resPromise, {
//         loading: "wait creating account",
//         success: (data) => {
//           return data?.data?.message;
//         },
//         error: "Failed to login",
//       });
//       console.log(res)
//       return (await resPromise).data;
//     } catch (error) {
//       console.error("Error creating project:", error);
//       throw error;
//     }
//   }
// );
export const createProject = createAsyncThunk(
  "/project/createProject",
  async (projectData, thunkAPI) => {
    const state = thunkAPI.getState() as { auth: { token: string } };
    console.log(state);

    const token = state.auth.data.token; // adjust based on your state shape
    console.log(projectData, "the token is", token);
    try {
      const resPromise = axiosInstance.post("/api/projects", projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const res = await toast.promise(resPromise, {
        loading: "Creating project...",
        success: (data) => data?.data?.message,
        error: "Failed to create project",
      });

      return res.data;
    } catch (error) {
      console.error("Error creating project:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchProjects = createAsyncThunk(
  "/project/Fetch_allProject",
  async (token) => {
    // const state = thunkAPI.getState() as { auth: { token: string } };
    // console.log(state);

    // const token = state.auth.data.token; // adjust based on your state shape
    // console.log(projectData, "the token is", token);
    try {
      const resPromise = axiosInstance.get("/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const res = await toast.promise(resPromise, {
        loading: "Creating project...",
        success: (data) => data?.data?.message,
        error: "Failed to create project",
      });

      return res.data;
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("faild to fetch")
    }
  }
);


const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    resetProjectState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProject.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(createProject.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.projects.push(action.payload.project); // adjust based on response shape
    })
    .addCase(createProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(fetchProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload.projects; // adjust based on response shape
    })
    .addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;
