import axios from "axios";
import { url } from "./networks";

// Create a custom axios instance with proper cookie handling
const api = axios.create({
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Expires": "0"
  }
});

export const login = async (data) => {
  try {
    const res = await api({
      method: "POST",
      url: `${url}/users/login`,
      data: data,
      withCredentials: true, // Explicitly set for this request
    });
    
    // Set a flag in localStorage to indicate successful login
    localStorage.setItem('auth_timestamp', Date.now().toString());
    
    return res;
  } catch (err) {
    throw err.response?.data || { message: "Login failed. Please try again." };
  }
};

export const logout = async () => {
  try {
    const res = await api({
      method: "GET",
      url: `${url}/users/logout`,
      withCredentials: true,
    });
    
    // Clear the auth timestamp from localStorage
    localStorage.removeItem('auth_timestamp');
    
    return res;
  } catch (err) {
    throw err.response || { message: "Logout failed" };
  }
};

export const isLoggedIn = async () => {
  try {
    const res = await api({
      method: "GET",
      url: `${url}/users`,
      withCredentials: true,
    });
    return res;
  } catch (err) {
    return err.response?.data || { loggedIn: false };
  }
};

export const signup = async (data) => {
  try {
    const res = await api({
      method: "POST",
      url: `${url}/users/signup`,
      data,
      withCredentials: true,
    });
    
    // Set auth timestamp on successful signup too
    localStorage.setItem('auth_timestamp', Date.now().toString());
    return res;
  } catch (err) {
    throw err.response?.data || { message: "Signup failed. Please try again." };
  }
};
