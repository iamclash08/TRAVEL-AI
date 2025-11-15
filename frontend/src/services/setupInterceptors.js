// src/services/setupInterceptors.js
import API from "../api";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

API.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh");
      if (!refresh) return Promise.reject(err);
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers["Authorization"] = "Bearer " + token;
          return API(originalRequest);
        });
      }
      isRefreshing = true;
      try {
        const r = await API.post("/api/auth/token/refresh/", { refresh });
        const newAccess = r.data.access;
        localStorage.setItem("access", newAccess);
        API.defaults.headers.common["Authorization"] = "Bearer " + newAccess;
        processQueue(null, newAccess);
        return API(originalRequest);
      } catch (e) {
        processQueue(e, null);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        delete API.defaults.headers.common["Authorization"];
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);

export default API;
