import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../Redux/Slice/authslice.js";
import { HiMail, HiLockClosed } from "react-icons/hi";
import toast from "react-hot-toast";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(form);
      toast.success("Login successful!");
    } catch (e) {
      toast.error("Login failed. Please check your credentials.",e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
              <HiMail className="text-gray-400 text-lg mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full focus:outline-none text-gray-800"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
              <HiLockClosed className="text-gray-400 text-lg mr-2" />
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full focus:outline-none text-gray-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 font-medium">
            Sign In
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
