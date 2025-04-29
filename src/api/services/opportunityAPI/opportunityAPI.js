// Opportunity
import apiClient from "../../config/axios";

// export const getOpportunityList = (id) => apiClient.get(`api/LeadOpportunity/by-lead-id/${id}`)

export const getOpportunityList = async (id) => {
    try {
      const response = await apiClient.get(`api/LeadOpportunity/ByLeadId/${id}`);
      console.log('opportuniity fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching opportuniity:', error);
      throw error; // Optional: bubble up for handling in component
    }
  };