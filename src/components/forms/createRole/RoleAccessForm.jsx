// // import React from "react";

// // const RoleAccessForm = () => {
// //     const roleAPI = {
// //       roleModules: [
// //         {
// //           moduleID: 1,
// //           moduleName: "Lead Management Module",
// //           privilege: [
// //             {
// //               privilegeID: 1,
// //               fieldLevel: true,
// //               privilegeName: "Lead Information",
// //               fields: [
// //                 {
// //                   fieldID: 1,
// //                   fieldName: "First Name",
// //                   view: true,
// //                   edit: true,
// //                   mask: true,
// //                 },
// //                 {
// //                   fieldID: 2,
// //                   fieldName: "Second Name",
// //                   view: true,
// //                   edit: true,
// //                   mask: true,
// //                 },
// //               ],
// //             },
// //             {
// //               privilegeID: 6,
// //               fieldLevel: false,
// //               privilegeName: "Others",
// //               fields: [
// //                 {
// //                   fieldID: 12,
// //                   fieldName: "Create Lead",
// //                   view: true,
// //                 },
// //                 {
// //                   fieldID: 13,
// //                   fieldName: "Bulk Transfer Option",
// //                   view: true,
// //                 },
// //                 {
// //                   fieldID: 14,
// //                   fieldName: "Bulk Upload Option",
// //                   view: true,
// //                 },
// //               ],
// //             },
// //             {
// //               privilegeID: 7,
// //               fieldLevel: false,
// //               privilegeName: "Delete Access",
// //               fields: [
// //                 {
// //                   fieldID: 15,
// //                   fieldName: "Opportunity Lead",
// //                   view: true,
// //                 },
// //                 {
// //                   fieldID: 16,
// //                   fieldName: "Lead Delete",
// //                   view: true,
// //                 },
// //               ],
// //             },
// //             {
// //               privilgeID: 8,
// //               fieldLevel: false,
// //               privilegeName: "Dashboard Access",
// //               fields: [
// //                 {
// //                   fieldID: 17,
// //                   fieldName: "Lead Dashboard",
// //                   view: true,
// //                 },
// //               ],
// //             },
// //           ],
// //         },
// //       ],
// //     };

// //     return <div>New</div>;
// // };

// // export default RoleAccessForm;


// import React from "react";
// import { Formik, Form, Field, FieldArray } from "formik";
// import { Checkbox, FormControlLabel, Typography, Box, Divider } from "@mui/material";

// // const roleAPI = {
// //     roleModules: [
// //         {
// //             moduleID: 1,
// //             moduleName: "Lead Management Module",
// //             privilege: [
// //                 {
// //                     privilegeID: 1,
// //                     fieldLevel: true,
// //                     privilegeName: "Lead Information",
// //                     fields: [
// //                         {
// //                             fieldID: 1,
// //                             fieldName: "First Name",
// //                             view: true,
// //                             edit: true,
// //                             mask: true,
// //                         },
// //                         {
// //                             fieldID: 2,
// //                             fieldName: "Second Name",
// //                             view: true,
// //                             edit: true,
// //                             mask: true,
// //                         },
// //                     ],
// //                 },
// //                 {
// //                     privilegeID: 6,
// //                     fieldLevel: false,
// //                     privilegeName: "Others",
// //                     fields: [
// //                         { fieldID: 12, fieldName: "Create Lead", view: true },
// //                         { fieldID: 13, fieldName: "Bulk Transfer Option", view: true },
// //                         { fieldID: 14, fieldName: "Bulk Upload Option", view: true },
// //                     ],
// //                 },
// //             ],
// //         },
// //     ],
// // };

// // Transform API response into Formik initial values

