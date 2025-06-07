import React, { useEffect, useState } from "react";
import { FiTrash2, FiUser, FiUserCheck } from "react-icons/fi";
import Layout from "../../../Layout/Layout.tsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers, updateUserRole } from "../../Redux/Slice/user.ts";
import type { AppDispatch } from "../../Redux/store.ts";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

interface AdminDashboardProps {
  users: User[];
  onMakeAdmin: (userId: string) => void;
  onMakeUser: (userId: string) => void;
  onDelete: (userId: string) => void;
}
const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const user = useSelector((state) => state?.auth?.data);
  const token = user?.token;
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<User[]>([]);
  const getUsers = async () => {
    if (!token) return;
    try {
      const allusers = await dispatch(fetchUsers(token));
      // console.log("32", allusers);
      setUsers(allusers?.payload);
    } catch {
      console.error("Failed to fetch users.");
    }
  };
  useEffect(() => {
    getUsers();
  }, [token]);
  async function onDelete(_id: string): Promise<void> {
    if (!token) return;
    try {
      const response = await dispatch(deleteUser(_id));
      console.log(response);
      if (response.payload) {
        toast.success("delete successfully");
      }
       getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }

  }

  async function onMakeAdmin(_id: string): Promise<void> {
    if (!token) return;
    try {
      const response = await dispatch(updateUserRole({ userId: _id, role: "admin" }));
       getUsers();
    } catch (error) {
      console.error("Error promoting user to admin:", error);
      toast.error("Error promoting user to admin");
    }
  }

  async function onMakeUser(_id: string): Promise<void> {
    if (!token) return;
    try {
      const response = await dispatch(updateUserRole({ userId: _id, role: "user" }));
      getUsers();
      toast.success("Admin rights revoked successfully");
    } catch (error) {
      console.error("Error revoking admin rights:", error);
      toast.error("Error revoking admin rights");
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Team Management
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t text-sm text-gray-700 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4 flex justify-center items-center space-x-3">
                    {user.role !== "admin" ? (
                      <button
                        onClick={() => onMakeAdmin(user._id)}
                        className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                        <FiUserCheck /> Make Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => onMakeUser(user._id)}
                        className="flex items-center gap-1 px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600">
                        <FiUser /> Revoke Admin
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(user._id)}
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
