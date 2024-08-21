// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const createAxiosInstanceWithMiddleware = (statusCodeToWatch = 401) => {
//     const navigate = useNavigate
//     const axiosInstance = axios.create();
//   axiosInstance.interceptors.response.use(
//     (response) => {
//       // Any status code that falls within the range of 2xx causes this function to trigger
//       return response;
//     },
//     (error) => {
//         console.log(error)
//       if (error.response && error.response.status === statusCodeToWatch) {
//         navigate("/login")
//       }
//       // Always reject the error so the request can be handled properly
//       return Promise.reject(error);
//     }
//   );

//   return axiosInstance;
// };

// export default createAxiosInstanceWithMiddleware;