// const roleAPI = {
//     roleModules: [
//         {
//             moduleID: 1,
//             moduleName: "Lead Management Module",
//             privilege: [
//                 {
//                     privilegeID: 1,
//                     fieldLevel: true,
//                     privilegeName: "Lead Information",
//                     fields: [
//                         {
//                             fieldID: 1,
//                             fieldName: "First Name",
//                             view: true,
//                             edit: true,
//                             mask: true,
//                         },
//                         {
//                             fieldID: 2,
//                             fieldName: "Last Name",
//                             view: true,
//                             edit: true,
//                             mask: true,
//                         },
//                         {
//                             fieldID: 3,
//                             fieldName: "Email",
//                             view: true,
//                             edit: true,
//                             mask: true,
//                         },
//                         {
//                             fieldID: 4,
//                             fieldName: "Secondary Email",
//                             view: true,
//                             edit: true,
//                             mask: false,
//                         },
//                         {
//                             fieldID: 5,
//                             fieldName: "Mobile Number",
//                             view: true,
//                             edit: true,
//                             mask: true,
//                         },
//                     ],
//                 },
//                 {
//                     privilegeID: 6,
//                     fieldLevel: false,
//                     privilegeName: "Others",
//                     fields: [
//                         {
//                             fieldID: 12,
//                             fieldName: "Create Lead",
//                             view: true,
//                         },
//                         {
//                             fieldID: 13,
//                             fieldName: "Bulk Transfer Option",
//                             view: true,
//                         },
//                         {
//                             fieldID: 14,
//                             fieldName: "Bulk Upload Option",
//                             view: true,
//                         },
//                     ],
//                 },
//                 {
//                     privilegeID: 7,
//                     fieldLevel: false,
//                     privilegeName: "Delete Access",
//                     fields: [
//                         {
//                             fieldID: 15,
//                             fieldName: "Opportunity Lead",
//                             view: true,
//                         },
//                         {
//                             fieldID: 16,
//                             fieldName: "Lead Delete",
//                             view: true,
//                         },
//                     ],
//                 },
//                 {
//                     privilgeID: 8,
//                     fieldLevel: false,
//                     privilegeName: "Dashboard Access",
//                     fields: [
//                         {
//                             fieldID: 17,
//                             fieldName: "Lead Dashboard",
//                             view: true,
//                         },
//                     ],
//                 },
//             ],
//         },
//     ],
// };

// const getInitialValues = () => ({
//     roleModules: roleAPI.roleModules.map(module => ({
//         moduleID: module.moduleID,
//         moduleName: module.moduleName,
//         privilege: module.privilege.map(priv => ({
//             privilegeID: priv.privilegeID,
//             fieldLevel: priv.fieldLevel,
//             privilegeName: priv.privilegeName,
//             fields: priv.fields.map(field => ({
//                 fieldID: field.fieldID,
//                 fieldName: field.fieldName,
//                 view: field.view ?? false,
//                 ...(priv.fieldLevel && {
//                     edit: field.edit ?? false,
//                     mask: field.mask ?? false,
//                 }),
//             })),
//         })),
//     })),
// });

// const RoleAccessForm = () => {

//     const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);

//     const handleSubmit = (values) => {
//         // Process or clean data if needed before sending
//         // const payload = {
//         //   roleModules: values.roleModules.map((module) => ({
//         //     moduleID: module.moduleID,
//         //     privilege: module.privilege.map((priv) => ({
//         //       privilegeID: priv.privilegeID,
//         //       fieldLevel: priv.fieldLevel,
//         //       fields: priv.fields.map((field) => ({
//         //         fieldID: field.fieldID,
//         //         view: field.view || false,
//         //         edit: field.edit || false,
//         //         mask: field.mask || false,
//         //       })),
//         //     })),
//         //   })),
//         // };

//         console.log("Submitting payload:", values);

//         // Example: Send it to API
//         // axios.post('/api/submitRoleAccess', payload)
//         //   .then(response => {
//         //     console.log('Success:', response.data);
//         //   })
//         //   .catch(error => {
//         //     console.error('Error submitting:', error);
//         //   });
//     };
//     return (
//         <Formik
//             initialValues={getInitialValues()}
//             onSubmit={handleSubmit}
//         >
//             {({ values, setFieldValue }) => (
//                 <Form>
//                     {values.roleModules.map((module, moduleIdx) => (
//                         <Box key={module.moduleID} mb={4}>
//                             <Typography variant="h6">{roleAPI.roleModules[moduleIdx].moduleName}</Typography>
//                             <Divider sx={{ mb: 2 }} />

//                             {module.privilege.map((priv, privIdx) => (
//                                 <Box key={priv.privilegeID} mb={3}>
//                                     <Typography variant="subtitle1" gutterBottom>
//                                         {roleAPI.roleModules[moduleIdx].privilege[privIdx].privilegeName}
//                                     </Typography>

//                                     {priv.fields.map((field, fieldIdx) => (
//                                         <Box key={field.fieldID} display="flex" alignItems="center" mb={1}>
//                                             <Typography sx={{ minWidth: 200 }}>{roleAPI.roleModules[moduleIdx].privilege[privIdx].fields[fieldIdx].fieldName}</Typography>

