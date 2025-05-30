// src/utils/auth.js

// Helper function to get stored token and related data
export const getStoredToken = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const expiresAt = localStorage.getItem('tokenExpiresAt') || sessionStorage.getItem('tokenExpiresAt');
  const rememberMe = localStorage.getItem('rememberMe') === 'true';
  return { token, expiresAt, rememberMe };
};

// Helper function to check if token is valid
export const isTokenValid = (token, expiresAt) => {
  if (!token || !expiresAt) return false;
  const expirationDate = new Date(expiresAt);
  return new Date() < expirationDate;
};

// Check if the user is authenticated
export const isAuthenticated = async () => {
  const { token, expiresAt } = getStoredToken();

  if (!token || !isTokenValid(token, expiresAt)) {
    console.log('No valid token found or token expired');
    return false;
  }

  try {
    // Optional: Make an API call to validate the token
    // Example:
    // const response = await fetch('/api/verify-token', {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // if (!response.ok) {
    //   console.error('Token validation failed:', response.statusText);
    //   return false;
    // }

    // For now, assume the token is valid if it exists and hasn't expired
    // console.log('Token:', token);
    return true;
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
};

// Logout function to clear authentication data
export const logout = () => {
  // Clear all authentication-related data
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiresAt');
  localStorage.removeItem('rememberMe');
  localStorage.removeItem('rememberedUsername'); // If username is stored

  sessionStorage.removeItem('token');
  sessionStorage.removeItem('tokenExpiresAt');

  console.log('User logged out, all auth data cleared');
};

// Store token based on rememberMe flag
export const storeToken = (token, expiresAt, username, rememberMe) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  const otherStorage = rememberMe ? sessionStorage : localStorage;

  storage.setItem('token', token);
  storage.setItem('tokenExpiresAt', expiresAt);

  otherStorage.removeItem('token');
  otherStorage.removeItem('tokenExpiresAt');

  if (rememberMe) {
    localStorage.setItem('rememberMe', 'true');
    localStorage.setItem('rememberedUsername', username);
  } else {
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('rememberedUsername');
  }
};