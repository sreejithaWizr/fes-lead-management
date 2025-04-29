// src/utils/auth.js
export const isAuthenticated = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
  
    if (!token) {
      return false;
    }
  
    try {
      // Optional: Make an API call to validate the token
      // Example: const response = await fetch('/api/verify-token', {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      // return response.ok;
  
      // For now, assume the token is valid if it exists
      return true;
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  };