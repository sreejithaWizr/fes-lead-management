// services/leadService.js
import apiClient from '../../config/axios';

// This function fetches a lead's details from the server using its ID
export const getLeadById = async (leadId) => {
    try {
        const response = await apiClient.get(`api/LeadListView/GetLeadListViewById/${leadId}`); //LeadListView/GetLeadListViewById/1
        return response.data;
    } catch (error) {
        console.error("Error fetching lead:", error);
        throw error;
    }
};

// This function updates a lead's details on the server using its ID and the new data
export const updateLead = (id, payload) => {
    try {
        return apiClient.put(`/api/LeadProfile/${id}`, payload);
    } catch (error) {
        console.error("Error fetching lead:", error);
        throw error;
    }
};

export const getLeadList = (payload) => {
    return apiClient.post('api/LeadListView', payload);
  };
