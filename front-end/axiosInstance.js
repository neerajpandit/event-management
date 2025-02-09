import axios from "axios";

// Create Axios instance
const api = axios.create({
    baseURL: "http://localhost:8001/api/v1", // Your backend URL
    withCredentials: true, // Send cookies (for refresh token)
});

// Request Interceptor (Attach Access Token)
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken"); // Store only temporarily
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor (Handle Expired Access Token)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axios.post("http://localhost:8001/api/v1/users/refresh-token", {}, { withCredentials: true });
                const newAccessToken = res.data.data.accessToken;

                // Store the new token
                localStorage.setItem("accessToken", newAccessToken);

                // Retry the failed request with new token
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (err) {
                console.error("Token Refresh Failed", err);
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
