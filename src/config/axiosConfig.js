// import axios from 'axios';
// import Cookies from 'js-cookie';
//
// const backend = "http://13.124.239.157:80";
// // const backend = "http://127.0.0.1:3000";
//
//
// axios.defaults.baseURL = backend;
//
// //쿠키에 값이 저장되어 있어서 withcredentials를 보내주면 된다.
// axios.defaults.withCredentials = true;
// //
// axios.interceptors.request.use(
//     config => {
//         const token = Cookies.get('Atoken');
//         if (token) {
//             config.headers['Authorization'] = `${token}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );
//
// export default axios;