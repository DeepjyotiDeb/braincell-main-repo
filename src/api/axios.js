import axios from 'axios';

const service = axios.create({
  timeout: 10000, // request timeout
});

service.defaults.baseURL = process.env.REACT_APP_API_PROD;

export default service;
