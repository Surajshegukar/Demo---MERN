import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || "http://localhost:3000",
  withCredentials: true,
});

export const setupInterceptors = (store) => {
  instance.interceptors.response.use(
    res => res,
    async err => {
      if (err.response?.status === 40 && !err.config.__isRetry) {
        err.config.__isRetry = true;
        try {
          const { data } = await instance.get('/api/refresh');
          store.dispatch({ type: 'auth/setAuthenticated', payload: true });
          return instance(err.config); // Retry original request
        } catch (e) {
          store.dispatch({ type: 'auth/logout' });
        }
      }

      return Promise.reject(err);
    }
  );
};

export default instance;