//                                             {/* Field Level True: Show Edit, View, Mask */}
//                                             {priv.fieldLevel ? (
//                                                 <>
//                                                     <FormControlLabel
//                                                         control={
//                                                             <Checkbox
//                                                                 checked={field.view}
//                                                                 onChange={(e) =>
//                                                                     setFieldValue(
//                                                                         `roleModules[${moduleIdx}].privilege[${privIdx}].fields[${fieldIdx}].view`,
//                                                                         e.target.checked
//                                                                     )
//                                                                 }
//                                                             />
//                                                         }
//                                                         label="View"
//                                                     />
//                                                     <FormControlLabel
//                                                         control={
//                                                             <Checkbox
//                                                                 checked={field.edit}
//                                                                 onChange={(e) =>
//                                                                     setFieldValue(
//                                                                         `roleModules[${moduleIdx}].privilege[${privIdx}].fields[${fieldIdx}].edit`,
//                                                                         e.target.checked
//                                                                     )
//                                                                 }
//                                                             />
//                                                         }
//                                                         label="Edit"
//                                                     />
//                                                     <FormControlLabel
//                                                         control={
//                                                             <Checkbox
//                                                                 checked={field.mask}
//                                                                 onChange={(e) =>
//                                                                     setFieldValue(
//                                                                         `roleModules[${moduleIdx}].privilege[${privIdx}].fields[${fieldIdx}].mask`,
//                                                                         e.target.checked
//                                                                     )
//                                                                 }
//                                                             />
//                                                         }
//                                                         label="Mask"
//                                                     />
//                                                 </>
//                                             ) : (
//                                                 // Field Level False: Only show View
//                                                 <FormControlLabel
//                                                     control={
//                                                         <Checkbox
//                                                             checked={field.view}
//                                                             onChange={(e) =>
//                                                                 setFieldValue(
//                                                                     `roleModules[${moduleIdx}].privilege[${privIdx}].fields[${fieldIdx}].view`,
//                                                                     e.target.checked
//                                                                 )
//                                                             }
//                                                         />
//                                                     }
//                                                     label="View"
//                                                 />
//                                             )}
//                                         </Box>
//                                     ))}
//                                 </Box>
//                             ))}
//                         </Box>
//                     ))}

//                     <button type="button"
//                         // onClick={() => {
//                         //     console.log("Current Formik Values:", values);
//                         // }}
//                         onClick={() => {
//                             const payload = values; // Already in correct format
//                             console.log("Final Payload:", JSON.stringify(payload, null, 2));
//                         }}
//                     >Submit</button>
//                 </Form>
//             )}
//         </Formik>
//     );
// };

// export default RoleAccessForm;

// import React, { useState } from "react";
// import {
//     Box,
//     Button,
//     Checkbox,
//     FormControlLabel,
//     Typography,
// } from "@mui/material";
// import { CustomButton } from "react-mui-tailwind";

// const RoleAccessForm = ({ values, setFieldValue }) => {
//     const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);

//     const selectedModule = values?.roleModules[selectedModuleIndex];

//     return (
//         <Box p={2}>

//             <div className="flex space-x-2">
//                 {values?.roleModules?.map((tab, index) => (
//                     <div key={tab?.moduleID}>
//                         <CustomButton
//                             key={tab?.moduleID}
//                             text={tab?.moduleName}
//                             variant="chips"
//                             rounded="full"
//                             startIcon={false}
//                             endIcon={false}
//                             onClick={() => setSelectedModuleIndex(index)}
//                             selected={selectedModuleIndex === index}
//                         />
//                     </div>
//                 ))}
//             </div>

//             {selectedModule?.privilege?.map((privilege, pIndex) => (
//                 <Box key={privilege?.privilegeID} mt={4}>
//                     <Typography fontWeight="bold" gutterBottom>
//                         {privilege?.privilegeName}
//                     </Typography>

//                     {/* Header Row */}
//                     {privilege?.fieldLevel && (
//                         <Box display="flex" justifyContent="space-between" mt={1} px={2}>
//                             <Box flex={1} />
//                             <Box display="flex" gap={4}>
//                                 <Typography fontWeight="bold">View</Typography>
//                                 <Typography fontWeight="bold">Edit</Typography>
//                                 <Typography fontWeight="bold">Mask</Typography>
//                             </Box>
//                         </Box>
//                     )}

//                     {/* Field Rows */}
//                     {privilege?.fields?.map((field, fIndex) => {
//                         const path = `roleModules[${selectedModuleIndex}].privilege[${pIndex}].fields[${fIndex}]`;

//                         return (
//                             <Box
//                                 key={field?.fieldID}
//                                 display="flex"
//                                 justifyContent="space-between"
//                                 alignItems="center"
//                                 mt={1}
//                                 px={2}
//                             >
//                                 <Typography flex={1}>{field?.fieldName}</Typography>

//                                 <Box display="flex" gap={4}>
//                                     <Checkbox
//                                         checked={field?.view}
//                                         onChange={(e) => setFieldValue(`${path}.view`, e.target.checked)}
//                                     />
//                                     {privilege?.fieldLevel && (
//                                         <>
//                                             <Checkbox
//                                                 checked={field?.edit}
//                                                 onChange={(e) => setFieldValue(`${path}.edit`, e.target.checked)}
//                                             />
//                                             <Checkbox
//                                                 checked={field?.mask}
//                                                 onChange={(e) => setFieldValue(`${path}.mask`, e.target.checked)}
//                                             />
//                                         </>
//                                     )}
//                                 </Box>
//                             </Box>
//                         );
//                     })}
//                 </Box>
//             ))}

