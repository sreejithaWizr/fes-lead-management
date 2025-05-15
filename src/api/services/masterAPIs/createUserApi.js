import apiClient from "../../config/axios";

// Endpoints of dropdown APIs - Create User 
export const getOrganisation = () => apiClient.get('api/Organization');