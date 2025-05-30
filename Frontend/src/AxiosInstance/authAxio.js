import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL
const BASE_URL = "http://localhost:5000"; 

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;

// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// // ✅ Helper to extract token from cookie
// function getCookie(name) {
//   const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
//   return match ? match[2] : null;
// }

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true, // Required to include cookies in cross-site requests
// });

// // ✅ Add interceptor to set Authorization header from cookie
// axiosInstance.interceptors.request.use((config) => {
//   const token = getCookie("token");
//   console.log(token);
//    // Make sure your cookie is named "token"
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;
