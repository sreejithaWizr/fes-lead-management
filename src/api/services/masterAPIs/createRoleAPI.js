import apiClient from "../../config/axios";

export const getUserRoleType= () => apiClient.get('api/UserRoleType');

export const getStatus = () => apiClient.get('api/Status');

export const getSubCategory = (id) => apiClient.get(`api/SubCategory/GetSubCategoryByCategoryId/${id}`);

export const getTestName = () => apiClient.get('api/TestName');

export const getVertical = () => apiClient.get('api/Vertical');
 