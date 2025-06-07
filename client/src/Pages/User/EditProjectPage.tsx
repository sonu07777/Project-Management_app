import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
// import { fetchProjectDetails, fetchUsers, deleteProject, updateProject } from "../../Redux/Slice/projectSlice.ts";
import {  deleteProject, fetchProjectDetails, updateProject } from "../../Redux/Slice/projectSlice.ts";
import {  fetchUsers } from "../../Redux/Slice/user.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../Redux/store.ts";

interface User {
  _id: string;
  name: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  assignedUsers: User[];
  endDate: string;
  projectStatus: string;
  isDelete?: boolean;
}
interface EditProjectPageProps  {
 state: any; // type it properly if you can
  setShow: (value: boolean) => void;
}

const EditProjectPage: React.FC <EditProjectPageProps> = ({state, setShow }) => {
  const dispatch = useDispatch<AppDispatch>();
  // const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const user = useSelector((state)=>state?.auth?.data);
  const token = user?.token;
  console.log("the user is ",user);
  const [project, setProject] = useState<Project|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState<any>({ assignedUsers: [] });
  const [allUsers, setAllUsers] = useState<User[]>([]);
  // console.log("the state is",state);

  useEffect(() => {
    const getProjectDetails = async () => {
      if (!token || !state._id) return;
      try {
        // const data = await dispatch(fetchProjectDetails({state._id,token}));
        const data = await dispatch(fetchProjectDetails({ id: state._id, token }));
        setProject(data);  
        setLoading(false);
      } catch (err) {
        setError("Failed to load project details.");
        setLoading(false);
      }
    };

    const getUsers = async () => {
      if (!token) return;
      try {
        const users = await dispatch(fetchUsers(token));
        // console.log("229",users);
        setAllUsers(users?.payload);
      } catch {
        console.error("Failed to fetch users.");
      }
    };

    getProjectDetails();
    getUsers();
  }, [state._id, token]); 

  

  // const handleEditClick = () => {
  //   if (!project) return;
  //   setEditData({
  //     ...project,
  //     endDate: project.endDate ? project.endDate.split("T")[0] : "",
  //     assignedUsers: project.assignedUsers.map((u) => u._id),
  //   });
  //   setShowEditForm(true);
  // };
  console.log(allUsers)
  // const handleSaveEdit = async () => {
  //   try {
  //     const updatedProject = await dispatch(updateProject({ projectId: state._id, projectData: editData, token }));
  //     console.log(updatedProject);
  //     setProject(updatedProject);
  //     setProject((prev) =>
  //       prev
  //         ? {
  //             ...prev,
  //             assignedUsers: allUsers.filter((user) =>
  //               editData.assignedUsers.includes(user._id)
  //             ),
  //           }
  //         : null
  //     );
  //     setShow(false);
  //   } catch {
  //     console.error("Failed to update project.");
  //   }
  // };
  const handleSaveEdit = async () => {
  try {
    const res = await dispatch(updateProject({
      projectId: state._id,
      projectData: editData,
      token,
    }));

    const updatedProject = res.payload;

    if (!updatedProject) {
      throw new Error("Project update failed.");
    }

    setProject(updatedProject);

    // Optional: update local assignedUsers
    setProject((prev) =>
      prev
        ? {
            ...prev,
            assignedUsers: allUsers.filter((user) =>
              editData.assignedUsers.includes(user._id)
            ),
          }
        : null
    );

    setShow(false);
  } catch (err) {
    console.error("Failed to update project:", err);
  }
};


  // if (loading) return <p className="text-center text-gray-600">Loading project details...</p>;
  // if (error) return <p className="text-center text-red-600">{error}</p>;
  // if (!project) return <p className="text-center text-gray-600">No project found.</p>;

  // const statusColors: Record<string, string> = {
  //   Completed: "bg-green-500",
  //   Pending: "bg-red-500",
  //   "In Progress": "bg-yellow-500",
  // };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
      <div className="bg-white p-6 flex justify-between items-center">
        {/* <h2 className="text-xl font-bold text-white">Edit Project</h2>
        <button
          className={`px-4 py-2 flex items-center space-x-2 rounded text-white ${
            editData.isDelete
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
          onClick={() =>
            setEditData({ ...editData, isDelete: !editData.isDelete })
          }
        >
          {editData.isDelete ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.6 7.4A9 9 0 1 0 21 12h-2a7 7 0 1 1-2.1-4.9l-2.3 2.3H21V3l-2.4 2.4z" />
              </svg>
              <span>Restore</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Move to Bin</span>
            </>
          )}
        </button> */}
      </div>

      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            value={editData.title || ""}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            value={editData.description || ""}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team Members
          </label>
          <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2">
            {allUsers.length > 0 ? (
              allUsers.map((u) => (
                <label
                  key={u._id}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded text-black"
                >
                  <input
                    type="checkbox"
                    className="rounded text-blue-500 focus:ring-blue-500"
                    checked={editData.assignedUsers?.includes(u._id) || false}
                    onChange={(e) => {
                      const updatedUsers = e.target.checked
                        ? [...editData.assignedUsers, u._id]
                        : editData.assignedUsers.filter((id: string) => id !== u._id);
                      setEditData({ ...editData, assignedUsers: updatedUsers });
                    }}
                  />
                  <span>{u.name || "Unknown User"}</span>
                </label>
              ))
            ) : (
              <p>Loading users...</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              value={editData.endDate || ""}
              onChange={(e) =>
                setEditData({ ...editData, endDate: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              value={editData.projectStatus || ""}
              onChange={(e) =>
                setEditData({ ...editData, projectStatus: e.target.value })
              }
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
        <button
          onClick={() => setShow(false)}
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveEdit}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProjectPage;
