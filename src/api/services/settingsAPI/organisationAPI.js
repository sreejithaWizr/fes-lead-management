import apiClient from '../../config/axios';
export const getOrganisationById = async (orgId) => {
    try {
        const response = await apiClient.get(`api/Organization/${orgId}`); 
        return response.data;
    } catch (error) {
        console.error("Error fetching Organisation:", error);
        throw error;
    }
};

export const updateOrganisation = (id, payload) => {
    try {
        return apiClient.put(`/api/Organization/${id}`, payload);
    } catch (error) {
        console.error("Error fetching lead:", error);
        throw error;
    }
};

export const getOrganisationList = (payload) => {
    return apiClient.post('api/OrganizationListView', payload);
  };

export const createOrganisation = (payload) => {
    return apiClient.post('api/Organization', payload);
};

