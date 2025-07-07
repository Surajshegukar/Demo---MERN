// utils/axiosInstance.js
import axios from "axios";

const instance = axios.create();

export const setupInterceptors = (store) => {
  instance.interceptors.request.use((config) => {
    config.baseURL = import.meta.env.REACT_APP_API_URL || "http://localhost:3000";

    const token = store.getState().auth?.token;
    console.log("Setting up Axios Interceptors", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
};

export default instance;