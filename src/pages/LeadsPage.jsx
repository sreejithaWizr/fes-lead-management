
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeads, setCurrentPage, setItemsPerPage } from '../store/leadsSlice';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const LeadsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { leads, status, currentPage, itemsPerPage, totalLeads } = useSelector((state) => state.leads);
  const [selectedLeads, setSelectedLeads] = useState([]);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLeads());
    }
  }, [status, dispatch]);
  
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLeads(leads.map(lead => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };
  
  const handleSelectLead = (e, leadId) => {
    if (e.target.checked) {
      setSelectedLeads([...selectedLeads, leadId]);
    } else {
      setSelectedLeads(selectedLeads.filter(id => id !== leadId));
    }
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'Potential':
        return 'status-potential';
      case 'Inactive':
        return 'status-inactive';
      case 'Enrolled':
        return 'status-enrolled';
      case 'May be Prospective':
        return 'status-prospective';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  
  const handleCreateLead = () => {
    navigate('/leads/create');
  };
  
  const totalPages = Math.ceil(totalLeads / itemsPerPage);
  
  const renderPagination = () => {
    const pages = [];
    const maxDisplayedPages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
    let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);
    
    if (endPage - startPage + 1 < maxDisplayedPages) {
      startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`w-8 h-8 rounded-md flex items-center justify-center ${
            currentPage === i ? 'bg-primary text-white' : 'bg-white text-[#1A1A1A]'
          }`}
          onClick={() => dispatch(setCurrentPage(i))}
        >
          {i}
        </button>
      );
    }
    
    return (
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 rounded-md flex items-center justify-center bg-white text-[#1A1A1A] disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        >
          <ChevronLeft size={16} />
        </button>
        
        {pages}
        
        {endPage < totalPages && (
          <>
            <span className="px-1">...</span>
            <button
              className="w-8 h-8 rounded-md flex items-center justify-center bg-white text-[#1A1A1A]"
              onClick={() => dispatch(setCurrentPage(totalPages))}
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          className="w-8 h-8 rounded-md flex items-center justify-center bg-white text-[#1A1A1A] disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    );
  };
  
  if (status === 'loading') {
    return <div className="flex justify-center p-8">Loading leads...</div>;
  }
  
  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#F9FAFB] border-b border-[#E0E0E0]">
            <tr>
              <th className="table-header w-10">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded"
                  onChange={handleSelectAll}
                />
              </th>
              <th className="table-header">Lead no</th>
              <th className="table-header">First Name</th>
              <th className="table-header">Last Name</th>
              <th className="table-header">Status</th>
              <th className="table-header">Branch</th>
              <th className="table-header">Created Date</th>
              <th className="table-header">Phone</th>
              <th className="table-header">Email</th>
              <th className="table-header">Lead Source</th>
              <th className="table-header">Location</th>
              <th className="table-header w-10"></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-[#E0E0E0] hover:bg-[#F9FAFB]"
              >
                <td className="table-cell w-10">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded"
                    checked={selectedLeads.includes(lead.id)}
                    onChange={(e) => handleSelectLead(e, lead.id)}
                  />
                </td>
                <td className="table-cell font-medium">{lead.id}</td>
                <td className="table-cell">{lead.firstName}</td>
                <td className="table-cell">{lead.lastName}</td>
                <td className="table-cell">
                  <span className={`chip ${getStatusClass(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="table-cell">{lead.branch}</td>
                <td className="table-cell">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.33301 1.33337V3.33337" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10.667 1.33337V3.33337" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.33301 6.06006H13.6663" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 5.66663V11.3333C14 13.3333 13 14.6666 10.6667 14.6666H5.33333C3 14.6666 2 13.3333 2 11.3333V5.66663C2 3.66663 3 2.33329 5.33333 2.33329H10.6667C13 2.33329 14 3.66663 14 5.66663Z" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {lead.createdDate}
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.6663 11.28V13.28C14.6671 13.4657 14.6293 13.6495 14.5553 13.8196C14.4814 13.9897 14.3728 14.1424 14.2364 14.2679C14.1001 14.3934 13.9391 14.4889 13.7633 14.5481C13.5875 14.6073 13.4012 14.6291 13.2163 14.6123C11.1596 14.3653 9.19324 13.6166 7.45967 12.4263C5.84896 11.3444 4.48355 9.97898 3.40167 8.36826C2.20775 6.62736 1.45863 4.65223 1.21634 2.58493C1.19955 2.40057 1.22117 2.21486 1.28003 2.03946C1.3389 1.86405 1.43389 1.70328 1.55881 1.56701C1.68374 1.43075 1.83575 1.32203 2.00525 1.24774C2.17475 1.17345 2.35797 1.13527 2.54301 1.1356H4.54301C4.86731 1.13238 5.18296 1.2403 5.4288 1.43938C5.67463 1.63847 5.83218 1.91686 5.87634 2.2276C5.96796 2.93448 6.14719 3.62298 6.41301 4.27493C6.51204 4.50995 6.54522 4.76823 6.50938 5.02058C6.47355 5.27293 6.37006 5.50996 6.21301 5.7076L5.29301 6.6276C6.30251 8.29953 7.70044 9.69746 9.37238 10.707L10.2924 9.7876C10.49 9.63055 10.7271 9.52706 10.9794 9.49123C11.2318 9.45539 11.4901 9.48857 11.7251 9.5876C12.377 9.85342 13.0655 10.0327 13.7724 10.1243C14.0866 10.1688 14.3676 10.329 14.5673 10.5786C14.767 10.8282 14.8734 11.148 14.8663 11.4763L14.6663 11.28Z" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {lead.phone}
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.3337 13.6667H4.66699C2.66699 13.6667 1.33366 12.6667 1.33366 10.3333V5.66667C1.33366 3.33333 2.66699 2.33333 4.66699 2.33333H11.3337C13.3337 2.33333 14.667 3.33333 14.667 5.66667V10.3333C14.667 12.6667 13.3337 13.6667 11.3337 13.6667Z" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11.3337 6L9.25033 7.66667C8.56699 8.21333 7.42699 8.21333 6.74366 7.66667L4.66699 6" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {lead.email}
                  </div>
                </td>
                <td className="table-cell">{lead.leadSource}</td>
                <td className="table-cell">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.00033 8.95999C9.0734 8.95999 9.94033 8.09306 9.94033 6.99999C9.94033 5.90692 9.0734 5.03999 8.00033 5.03999C6.92726 5.03999 6.06033 5.90692 6.06033 6.99999C6.06033 8.09306 6.92726 8.95999 8.00033 8.95999Z" stroke="#757575" strokeWidth="1.5"/>
                      <path d="M2.4137 5.66C3.72703 -0.113333 12.2804 -0.106666 13.587 5.66666C14.3537 9.05333 12.247 11.92 10.4004 13.6933C9.06703 14.9867 6.93369 14.9867 5.5937 13.6933C3.7537 11.92 1.64703 9.04666 2.4137 5.66Z" stroke="#757575" strokeWidth="1.5"/>
                    </svg>
                    {lead.location}
                  </div>
                </td>
                <td className="table-cell w-10">
                  <button className="text-[#757575] hover:text-primary">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 flex items-center justify-between border-t border-[#E0E0E0]">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#757575]">Lines per page:</span>
          <select 
            className="bg-white border border-[#E0E0E0] rounded p-1 text-sm"
            value={itemsPerPage}
            onChange={(e) => dispatch(setItemsPerPage(Number(e.target.value)))}
          >
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>
        
        {renderPagination()}
      </div>
    </div>
  );
};

const LeadsPage = () => {
  const navigate = useNavigate();
  
  const handleCreateLead = () => {
    navigate('/leads/create');
  };

  return (
    <div>
      <LeadsTable />
    </div>
  );
};

export default LeadsPage;
