import axios from "axios";

const api = axios.create({
  baseURL: "https://binayak-industries-backend.onrender.com/api/v1",
  withCredentials: true,
});

// =====================================================
// REQUEST INTERCEPTOR: Inject Access Token
// =====================================================
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =====================================================
// RESPONSE INTERCEPTOR: Handle 401 Unauthorized / Expired Tokens
// =====================================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token has expired or is invalid (401 Unauthorized)
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      const isLoginPage = window.location.pathname === "/admin";
      const isAdminRoute = window.location.pathname.startsWith("/admin");

      // Auto-redirect to login if unauthorized on protected admin pages
      if (isAdminRoute && !isLoginPage) {
        window.location.href = "/admin";
      }
    }
    return Promise.reject(error);
  }
);

export default api;