// import React from "react";
// import { AiFillCloseCircle } from "react-icons/ai";
// import { IoMenu } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch } from "../src/Redux/store";
// import { logout } from "../src/Redux/Slice/authslice.ts";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// function Layout({ children }: React.PropsWithChildren<object>) {
//   const data = useSelector((state) => state.auth.data);
//   console.log(data);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   function hideDrawer() {
//     const element = document.getElementById("my-drawer-2");
//     if (element && element instanceof HTMLInputElement) {
//       element.checked = false;
//     }
//   }
//   async function logoutUser() {
//     const res = await dispatch(logout());
//     if (res?.payload?.success) {
//       toast.success("Logout successful!");
//       navigate("/");
//     } else {
//       toast.error("Failed to logout");
//     }
//   }

//   return (
//     <div className="flex ">
//       <div className="drawer w-0 lg:drawer-open  left-0 z-50  lg:w-1/4  border-2 border-red-900  ">
//         <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content ">
//           {/* Page content here */}
//           <label
//             htmlFor="my-drawer-2"
//             className=" cursor-pointer relative lg:hidden">
//             <IoMenu size={"32px"} className=" font-bold text-white m-5" />
//           </label>
//         </div>
//         <div className="drawer-side">
//           <label
//             htmlFor="my-drawer-2"
//             aria-label="close sidebar"
//             className="drawer-overlay"></label>
//           <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
//             {/* <li className="flex left-0"> */}

//             <button onClick={hideDrawer} className=" pl-60 lg:hidden">
//               <AiFillCloseCircle
//                 size={"32px"}
//                 className=" font-bold text-white "
//               />
//             </button>
//             {/* </li> */}
//             {/* Sidebar content here */}
//             {data.role === "admin" ? (
//               <>
//                 <Link to="/adminDashbord">
//                   <li className="flex justify-between ">Member</li>
//                 </Link>
//                 <Link to="/project">
//                   <li>Project Dashboard</li>
//                 </Link>
//               </>
//             ) : (
//               <Link to="/project">
//                 <li>
//                   Project Dashboard
//                 </li>
//               </Link>
//             )}

//             <button className="btn btn-soft z-50" onClick={logoutUser}>
//               Logout
//             </button>
//           </ul>
//         </div>
//       </div>
//       <div className="w-6/7  ">{children}</div>
//     </div>
//   );
// }

// export default Layout;

// ------------------------------------------------------------------------------

// import React from "react";
// import { AiFillCloseCircle } from "react-icons/ai";
// import { IoMenu } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch } from "../src/Redux/store";
// import { logout } from "../src/Redux/Slice/authslice.ts";
// import toast from "react-hot-toast";
// import { useNavigate, Link } from "react-router-dom";

// function Layout({ children }: React.PropsWithChildren<object>) {
//   const data = useSelector((state) => state.auth.data);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   function hideDrawer() {
//     const element = document.getElementById("my-drawer-2");
//     if (element) {
//       element.checked = false;
//     }
//   }

//   async function logoutUser () {
//     const res = await dispatch(logout());
//     if (res?.payload?.success) {
//       toast.success("Logout successful!");
//       navigate("/");
//     } else {
//       toast.error("Failed to logout");
//     }
//   }

//   return (
//     <div className="flex flex-col lg:flex-row">
//       <div className="drawer w-full lg:w-1/4  lg:drawer-open z-50">
//         <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content">
//           <label htmlFor="my-drawer-2" className="cursor-pointer lg:hidden">
//             <IoMenu size={"32px"} className="font-bold text-white m-5" />
//           </label>
//         </div>
//         <div className="drawer-side">
//           <label htmlFor="my-drawer-2" className="drawer-overlay" aria-label="close sidebar"></label>
//           <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
//             <button onClick={hideDrawer} className="pl-60 lg:hidden">
//               <AiFillCloseCircle size={"32px"} className="font-bold text-white" />
//             </button>
//             {data.role === "admin" ? (
//               <>
//                 <Link to="/adminDashbord">
//                   <li className="flex justify-between">Member</li>
//                 </Link>
//                 <Link to="/project">
//                   <li>Project Dashboard</li>
//                 </Link>
//               </>
//             ) : (
//               <Link to="/project">
//                 <li>Project Dashboard</li>
//               </Link>
//             )}
//             <button className="btn btn-soft z-50 mt-4" onClick={logoutUser }>
//               Logout
//             </button>
//           </ul>
//         </div>
//       </div>
//       <div className="flex-grow p-4">{children}</div>
//     </div>
//   );
// }

// export default Layout;
// ==============================================

import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../src/Redux/store";
import { logout } from "../src/Redux/Slice/authslice.ts";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

function Layout({ children }: React.PropsWithChildren<object>) {
  const data = useSelector((state) => state.auth.data);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function logoutUser() {
    const res = await dispatch(logout());
    if (res?.payload?.success) {
      toast.success("Logout successful!");
      navigate("/");
    } else {
      toast.error("Failed to logout");
    }
  }

  function toggleMobileMenu() {
    setMobileMenuOpen((prev) => !prev);
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky top navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="https://www.capsitech.com/wp-content/uploads/2020/10/200x200.png"
                alt="Company Logo"
                className="h-8 w-auto"
                draggable={false}
              />
              <span className="font-extrabold text-xl text-gray-900 select-none">
                CapsiTech
              </span>
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {data.role === "admin" ? (
                <>
                  <Link
                    to="/adminDashbord"
                    className="text-gray-700 hover:text-indigo-600 hover:underline transition"
                  >
                    Member
                  </Link>
                  <Link
                    to="/project"
                    className="text-gray-700 hover:text-indigo-600 hover:underline transition"
                  >
                    Project Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  to="/project"
                  className="text-gray-700 hover:text-indigo-600 hover:underline transition"
                >
                  Project Dashboard
                </Link>
              )}
              <button
                onClick={logoutUser}
                className="ml-4 rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 transition"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                {mobileMenuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
            <div className="px-4 pt-4 pb-6 space-y-4">
              {data.role === "admin" ? (
                <>
                  <Link
                    to="/adminDashbord"
                    onClick={closeMobileMenu}
                    className="block text-gray-700 hover:text-indigo-600 hover:underline transition"
                  >
                    Member
                  </Link>
                  <Link
                    to="/project"
                    onClick={closeMobileMenu}
                    className="block text-gray-700 hover:text-indigo-600 hover:underline transition"
                  >
                    Project Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  to="/project"
                  onClick={closeMobileMenu}
                  className="block text-gray-700 hover:text-indigo-600 hover:underline transition"
                >
                  Project Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  logoutUser();
                  closeMobileMenu();
                }}
                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 transition"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">{children}</main>
    </div>
  );
}

export default Layout;


