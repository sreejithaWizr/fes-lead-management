
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeads, setCurrentPage, setItemsPerPage } from '../store/leadsSlice';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { CustomTable, CustomPagination } from "react-mui-tailwind";
import PhoneIcon from "../assets/phone-icon.svg";
import CalenderIcon from "../assets/calendar.svg";
import MailIcon from "../assets/mail.svg";
import LoactionIcon from "../assets/location.svg";
import EditIcon from '../assets/edit-icon.svg'
import { getLeadList } from '../api/services/masterAPIs/createLeadApi';

const LeadsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, itemsPerPage, totalLeads, columns } = useSelector((state) => state.leads);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [leads, setLeads] = useState([])

// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [leadRes] = await Promise.allSettled([
//           getLeadList(),
//         ]
//     );
//         console.log("statusRes", leadRes?.value?.data?.data || [])
//         setLeads(leadRes?.value?.data?.data || [])
//       } catch (err) {
//         console.error('Error loading filters:', err);
//       }
//     };

//     fetchData();
//   }, []); 

  useEffect(() => {
    const payload = {
      filters: [],
      pageSize: 15,
      pageNumber: 1
    };
  
    let leadRes;
  
    getLeadList(payload)
      .then(response => {
        leadRes = response;
        console.log('leadRes', leadRes?.data?.data || []);
        setLeads(leadRes?.data?.data || []);
      })
      .catch(error => {
        console.error('Error fetching leads:', error);
      });
  }, []);

  
  const handleView = () => {
    navigate('/leads/detailsview');
  }

  const getRow = (columnId, value) => {
    console.log("colu", columnId)
    switch (columnId) {
      case "leadNumber":
        return (
          <div className="flex items-center gap-2">
            <span className='font-bold cursor-pointer' onClick={handleView}>{value}</span>
          </div>
        );
      case "createdAt":
        return (
          <div className="flex items-center gap-2">
            <img src={CalenderIcon} alt="Calender" className="w-4 h-4" />
            <span>{value}</span>
          </div>
        );
      case "mobileNumber":
        return (
          <div className="flex items-center gap-2">
            <img src={PhoneIcon} alt="Phone" className="w-4 h-4" />
            <span>{value}</span>
          </div>
        );
      case "email":
        return (
          <div className="flex items-center gap-2">
            <img src={MailIcon} alt="Mail" className="w-4 h-4" />
            <span>{value}</span>
          </div>
        );
      case "location":
        return (
          <div className="flex items-center gap-2">
            <img src={LoactionIcon} alt="Location" className="w-4 h-4" />
            <span>{value}</span>
          </div>
        );
  //     default:
  //       return value;
  //   }
  // };

        case "action":
          return (
            <div className="flex items-center gap-2">
                <img src={EditIcon} alt="actions" className="w-4 h-4" onClick={hanldeEdit}/>
            </div>
        );
        default:
            return value;
    }
};

const hanldeEdit = () => {
  navigate('/leads/edit');
};
  
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

  // const renderPagination = () => {
  //   const pages = [];
  //   const maxDisplayedPages = 5;

  //   let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
  //   let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

  //   if (endPage - startPage + 1 < maxDisplayedPages) {
  //     startPage = Math.max(1, endPage - maxDisplayedPages + 1);
  //   }

  //   for (let i = startPage; i <= endPage; i++) {
  //     pages.push(
  //       <button
  //         key={i}
  //         className={`w-8 h-8 rounded-md flex items-center justify-center ${
  //           currentPage === i ? 'bg-primary text-white' : 'bg-white text-[#1A1A1A]'
  //         }`}
  //         onClick={() => dispatch(setCurrentPage(i))}
  //       >
  //         {i}
  //       </button>
  //     );
  //   }

  //   return (
  //     <div className="flex items-center gap-2">
  //       <button
  //         className="w-8 h-8 rounded-md flex items-center justify-center bg-white text-[#1A1A1A] disabled:opacity-50"
  //         disabled={currentPage === 1}
  //         onClick={() => dispatch(setCurrentPage(currentPage - 1))}
  //       >
  //         <ChevronLeft size={16} />
  //       </button>

  //       {pages}

  //       {endPage < totalPages && (
  //         <>
  //           <span className="px-1">...</span>
  //           <button
  //             className="w-8 h-8 rounded-md flex items-center justify-center bg-white text-[#1A1A1A]"
  //             onClick={() => dispatch(setCurrentPage(totalPages))}
  //           >
  //             {totalPages}
  //           </button>
  //         </>
  //       )}

  //       <button
  //         className="w-8 h-8 rounded-md flex items-center justify-center bg-white text-[#1A1A1A] disabled:opacity-50"
  //         disabled={currentPage === totalPages}
  //         onClick={() => dispatch(setCurrentPage(currentPage + 1))}
  //       >
  //         <ChevronRight size={16} />
  //       </button>
  //     </div>
  //   );
  // };

  if (status === 'loading') {
    return <div className="flex justify-center p-8">Loading leads...</div>;
  }

  return (
    <>
      <div className="bg-white shadow-card overflow-hidden">
        <div className="w-full overflow-x-auto">
          <div className="min-w-max">
            <CustomTable
              columns={columns}
              data={leads}
              showCheckboxes={true}
              getRow={getRow}
            />
          </div>
        </div>
      </div>

      <div className="p-4 justify-end">
        <CustomPagination
          totalPages={1}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
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
