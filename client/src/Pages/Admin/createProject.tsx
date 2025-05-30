// import type { RootState } from "../../Redux/store.ts";
// // import React from "react";
// import { FiPlus, FiUsers } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import { createProject } from "../../Redux/Slice/projectSlice.ts";
// import { useEffect, useState } from "react";

// const CreateProject = ({ onCancel }) => {
//   const userData = useSelector((state: RootState) => state?.auth?.data);
//   const token = userData?.data?.token;
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//     assignedUsers: [],
//     endDate: "",
//   });
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     const getUsers = async () => {
//       if (!token) return;
//       try {
//         const response = await fetchUsers(token);
//         const filteredUsers = response.filter((u) => u.role === "user");
//         setUsers(filteredUsers);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };
//     getUsers();
//   }, [token]);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) return;

//     try {
//       const newProject = await createProject(formData, token);
//       console.log("Project Created Successfully:", newProject);
//       onCancel();
//     } catch (error) {
//       console.error("Failed to create project:", error);
//     }
//   };
//   return (
//     <div className="p-6 md:p-10">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Panel</h2>

//       <div className="bg-white rounded-xl shadow p-6">
//         <div className="flex items-center gap-2 mb-6">
//           <FiPlus className="text-blue-600 text-xl" />
//           <h3 className="text-lg font-bold text-gray-800">
//             Create New Project
//           </h3>
//         </div>

//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Project Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               placeholder="Enter project title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Project Description <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               placeholder="Describe the project details"
//               value={formData.description}
//               onChange={handleChange}
//               rows={4}
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category <span className="text-red-500">*</span>
//               </label>
//               <select
//                 id="category"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="">Select a category</option>
//                 <option value="design">Design</option>
//                 <option value="development">Development</option>
//                 <option value="marketing">Marketing</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Deadline <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="date"
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Assign Team Members
//             </label>
//             <div className="w-full border border-gray-300 rounded-md px-4 py-6 text-center text-gray-500">
//               <div className="flex flex-col items-center">
//                 <FiUsers className="text-3xl mb-2" />
//                 <p>No active team members available</p>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end gap-3">
//             <button
//               type="button"
//               className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100">
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//               Create Project
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateProject;

import React, { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { FiPlusCircle, FiUserX } from "react-icons/fi";
// import AuthContext from "../context/AuthContext";
import { createProject } from "../../Redux/Slice/projectSlice.ts";
import { fetchUsers } from "../../Redux/Slice/authslice.ts";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch } from "../../Redux/store.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  role: string;
  isActive: boolean;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  assignedUsers: string[];
  endDate: string;
}

interface Props {
  onCancel: () => void;
}

const CreateProjectForm: React.FC<Props> = ({ onCancel }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  interface RootState {
    auth: {
      data?: {
        token?: string;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    };
    [key: string]: unknown;
  }
  const { data } = useSelector((state: RootState) => state.auth);
  // The user object you want is in 'data', so you can access properties like:
  const token = data?.token;
  //   const name = data?.name;
  //   const email = data?.email;
  //   const role = data?.role;
  //   const isActive = data?.isActive;
  //   const userId = data?._id;
  // Now you can use these variables as needed in your component

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    assignedUsers: [],
    endDate: "",
  });

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      if (!token) return;
      try {
        const response = await dispatch(fetchUsers(token));
        const usersData = response?.payload || [];
        const filtered = usersData.filter((u: User) => u.role === "user");
        setUsers(filtered);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, [token]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      assignedUsers: checked
        ? [...prev.assignedUsers, value]
        : prev.assignedUsers.filter((id) => id !== value),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await dispatch(createProject(formData));
      if (res?.payload?.success) {
        toast.success("create project!");
        navigate("/project");
      } else {
        toast.error("Failed to create");
      }
      onCancel();
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center mb-6">
        <FiPlusCircle className="text-blue-600 text-2xl mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">New Project</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. CRM Dashboard"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Brief summary of the project"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Data Science">Data Science</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Deadline
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Assign Team Members
          </label>
          <div className="grid gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
            {users.filter((u) => u.isActive).length ? (
              users
                .filter((u) => u.isActive)
                .map((u) => (
                  <label key={u._id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      value={u._id}
                      checked={formData.assignedUsers.includes(u._id)}
                      onChange={handleCheckboxChange}
                      className="accent-blue-600"
                    />
                    <span className="bg-blue-100 text-blue-700 rounded-full h-8 w-8 flex items-center justify-center">
                      {u.name.charAt(0)}
                    </span>
                    <span className="text-gray-700">{u.name}</span>
                  </label>
                ))
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <FiUserX className="text-3xl" />
                <p className="text-sm mt-1">No active users</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
