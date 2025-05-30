import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../src/Redux/store";
import { logout } from "../src/Redux/Slice/authslice.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Layout({ children }: React.PropsWithChildren<object>) {
  const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
  function hideDrawer() {
    const element = document.getElementById("my-drawer-2");
    if (element && element instanceof HTMLInputElement) {
      element.checked = false;
    }
  }
  async function logoutUser() {
    const res = await dispatch(logout());
    if (res?.payload?.success) {
      toast.success("Logout successful!");
      navigate("/");
    } else {
      toast.error("Failed to logout");
    }
  }

  return (
    <div className="flex ">
      <div className="drawer lg:drawer-open  left-0 z-50  w-1/4  ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className=" cursor-pointer relative lg:hidden">
            <IoMenu size={"32px"} className=" font-bold text-white m-5" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* <li className="flex left-0"> */}

            <button onClick={hideDrawer} className=" pl-60 lg:hidden">
              <AiFillCloseCircle
                size={"32px"}
                className=" font-bold text-white "
              />
            </button>
            {/* </li> */}
            {/* Sidebar content here */}
            <li className="flex justify-between ">
              <a>Member</a>
            </li>
            <li>
              <a>Admin Dashboard</a>
            </li>
            <button className="btn btn-soft z-50" onClick={logoutUser}>
              Logout
            </button>
          </ul>
        </div>
      </div>
      <div className="w-3/4  ">{children}</div>
    </div>
  );
}

export default Layout;
