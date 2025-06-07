import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance/authAxio.js";
import toast from "react-hot-toast";

interface ProjectState {
  loading: boolean;
  error: string | null;
  projects: any[];// Replace `any` with your project type if available
  success: boolean;
}

const initialState: ProjectState = {
  loading: false,
  error: null,
  projects: [],
  success: false,
};


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
      toast.error("faild to fetch");
    }
  }
);

interface UpdateProjectArgs {
  projectId: string;
  projectData: Record<string, any>;
  token: string;
}

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ projectId, projectData ,token}: UpdateProjectArgs, thunkAPI) => {
    console.log(projectId,projectData,token);
    try {
      // const state = thunkAPI.getState() as { auth: { token: string } };
      // const token = state.auth?.token;

      const response = await axiosInstance.put(
        `/api/projects/${projectId}`,
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error("Update project error:", error.response?.data || error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

interface FetchProjectDetailsArgs {
  id: string,
  token :string
}

export const fetchProjectDetails = createAsyncThunk(
  "project/fetchProjectDetails",
  async ({ id ,token}: FetchProjectDetailsArgs, thunkAPI) => {
    try {
      // const state = thunkAPI.getState() as { auth: { token: string } };
      // const token = state.auth?.data?.token;
      console.log(id,token);

      const response = await axiosInstance.get(`/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching project details:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { auth: { token: string } };
      const token = state.auth?.data?.token;

      await axiosInstance.delete(`/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Project deleted successfully:", projectId);
      return projectId; // Return ID to remove from state
    } catch (error: any) {
      console.error("Delete project error:", error.response?.data || error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
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
    builder
      .addCase(createProject.pending, (state) => {
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
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Optional: update the project list if needed
        const updated = action.payload;
        state.projects = state.projects.map((p) =>
          p._id === updated._id ? updated : p
        );
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