//         </Box>
//     );
// };

// export default RoleAccessForm;



// import React, { useState } from "react";
// import {
//     Box,
//     Checkbox,
//     Typography,
// } from "@mui/material";
// import { CustomButton } from "react-mui-tailwind";

// const RoleAccessForm = ({ values, setFieldValue }) => {
//     const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
//     const selectedModule = values?.roleModules[selectedModuleIndex];

//     // Utility to check if all fields in a privilege have a type (view/edit/mask) set to true
//     const isAllChecked = (privilege, type) =>
//         privilege.fields?.length > 0 &&
//         privilege.fields?.every((field) => field?.[type]);

//     const handleToggleAll = (privilegeIndex, type, isChecked) => {
//         const fields = selectedModule?.privilege?.[privilegeIndex]?.fields || [];
//         fields.forEach((_, fieldIndex) => {
//             const path = `roleModules[${selectedModuleIndex}].privilege[${privilegeIndex}].fields[${fieldIndex}].${type}`;
//             setFieldValue(path, isChecked);
//         });
//     };

//     return (
//         <Box p={2}>
//             <div className="flex space-x-2">
//                 {values?.roleModules?.map((tab, index) => (
//                     <div key={tab?.moduleID}>
//                         <CustomButton
//                             key={tab?.moduleID}
//                             text={tab?.moduleName}
//                             variant="chips"
//                             rounded="full"
//                             startIcon={false}
//                             endIcon={false}
//                             onClick={() => setSelectedModuleIndex(index)}
//                             selected={selectedModuleIndex === index}
//                         />
//                     </div>
//                 ))}
//             </div>

//             {selectedModule?.privilege?.map((privilege, pIndex) => (
//                 <Box key={privilege?.privilegeID} mt={4}>
//                     <Typography fontWeight="bold" gutterBottom>
//                         {privilege?.privilegeName}
//                     </Typography>

//                     {/* Header Row */}
//                     {privilege?.fieldLevel && (
//                         <Box display="flex" justifyContent="space-between" mt={1} px={2}>
//                             <Box flex={1}></Box>
//                             <Box display="flex" gap={4}>
//                                 {["view", "edit", "mask"].map((type) =>
//                                     privilege.fields?.some((f) => f.hasOwnProperty(type)) ? (
//                                         <Box
//                                             key={type}
//                                             display="flex"
//                                             flexDirection="column"
//                                             alignItems="center"
//                                         >
//                                             <Checkbox
//                                                 checked={isAllChecked(privilege, type)}
//                                                 indeterminate={
//                                                     privilege.fields?.some((f) => f[type]) &&
//                                                     !isAllChecked(privilege, type)
//                                                 }
//                                                 onChange={(e) =>
//                                                     handleToggleAll(pIndex, type, e.target.checked)
//                                                 }
//                                             />
//                                             <Typography fontWeight="bold" sx={{ textTransform: "capitalize" }}>
//                                                 {type}
//                                             </Typography>
//                                         </Box>
//                                     ) : null
//                                 )}
//                             </Box>
//                         </Box>
//                     )}

//                     {/* Field Rows */}
//                     {privilege?.fields?.map((field, fIndex) => {
//                         const path = `roleModules[${selectedModuleIndex}].privilege[${pIndex}].fields[${fIndex}]`;

//                         return (
//                             <Box
//                                 key={field?.fieldID}
//                                 display="flex"
//                                 justifyContent="space-between"
//                                 alignItems="center"
//                                 mt={1}
//                                 px={2}
//                             >
//                                 <Typography flex={1}>{field?.fieldName}</Typography>
//                                 {/* <Box display="flex" gap={4}>
//                   {["view", "edit", "mask"].map(
//                     (type) =>
//                       field.hasOwnProperty(type) && (
//                         <Checkbox
//                           key={type}
//                           checked={field?.[type]}
//                           onChange={(e) =>
//                             setFieldValue(`${path}.${type}`, e.target.checked)
//                           }
//                         />
//                       )
//                   )}
//                 </Box> */}
//                                 <Box display="flex" gap={4}>
//                                     {/* View */}
//                                     {field.hasOwnProperty("view") && (
//                                         <Checkbox
//                                             checked={field.view}
//                                             onChange={(e) => {
//                                                 setFieldValue(`${path}.view`, e.target.checked);
//                                             }}
//                                         />
//                                     )}

