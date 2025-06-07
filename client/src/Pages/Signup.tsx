// import { useState } from "react";
// import type { FormEvent } from "react";
// import { registerUser } from "../Redux/Slice/authslice.js";
// import { Link } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

// interface RegisterForm {
//   name: string;
//   email: string;
//   password: string;
// }

// const Register = () => {
//   const [formData, setFormData] = useState<RegisterForm>({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       await registerUser(formData);
//       toast.success("Registration successful! Please log in.");
//     } catch (error) {
//       toast.error("Registration failed. Please try again.");
//       console.log(error);
//     }
//   };

//   return (
//    <div className="min-h-screen flex items-center justify-center bg-black px-4">
//       <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl">
//         <h2 className="text-3xl font-bold text-white text-center mb-6">Create Account</h2>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* Full Name */}
//           <div>
//             <label className="block text-sm font-medium text-white mb-1">Full Name</label>
//             <div className="relative">
//               <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="John Doe"
//                 required
//                 className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-white mb-1">Email Address</label>
//             <div className="relative">
//               <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="you@example.com"
//                 required
//                 className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-white mb-1">Password</label>
//             <div className="relative">
//               <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 required
//                 className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
//               />
//             </div>
//             <p className="text-xs text-white/60 mt-1">Use at least 8 characters including letters, numbers, and symbols.</p>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-white text-black font-bold py-2 rounded-lg hover:bg-gray-200 transition"
//           >
//             Create Account
//           </button>

//           {/* Sign-in Redirect */}
//           <p className="text-sm text-white text-center">
//             Already have an account?{" "}
//             <Link to="/login" className="underline font-semibold hover:text-gray-300">
//               Sign in here
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState } from "react";
import type { FormEvent } from "react";
import { registerUser } from "../Redux/Slice/authslice.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../Redux/store.js";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      
      const response = await dispatch(registerUser(formData));
      // await registerUser(formData);
      if (response?.payload?.success) {
        toast.success("Registration successful! Please loge in.");
        // await loadAllTask();
        navigate("/login");
      } else {
        toast.error("Failed to register");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200">
        {/* Header Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-3 rounded-full">
            <FiUser className="h-8 w-8 text-gray-800" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6">
          Sign Up
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700 block mb-2">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:outline-none transition-all duration-300 text-black"
              />
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:outline-none transition-all duration-300  text-black"
              />
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:outline-none transition-all duration-300  text-black"
              />
              <FiLock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray- Thunderstorm
500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Must be 8+ characters with letters, numbers, and symbols.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-all duration-300 shadow-md">
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-gray-800 hover:text-gray-600 font-medium transition-colors duration-300">
              login is here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
