// import React, { useState, useEffect } from 'react';
// import { Box, Container, Typography, CircularProgress } from '@mui/material';
// import RoleManagementForm from './RoleManagementForm';
// // Import any API services you need
// // import { createRole, updateRole, getRoleById } from '../api/services/roleAPIs';

// const RoleManagementPage = ({ roleId, mode = "create" }) => {
//   const [loading, setLoading] = useState(mode === "edit");
//   const [roleData, setRoleData] = useState(null);
//   const [error, setError] = useState(null);

//   // Fetch role data if in edit mode
//   useEffect(() => {
//     const fetchRoleData = async () => {
//       if (mode === "edit" && roleId) {
//         try {
//           setLoading(true);
//           // Uncomment when you have the API
//           // const response = await getRoleById(roleId);
//           // setRoleData(response.data);
          
//           // For testing, use this mock data:
//           setTimeout(() => {
//             setRoleData({
//               roleName: "Admin Role",
//               roleType: "1", // Assuming this is the ID from your dropdown
//               permissions: {
//                 leadManagement: {
//                   selected: false,
//                   subsections: {
//                     leadFormViewPermission: {
//                       selected: false,
//                       fields: {}
//                     },
//                     leadInfo: {
//                       selected: false,
//                       fields: {
//                         firstName: true,
//                         lastName: true,
//                         status: false
//                       }
//                     },
//                     leadEducation: {
//                       selected: false,
//                       fields: {
//                         highestEducation: false,
//                         grade: true,
//                         year: false
//                       }
//                     }
//                   }
//                 }
//               }
//             });
//             setLoading(false);
//           }, 1000);
//         } catch (err) {
//           console.error('Error fetching role data:', err);
//           setError('Failed to load role data. Please try again.');
//           setLoading(false);
//         }
//       }
//     };

//     fetchRoleData();
//   }, [roleId, mode]);

//   const handleSubmit = async (formData) => {
//     try {
//       if (mode === "create") {
//         // Uncomment when you have the API
//         // await createRole(formData);
//         console.log('Creating new role with data:', formData);
//       } else {
//         // Uncomment when you have the API
//         // await updateRole(roleId, formData);
//         console.log('Updating role with data:', formData);
//       }
      
//       // Handle success (redirect, show message, etc.)
//       alert('Role successfully ' + (mode === "create" ? "created" : "updated"));
      
//       // Redirect to role listing page or other appropriate page
//       // history.push('/roles');
//     } catch (err) {
//       console.error('Error submitting role data:', err);
//       // Handle error (show error message, etc.)
//       alert('Failed to ' + (mode === "create" ? "create" : "update") + ' role. Please try again.');
//     }
//   };

//   if (loading) {
//     return (
//       <Container>
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//           <CircularProgress />
//         </Box>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container>
//         <Box sx={{ p: 4, textAlign: 'center' }}>
//           <Typography color="error">{error}</Typography>
//         </Box>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Box sx={{ py: 4 }}>
//         <RoleManagementForm 
//           initialValues={roleData || {}}
//           onSubmit={handleSubmit}
//           mode={mode}
//         />
//       </Box>
//     </Container>
//   );
// };

// export default RoleManagementPage;
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import RoleManagementForm from './RoleManagementForm';

const RoleManagementPage = ({ roleId, mode = "create" }) => {
  const [loading, setLoading] = useState(mode === "edit");
  const [roleData, setRoleData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch role data if in edit mode
  useEffect(() => {
    const fetchRoleData = async () => {
      if (mode === "edit" && roleId) {
        try {
          setLoading(true);
          // Uncomment when you have the API
          // const response = await getRoleById(roleId);
          // setRoleData(response.data);
          
          // For testing, use this mock data:
          setTimeout(() => {
            setRoleData({
              roleName: "Admin Role",
              roleType: "1", // Assuming this is the ID from your dropdown
              permissions: {
                leadManagement: {
                  selected: false,
                  subsections: {
                    leadFormViewPermission: {
                      selected: false,
                      subsections: {
                        leadInfo: {
                          selected: false,
                          fields: {
                            firstName: true,
                            lastName: true,
                            status: false
                          }
                        },
                        leadEducation: {
                          selected: false,
                          fields: {
                            highestEducation: false,
                            grade: true,
                            year: false
                          }
                        }
                      }
                    }
                  }
                }
              }
            });
            setLoading(false);
          }, 1000);
        } catch (err) {
          console.error('Error fetching role data:', err);
          setError('Failed to load role data. Please try again.');
          setLoading(false);
        }
      }
    };

    fetchRoleData();
  }, [roleId, mode]);

  const handleSubmit = async (formData) => {
    try {
      if (mode === "create") {
        // Uncomment when you have the API
        // await createRole(formData);
        console.log('Creating new role with data:', formData);
      } else {
        // Uncomment when you have the API
        // await updateRole(roleId, formData);
        console.log('Updating role with data:', formData);
      }
      
      // Handle success (redirect, show message, etc.)
      alert('Role successfully ' + (mode === "create" ? "created" : "updated"));
      
      // Redirect to role listing page or other appropriate page
      // history.push('/roles');
    } catch (err) {
      console.error('Error submitting role data:', err);
      // Handle error (show error message, etc.)
      alert('Failed to ' + (mode === "create" ? "create" : "update") + ' role. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <RoleManagementForm
          initialValues={roleData || {}}
          onSubmit={handleSubmit}
          mode={mode}
        />
      </Box>
    </Container>
  );
};

export default RoleManagementPage;