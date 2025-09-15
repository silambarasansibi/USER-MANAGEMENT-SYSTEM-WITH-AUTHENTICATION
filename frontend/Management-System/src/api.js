// src/api.js
import axios from "axios";

/**
 * 🔥 Backend Base URL Configuration
 *
 * - If frontend & backend run on the SAME PC → use "http://localhost:8080/api"
 * - If frontend runs on another device in LAN → use "http://<your-local-ip>:8080/api"
 * - Use environment variables (.env) for easier switching:
 *   VITE_API_BASE_URL=http://localhost:8080/api
 */
const api = axios.create({
  baseURL: "http://10.159.169.245:8080/api", // 👈 Update if backend IP/port changes
  withCredentials: false, // Set to true only if using cookies/session auth
});

// ==========================
// ✅ USER REGISTRATION
// ==========================
export const registerUser = (userData) => api.post("/register", userData);

// ==========================
// ✅ USER LOGIN
// ==========================
export const loginUser = (credentials) => api.post("/login", credentials);

// ==========================
// ✅ GET ALL USERS (Admin)
// ==========================
export const getAllUsers = () => api.get("/users");

// ==========================
// ✅ GET PENDING USERS (Admin)
// ==========================
export const getPendingUsers = () => api.get("/pending-users");

// ==========================
// ✅ GET USER BY ID
// ==========================
export const getUserById = (id) => api.get(`/user/id/${id}`);

// ==========================
// ✅ GET USER BY USERNAME
// ==========================
export const getUserByUsername = (username) => api.get(`/user/${username}`);

// ==========================
// ✅ UPDATE USER BY ID
// ==========================
export const updateUser = (id, updatedData) => api.put(`/user/${id}`, updatedData);

// ==========================
// ✅ DELETE USER BY ID
// ==========================
export const deleteUser = (id) => api.delete(`/user/${id}`);

// ==========================
// ✅ APPROVE USER BY ID (Admin)
// ==========================
export const approveUser = (id) => api.post(`/approve/${id}`);

// ==========================
// ✅ DECLINE USER BY ID (Admin)
// ==========================
export const declineUser = (id) => api.delete(`/decline/${id}`);

export default api;
