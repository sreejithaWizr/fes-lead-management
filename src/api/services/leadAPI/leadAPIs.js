// services/leadService.js
import apiClient from '../../config/axios';

// This function fetches a lead's details from the server using its ID
export const getLeadById = async (leadId) => {
    try {
        const response = await apiClient.get(`/api/LeadProfile/${leadId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching lead:", error);
        throw error;
    }
};
