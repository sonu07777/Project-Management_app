import React, { useEffect, useState } from "react";
import { FiPlus, FiSearch, FiUser } from "react-icons/fi";
import Layout from "../../../Layout/Layout.tsx";
import { useDispatch, useSelector } from "react-redux";
import CreateProjectForm from "../../Pages/Admin/createProject.tsx";
import { fetchProjects } from "../../Redux/Slice/projectSlice.ts";
import toast from "react-hot-toast";
import type { AppDispatch } from "../../Redux/store.ts";
import ProjectCard from "../../Component/Project/ProjectCard.tsx";
import { useCallback } from "react";

// Define a UserData interface for user data structure
interface UserData {
  name?: string;
  token?: string;
  // Add other user properties as needed
}

// Define RootState type for Redux state
interface RootState {
  auth?: {
    data?: UserData;
    role?: string;
  };
}

const Project: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchProjectTerm, setSearchProjectTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state?.auth?.data);
  const role = useSelector((state: RootState) => state?.auth?.role);
  const allProject = useSelector(
    (state: RootState) => state?.project?.projects
  );
  console.log(allProject);

  

  const loadAllProject = useCallback(async () => {
    try {
      if (userData && userData.token) {
        const projectData = await dispatch(fetchProjects(userData.token));
        // handle projectData if needed
        console.log(projectData);

        if (
          projectData && Array.isArray(projectData)
            ? projectData.length > 0
            : !!projectData
        ) {
          toast.success("fetched data successfully");
        } else {
          toast.error("failed to fetch");
        }
      } else {
        console.warn("User data or token is missing.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (userData?.token) {
      loadAllProject();
    }
  }, [userData?.token, loadAllProject]);
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="">
            <h1 className="text-2xl font-semibold">
              Welcome, <span className="text-blue-600">{userData?.name}</span>
            </h1>
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-full text-blue-600">
            {/* <FiUser className="text-blue-600" /> */}
            {userData?.name?.charAt(0)}
          </div>
        </div>

        {/* Admin Panel */}
        {role === "admin" && (
          <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center mb-6">
            <span className="text-lg font-medium">Admin Panel</span>
            {!showForm && (
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => setShowForm(true)}>
                <FiPlus />
                New Project
              </button>
            )}
          </div>
        )}
        {showForm && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <CreateProjectForm onCancel={() => setShowForm(false)} />
          </div>
        )}
        {/* Project Overview */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold">Project Overview</h2>
              <p className="text-sm text-gray-500">
                {allProject.length} project found
              </p>
            </div>

            {/* <div className="flex gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
              </div>

              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Status</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Sort by</option>
                <option>Date</option>
                <option>Name</option>
              </select>
            </div> */}
          </div>

          {/* Project Card */}
          {/* <div className="bg-gray-100 p-5 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">Data Science</h3>
              <span className="bg-yellow-300 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full">
                In Progress
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Learn about the data science with hands-on project
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span className="bg-gray-200 px-2 py-1 rounded">
                Data Science
              </span>
              <span className="flex items-center gap-1">📅 May 27, 2025</span>
            </div>
          </div> */}
          {allProject &&
            Array.isArray(allProject) &&
            allProject.map((el, idx) => <ProjectCard data={el} key={idx} />)}
        </div>
      </div>
    </Layout>
  );
};

export default Project;
