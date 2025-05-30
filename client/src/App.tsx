// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Signup from "./Pages/Signup.tsx";
import Login from "./Pages/Login.tsx";
import { Route, Routes } from "react-router-dom";
// import Layout from "../Layout/Layout.tsx";
import Home from "./Pages/Home.tsx";
import About from "./Pages/AboutUs.tsx";
import Projectpage from "./Pages/User/projectPage.tsx";
import RequireAuth from "./Component/Auth/AuthRequired.tsx";
import DetailProject from "./Component/Project/DetailProject.tsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<HomePage />}></Route> */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route path="/Layout" element={<Layout />}></Route> */}
        <Route path="/about" element={<About />}></Route>

        <Route
          element={
            <RequireAuth allowedRoles={["ADMIN", "user", "admin", "USER"]} />
          }>
          <Route path="/project" element={<Projectpage />}></Route>
          <Route path="/Description" element={<DetailProject />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