//                                     {/* Edit */}
//                                     {field.hasOwnProperty("edit") && (
//                                         <Checkbox
//                                             checked={field.edit}
//                                             onChange={(e) => {
//                                                 const checked = e.target.checked;
//                                                 setFieldValue(`${path}.edit`, checked);
//                                                 // Force view to follow edit
//                                                 setFieldValue(`${path}.view`, checked);
//                                             }}
//                                         />
//                                     )}

//                                     {/* Mask */}
//                                     {field.hasOwnProperty("mask") && (
//                                         <Checkbox
//                                             checked={field.mask}
//                                             onChange={(e) => setFieldValue(`${path}.mask`, e.target.checked)}
//                                         />
//                                     )}
//                                 </Box>
//                             </Box>
//                         );
//                     })}
//                 </Box>
//             ))}
//         </Box>
//     );
// };

// export default RoleAccessForm;


import React, { useState } from "react";
import { Box, Checkbox, Typography } from "@mui/material";
import { CustomButton } from "react-mui-tailwind";

const RoleAccessForm = ({ values, setFieldValue }) => {
    const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
    const selectedModule = values?.roleModules[selectedModuleIndex];

    const isAllChecked = (privilege, type) =>
        privilege.fields?.length > 0 &&
        privilege.fields?.every((field) => field?.[type]);

    const handleToggleAll = (privilegeIndex, type, isChecked) => {
        const fields = selectedModule?.privilege?.[privilegeIndex]?.fields || [];

        fields.forEach((_, fieldIndex) => {
            const basePath = `roleModules[${selectedModuleIndex}].privilege[${privilegeIndex}].fields[${fieldIndex}]`;

            // Set the checkbox for the type (view/edit/mask)
            setFieldValue(`${basePath}.${type}`, isChecked);

            // Special logic: if type is edit, also update view accordingly
            if (type === "edit") {
                setFieldValue(`${basePath}.view`, isChecked);
            }

            // If unchecking view and edit is still true, unset edit too (to keep them in sync)
            if (type === "view" && !isChecked) {
                if (fields[fieldIndex].edit) {
                    setFieldValue(`${basePath}.edit`, false);
                }
            }
        });
    };

    const isAllFieldChecked = (privilege) => {
        return privilege.fields?.every((field) => field?.view);
    };

    const isSomeFieldChecked = (privilege) => {
        return privilege.fields?.some((field) => field?.view);
    };

    const handleTogglePrivilegeAll = (privilegeIndex, isChecked) => {
        const fields = selectedModule?.privilege?.[privilegeIndex]?.fields || [];
        fields.forEach((_, fieldIndex) => {
            const path = `roleModules[${selectedModuleIndex}].privilege[${privilegeIndex}].fields[${fieldIndex}].view`;
            setFieldValue(path, isChecked);
        });
    };

    const checkBoxStyle = {
        // height: "16px",
        // width: "16px",
        color: "#17222B",
        borderRadius: "5px"
    }

    return (
        <div className="form-section p-[16px] animate-fade-in">
            <h2 className="font-bold text-[19px] ">Role Access</h2>
            <Box pt={2} pb={2}>
                <div className="flex space-x-2 pt-3 pb-3">
                    {values?.roleModules?.map((tab, index) => (
                        <div key={tab?.moduleID}>
                            <CustomButton
                                key={tab?.moduleID}
                                text={tab?.moduleName}
                                variant="chips"
                                rounded="full"
                                startIcon={false}
                                endIcon={false}
                                onClick={() => setSelectedModuleIndex(index)}
                                selected={selectedModuleIndex === index}
                            />
                        </div>
                    ))}
                </div>

                {selectedModule?.privilege?.map((privilege, pIndex) => (
                    <Box key={privilege?.privilegeID} mt={4}>
                        <Box display="flex" alignItems="center" gap={1}>
                            {" "}
                            {!privilege.fieldLevel && (
                                <Checkbox
                                    checked={isAllFieldChecked(privilege)}
                                    indeterminate={
                                        isSomeFieldChecked(privilege) && !isAllFieldChecked(privilege)
                                    }
                                    onChange={(e) =>
                                        handleTogglePrivilegeAll(pIndex, e.target.checked)
                                    }
                                />
                            )}
                            <Typography fontWeight="bold">
                                {privilege?.privilegeName}
                            </Typography>
                        </Box>

                        {privilege?.fieldLevel && (
                            <Box display="flex" justifyContent="space-between" mt={1} px={2}>
                                <Box flex={1}></Box>
                                <Box display="flex" gap={4}>
                                    {["view", "edit", "mask"].map((type) =>
                                        privilege.fields?.some((f) => f.hasOwnProperty(type)) ? (
                                            <Box
                                                key={type}
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                            >
                                                <Checkbox
                                                    checked={isAllChecked(privilege, type)}
                                                    indeterminate={
                                                        privilege.fields?.some((f) => f[type]) &&
                                                        !isAllChecked(privilege, type)
                                                    }
                                                    onChange={(e) =>
                                                        handleToggleAll(pIndex, type, e.target.checked)
                                                    }
                                                />
                                                <Typography
                                                    fontWeight="bold"
                                                    sx={{ textTransform: "capitalize" }}
                                                >
                                                    {type}
                                                </Typography>
                                            </Box>
                                        ) : null
                                    )}
                                </Box>
                            </Box>
                        )}

                        {/* Field Rows */}
                        {privilege?.fields?.map((field, fIndex) => {
                            const basePath = `roleModules[${selectedModuleIndex}].privilege[${pIndex}].fields[${fIndex}]`;

                            return (
                                <Box
                                    key={field?.fieldID}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    mt={1}
                                    px={2}
                                >
                                    <Typography flex={1}>{field?.fieldName}</Typography>

                                    <Box display="flex" gap={4}>
                                        {/* View */}
                                        {field.hasOwnProperty("view") && (
                                            <Checkbox
                                                checked={field.view}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setFieldValue(`${basePath}.view`, checked);

                                                    // If unchecking view, and edit is true, also uncheck edit
                                                    if (!checked && field.edit) {
                                                        setFieldValue(`${basePath}.edit`, false);
                                                    }
                                                }}
                                            />
                                        )}

                                        {/* Edit */}
                                        {field.hasOwnProperty("edit") && (
                                            <Checkbox
                                                checked={field.edit}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setFieldValue(`${basePath}.edit`, checked);
                                                    // Sync view with edit
                                                    setFieldValue(`${basePath}.view`, checked);
                                                }}
                                            />
                                        )}

                                        {/* Mask */}
                                        {field.hasOwnProperty("mask") && (
                                            <Checkbox
                                                checked={field.mask}
                                                onChange={(e) =>
                                                    setFieldValue(`${basePath}.mask`, e.target.checked)
                                                }
                                            />
                                        )}
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                ))}




                {/* Second section  */}

                <Box display="flex" width={"100%"} gap={"24px"} mt={4}>
                    {/* Left Column: fieldLevel false */}
                    <div style={{ width: "33%" }}>
                        {selectedModule?.privilege
                            ?.filter((p) => !p.fieldLevel)
                            ?.map((privilege, pIndex) => {
                                const realIndex = selectedModule.privilege.findIndex(
                                    (pr) => pr.privilegeID === privilege.privilegeID
                                );

                                return (
                                    <div key={privilege?.privilegeID} style={{ backgroundColor: "#F2F6F8", padding: "12px", borderRadius: "12px", minWidth: "408px", width: "100%" }} >
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Checkbox
                                                style={checkBoxStyle}
                                                checked={isAllFieldChecked(privilege)}
                                                indeterminate={
                                                    isSomeFieldChecked(privilege) &&
                                                    !isAllFieldChecked(privilege)
                                                }
                                                onChange={(e) =>
                                                    handleTogglePrivilegeAll(realIndex, e.target.checked)
                                                }
                                            />
                                            <Typography style={{ wordBreak: "break-all" }} fontWeight="700">
                                                {privilege?.privilegeName}
                                            </Typography>
                                        </Box>

                                        {privilege?.fields?.map((field, fIndex) => {
                                            const basePath = `roleModules[${selectedModuleIndex}].privilege[${realIndex}].fields[${fIndex}]`;

                                            return (
                                                <Box
                                                    key={field?.fieldID}
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    mt={1}
                                                    px={2}
                                                >
                                                    <Typography style={{ wordBreak: "break-all" }} flex={1}>{field?.fieldName}</Typography>

                                                    {field.hasOwnProperty("view") && (
                                                        <Checkbox
                                                            style={checkBoxStyle}
                                                            checked={field.view}
                                                            onChange={(e) =>
                                                                setFieldValue(`${basePath}.view`, e.target.checked)
                                                            }
                                                        />
                                                    )}
                                                </Box>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                    </div>

                    {/* Right Column: fieldLevel true */}
                    <div style={{ width: "66%", display: "flex", gap: "24px" }}>
                        {selectedModule?.privilege
                            ?.filter((p) => p.fieldLevel)
                            ?.map((privilege, pIndex) => {
                                const realIndex = selectedModule.privilege.findIndex(
                                    (pr) => pr.privilegeID === privilege.privilegeID
                                );

                                return (
                                    <div key={privilege?.privilegeID} style={{ backgroundColor: "#F2F6F8", padding: "12px", borderRadius: "12px", minWidth: "408px", width: "100%" }} >
                                        <div display="flex" alignItems="center">
                                            <Typography style={{ wordBreak: "break-all" }} fontWeight="bold">
                                                {privilege?.privilegeName}
                                            </Typography>
                                        </div>

                                        <Box display="flex" justifyContent="space-between" pt={1} style={{borderBottom:"1px solid #CBDBE4"}}>
                                            <Box flex={1}>Select all</Box>
                                            <Box display="flex" gap={4}>
                                                {["view", "edit", "mask"].map((type) =>
                                                    privilege.fields?.some((f) => f.hasOwnProperty(type)) ? (
                                                        <Box
                                                            key={type}
                                                            display="flex"
                                                            flexDirection="column"
                                                            alignItems="center"
                                                        >
                                                            <Typography
                                                                fontWeight="bold"
                                                                sx={{ textTransform: "capitalize" }}
                                                            >
                                                                {type}
                                                            </Typography>
                                                            <Checkbox
                                                                style={checkBoxStyle}
                                                                checked={isAllChecked(privilege, type)}
                                                                indeterminate={
                                                                    privilege.fields?.some((f) => f[type]) &&
                                                                    !isAllChecked(privilege, type)
                                                                }
                                                                onChange={(e) =>
                                                                    handleToggleAll(realIndex, type, e.target.checked)
                                                                }
                                                            />
                                                        </Box>
                                                    ) : null
                                                )}
                                            </Box>
                                        </Box>

                                        {privilege?.fields?.map((field, fIndex) => {
                                            const basePath = `roleModules[${selectedModuleIndex}].privilege[${realIndex}].fields[${fIndex}]`;

                                            return (
                                                <Box
                                                    key={field?.fieldID}
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    mt={1}
                                                    // px={2}
                                                >
                                                    <Typography style={{ wordBreak: "break-all" }} flex={1}>{field?.fieldName}</Typography>

                                                    <Box display="flex" gap={4}>
                                                        {field.hasOwnProperty("view") && (
                                                            <Checkbox
                                                                style={checkBoxStyle}
                                                                checked={field.view}
                                                                onChange={(e) => {
                                                                    const checked = e.target.checked;
                                                                    setFieldValue(`${basePath}.view`, checked);
                                                                    if (!checked && field.edit) {
                                                                        setFieldValue(`${basePath}.edit`, false);
                                                                    }
                                                                }}
                                                            />
                                                        )}
                                                        {field.hasOwnProperty("edit") && (
                                                            <Checkbox
                                                                style={checkBoxStyle}
                                                                checked={field.edit}
                                                                onChange={(e) => {
                                                                    const checked = e.target.checked;
                                                                    setFieldValue(`${basePath}.edit`, checked);
                                                                    setFieldValue(`${basePath}.view`, checked);
                                                                }}
                                                            />
                                                        )}
                                                        {field.hasOwnProperty("mask") && (
                                                            <Checkbox
                                                                style={checkBoxStyle}
                                                                checked={field.mask}
                                                                onChange={(e) =>
                                                                    setFieldValue(`${basePath}.mask`, e.target.checked)
                                                                }
                                                            />
                                                        )}
                                                    </Box>
                                                </Box>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                    </div>
                </Box>
            </Box>
        </div>
    );
};

export default RoleAccessForm;



// import React, { useState } from "react";
// import {
//     Box,
//     Checkbox,
//     Typography,
// } from "@mui/material";
// import { CustomButton } from "react-mui-tailwind";

// const RoleAccessForm = ({ values, setFieldValue }) => {
//     const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
//     const selectedModule = values?.roleModules[selectedModuleIndex];

//     const isAllChecked = (privilege, type) =>
//         privilege.fields?.length > 0 &&
//         privilege.fields?.every((field) => field?.[type]);

//     const handleToggleAll = (privilegeIndex, type, isChecked) => {
//         const fields = selectedModule?.privilege?.[privilegeIndex]?.fields || [];
//         fields.forEach((_, fieldIndex) => {
//             const path = `roleModules[${selectedModuleIndex}].privilege[${privilegeIndex}].fields[${fieldIndex}].${type}`;
//             setFieldValue(path, isChecked);
//         });
//     };

//     const isAllFieldChecked = (privilege) => {
//         return privilege.fields?.every((field) => field?.view);
//     };

//     const isSomeFieldChecked = (privilege) => {
//         return privilege.fields?.some((field) => field?.view);
//     };

//     const handleTogglePrivilegeAll = (privilegeIndex, isChecked) => {
//         const fields = selectedModule?.privilege?.[privilegeIndex]?.fields || [];
//         fields.forEach((_, fieldIndex) => {
//             const path = `roleModules[${selectedModuleIndex}].privilege[${privilegeIndex}].fields[${fieldIndex}].view`;
//             setFieldValue(path, isChecked);
//         });
//     };

//     return (
//         <Box p={2}>
//             <div className="flex space-x-2">
//                 {values?.roleModules?.map((tab, index) => (
//                     <div key={tab?.moduleID}>
//                         <CustomButton
//                             key={tab?.moduleID}
//                             text={tab?.moduleName}
//                             variant="chips"
//                             rounded="full"
//                             startIcon={false}
//                             endIcon={false}
//                             onClick={() => setSelectedModuleIndex(index)}
//                             selected={selectedModuleIndex === index}
//                         />
//                     </div>
//                 ))}
//             </div>

//             {selectedModule?.privilege?.map((privilege, pIndex) => (
//                 <Box key={privilege?.privilegeID} mt={4}>
//                     {/* PRIVILEGE NAME ROW */}
//                     <Box display="flex" alignItems="center" gap={1}>
//                         {!privilege.fieldLevel && (
//                             <Checkbox
//                                 checked={isAllFieldChecked(privilege)}
//                                 indeterminate={
//                                     isSomeFieldChecked(privilege) && !isAllFieldChecked(privilege)
//                                 }
//                                 onChange={(e) =>
//                                     handleTogglePrivilegeAll(pIndex, e.target.checked)
//                                 }
//                             />
//                         )}
//                         <Typography fontWeight="bold">
//                             {privilege?.privilegeName}
//                         </Typography>
//                     </Box>

//                     {/* FIELD LEVEL CHECKBOX HEADERS */}
//                     {privilege?.fieldLevel && (
//                         <Box display="flex" justifyContent="space-between" mt={1} px={2}>
//                             <Box flex={1}></Box>
//                             <Box display="flex" gap={4}>
//                                 {["view", "edit", "mask"].map((type) =>
//                                     privilege.fields?.some((f) => f.hasOwnProperty(type)) ? (
//                                         <Box
//                                             key={type}
//                                             display="flex"
//                                             flexDirection="column"
//                                             alignItems="center"
//                                         >
//                                             <Checkbox
//                                                 checked={isAllChecked(privilege, type)}
//                                                 indeterminate={
//                                                     privilege.fields?.some((f) => f[type]) &&
//                                                     !isAllChecked(privilege, type)
//                                                 }
//                                                 onChange={(e) =>
//                                                     handleToggleAll(pIndex, type, e.target.checked)
//                                                 }
//                                             />
//                                             <Typography fontWeight="bold" sx={{ textTransform: "capitalize" }}>
//                                                 {type}
//                                             </Typography>
//                                         </Box>
//                                     ) : null
//                                 )}
//                             </Box>
//                         </Box>
//                     )}

//                     {/* FIELDS */}
//                     {privilege?.fields?.map((field, fIndex) => {
//                         const path = `roleModules[${selectedModuleIndex}].privilege[${pIndex}].fields[${fIndex}]`;

//                         return (
//                             <Box
//                                 key={field?.fieldID}
//                                 display="flex"
//                                 justifyContent="space-between"
//                                 alignItems="center"
//                                 mt={1}
//                                 px={2}
//                             >
//                                 <Typography flex={1}>{field?.fieldName}</Typography>

//                                 <Box display="flex" gap={4}>
//                                     {/* fieldLevel = false: single checkbox */}
//                                     {!privilege.fieldLevel && (
//                                         <Checkbox
//                                             checked={field?.view || false}
//                                             onChange={(e) =>
//                                                 setFieldValue(`${path}.view`, e.target.checked)
//                                             }
//                                         />
//                                     )}

//                                     {/* fieldLevel = true: show view/edit/mask */}
//                                     {privilege.fieldLevel && (
//                                         <>
//                                             {field.hasOwnProperty("view") && (
//                                                 <Checkbox
//                                                     checked={field.view}
//                                                     onChange={(e) => {
//                                                         setFieldValue(`${path}.view`, e.target.checked);
//                                                     }}
//                                                 />
//                                             )}
//                                             {field.hasOwnProperty("edit") && (
//                                                 <Checkbox
//                                                     checked={field.edit}
//                                                     onChange={(e) => {
//                                                         const checked = e.target.checked;
//                                                         setFieldValue(`${path}.edit`, checked);
//                                                         setFieldValue(`${path}.view`, checked);
//                                                     }}
//                                                 />
//                                             )}
//                                             {field.hasOwnProperty("mask") && (
//                                                 <Checkbox
//                                                     checked={field.mask}
//                                                     onChange={(e) =>
//                                                         setFieldValue(`${path}.mask`, e.target.checked)
//                                                     }
//                                                 />
//                                             )}
//                                         </>
//                                     )}
//                                 </Box>
//                             </Box>
//                         );
//                     })}
//                 </Box>
//             ))}
//         </Box>
//     );
// };

// export default RoleAccessForm;
