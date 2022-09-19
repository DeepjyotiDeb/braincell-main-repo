import axios from "axios";

const service = axios.create({
    timeout: 20000 // request timeout
  });

  // service.defaults.baseURL = 'http://localhost:8000/';
//   service.defaults.baseURL ='https://zwc74bqvu4.execute-api.ap-south-1.amazonaws.com/dev1/'
//   service.defaults.baseURL ="https://api-service.d0ljtrevpub3e.ap-south-1.cs.amazonlightsail.com/"
  service.defaults.baseURL = "https://brain-db.herokuapp.com/"
  service.defaults.headers.post['Content-Type'] = 'application/json';
  
  // request interceptor
  
//   service.interceptors.request.use(
//     config => {
//       // Do something before request is sent
//       console.log("yes?")
//       config.headers["Authorization"] = "Bearer " + localStorage.getItem('access_token');
//       return config;
//     },
//     error => {
//       Promise.reject(error);
//     }
//   );


// axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

export default service;

