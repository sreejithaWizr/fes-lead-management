import apiClient from "../../config/axios";

// Endpoints of dropdown APIs - Create Lead 
export const getAreaOfStudy = () => apiClient.get('api/AreaOfStudy');

export const getBranch = () => apiClient.get('api/Branch');

export const getCategory = () => apiClient.get('api/Category');

export const getCity = () => apiClient.get('api/City');

export const getCountry = () => apiClient.get('api/Country');

export const getFESUser = () => apiClient.get('api/FESUser');

export const getOrganization = () => apiClient.get('api/Organization');

export const getOrganizationType = () => apiClient.get('api/OrganizationType');

export const getPriority = () => apiClient.get('api/Priority');

export const getQualification = () => apiClient.get('api/Qualification');

export const getRegion = () => apiClient.get('api/Region');

export const getSource1 = () => apiClient.get('api/Source1');

export const getStatus = () => apiClient.get('api/Status');

export const getSubCategory = (id) => apiClient.get(`api/SubCategory/GetSubCategoryByCategoryId/${id}`);
export const getTestName = () => apiClient.get('api/TestName');

export const getVertical = () => apiClient.get('api/Vertical');
 
export const getDesiredProgram = () => apiClient.get('api/DesiredProgram')

export const getLeadList = () => apiClient.get('api/LeadListView')
export const createLead = (payload) => {
    return apiClient.post('api/leadProfile', payload);
  };
