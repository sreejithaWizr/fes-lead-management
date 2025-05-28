import apiClient from "../../config/axios";

// Endpoints of dropdown APIs - Create User 
export const getLoginMethod = () => apiClient.get('api/LoginMethod');

export const getStatus = () => apiClient.get('api/Status');

export const getOrganisation = () => apiClient.get('api/Organization');

export const getUserRole = () => apiClient.get('api/UserRole');

export const getBranch = () => apiClient.get('api/Branch');

export const getFESManager = () => apiClient.get('api/FESManager');

export const getCountry = () => apiClient.get('api/Country');

// Endpoint for Creating a User
export const createUser = (payload) => {
    return apiClient.post('api/User/CreateUser', payload);
};
