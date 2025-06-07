import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../Layout/Layout.tsx";
import EditProjectModal from "../../Pages/User/EditProjectPage.tsx";
import { deleteProject } from "../../Redux/Slice/projectSlice.ts";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Redux/store.ts";

const ProjectDetailPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { state } = useLocation();
  // console.log(state);
  const project = state?.assignedUsers;
  const handleDelete = async () => {
    try {
      const res = await dispatch(deleteProject(state._id));
      console.log(res); 
      if (res) {
        navigate("/project");
      }
    } catch {
      console.error("Failed to delete project.");
    }
  };

  return (
    <Layout>
      <div className="p-6 md:p-10 bg-gray-50 min-h-screen space-y-6">
        {/* Project Summary Card */}
        <div className="bg-white shadow-md rounded-lg p-6 relative">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              {state.title}
            </h2>
            <div className="flex items-center gap-4 text-gray-500">
              <FiEdit2
                onClick={() => setShow(true)}
                className="hover:text-blue-600 cursor-pointer"
                role="button"
                tabIndex={0}
              />

              <FiTrash2
              onClick={handleDelete } 
              className="hover:text-red-600 cursor-pointer" />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              {state.projectStatus}
            </span>
            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {state.category}
            </span>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 mb-1">
              Project Description
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {state.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Timeline */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Timeline</h4>
              <p className="text-sm text-gray-600">
                Start Date:{" "}
                <span className="font-medium">
                  {new Date(state.startDate).toISOString().split("T")[0]}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                End Date:{" "}
                <span className="font-medium">
                  {new Date(state.endDate).toISOString().split("T")[0]}
                </span>
              </p>
            </div>

            {/* Team Members */}
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Team Members</h4>
              <ul className="space-y-2">
                {project.map((el) => (
                  <li
                    key={el._id}
                    className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="h-7 w-7 rounded-full bg-blue-100 text-blue-700 font-medium flex items-center justify-center">
                      {el.name.charAt(0)}
                    </div>
                    {el.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {show && (
          // <div>
          //   {/* Your content here */}
          //   <p>This will only show when `show` is true</p>
          // </div>
          <div className="fixed inset-0 flex items-center justify-center z-30 p-4">
            <EditProjectModal state={state} setShow={setShow} />
          </div>
        )}

        {/* Task List Section */}
        {/* <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FiPlus className="text-blue-600" /> Task List
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
              <FiPlus /> New Task
            </button>
          </div>
          <div className="space-y-2">
            {project.tasks.map((task, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-md px-4 py-2 flex items-center justify-between">
                <span className="text-gray-800 text-sm font-medium">
                  {task.title}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    task.status === "In Progress"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-gray-300 text-gray-700"
                  }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default ProjectDetailPage;
