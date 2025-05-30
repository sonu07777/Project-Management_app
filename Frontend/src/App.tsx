// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Signup from "./Pages/Signup.tsx"
import Login from "./Pages/Login.tsx"
import { Route, Routes } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (

    <>
      <Routes>
         {/* <Route path="/" element={<HomePage />}></Route> */}
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>

      </Routes>
    </>
    
  )
}

export default App
