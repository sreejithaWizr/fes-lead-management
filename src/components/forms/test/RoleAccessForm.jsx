import React, { useState, useEffect } from 'react';
import { 
  Checkbox, 
  FormControlLabel, 
  Typography, 
  Box, 
  Divider 
} from '@mui/material';

const RoleAccessForm = ({ values, setFieldValue }) => {
  // Function to check if all children of a section are checked
  const areAllChildrenChecked = (parentSection) => {
    const permissions = values.permissions || {};
    const section = permissions[parentSection] || {};
    
    // Check if there are any subsections
    if (section.subsections) {
      // Check all subsections and their fields
      return Object.keys(section.subsections).every(subsectionKey => {
        const subsection = section.subsections[subsectionKey];
        return subsection.selected && 
          Object.keys(subsection.fields || {}).every(field => subsection.fields[field]);
      });
    }
    return false;
  };

  // Function to check if any child of a section is checked
  const isAnyChildChecked = (parentSection) => {
    const permissions = values.permissions || {};
    const section = permissions[parentSection] || {};
    
    if (section.subsections) {
      return Object.keys(section.subsections).some(subsectionKey => {
        const subsection = section.subsections[subsectionKey];
        return subsection.selected || 
          Object.keys(subsection.fields || {}).some(field => subsection.fields[field]);
      });
    }
    return false;
  };

  // Handle main section toggle
  const handleMainSectionToggle = (sectionKey) => {
    const newPermissions = { ...values.permissions };
    
    // Initialize if not exist
    if (!newPermissions[sectionKey]) {
      newPermissions[sectionKey] = { selected: false, subsections: {} };
    }
    
    const newSelected = !newPermissions[sectionKey].selected;
    newPermissions[sectionKey].selected = newSelected;
    
    // Update all children when parent is toggled
    if (newPermissions[sectionKey].subsections) {
      Object.keys(newPermissions[sectionKey].subsections).forEach(subsectionKey => {
        const subsection = newPermissions[sectionKey].subsections[subsectionKey];
        subsection.selected = newSelected;
        
        // Update all fields in subsection
        if (subsection.fields) {
          Object.keys(subsection.fields).forEach(field => {
            subsection.fields[field] = newSelected;
          });
        }
      });
    }
    
    setFieldValue('permissions', newPermissions);
  };

  // Handle subsection toggle
  const handleSubSectionToggle = (sectionKey, subsectionKey) => {
    const newPermissions = { ...values.permissions };
    
    // Initialize if not exist
    if (!newPermissions[sectionKey]) {
      newPermissions[sectionKey] = { selected: false, subsections: {} };
    }
    if (!newPermissions[sectionKey].subsections[subsectionKey]) {
      newPermissions[sectionKey].subsections[subsectionKey] = { selected: false, fields: {} };
    }
    
    const newSelected = !newPermissions[sectionKey].subsections[subsectionKey].selected;
    newPermissions[sectionKey].subsections[subsectionKey].selected = newSelected;
    
    // Update all fields in this subsection
    const fields = newPermissions[sectionKey].subsections[subsectionKey].fields || {};
    Object.keys(fields).forEach(field => {
      fields[field] = newSelected;
    });
    
    // Update parent section based on children states
    newPermissions[sectionKey].selected = Object.keys(newPermissions[sectionKey].subsections).every(key => 
      newPermissions[sectionKey].subsections[key].selected
    );
    
    setFieldValue('permissions', newPermissions);
  };

  // Handle field toggle
  const handleFieldToggle = (sectionKey, subsectionKey, fieldKey) => {
    const newPermissions = { ...values.permissions };
    
    // Initialize if not exist
    if (!newPermissions[sectionKey]) {
      newPermissions[sectionKey] = { selected: false, subsections: {} };
    }
    if (!newPermissions[sectionKey].subsections[subsectionKey]) {
      newPermissions[sectionKey].subsections[subsectionKey] = { selected: false, fields: {} };
    }
    if (!newPermissions[sectionKey].subsections[subsectionKey].fields) {
      newPermissions[sectionKey].subsections[subsectionKey].fields = {};
    }
    
    // Toggle field value
    const newValue = !newPermissions[sectionKey].subsections[subsectionKey].fields[fieldKey];
    newPermissions[sectionKey].subsections[subsectionKey].fields[fieldKey] = newValue;
    
    // Update subsection selected state based on its fields
    const fields = newPermissions[sectionKey].subsections[subsectionKey].fields;
    newPermissions[sectionKey].subsections[subsectionKey].selected = 
      Object.keys(fields).every(key => fields[key]);
    
    // Update parent section based on children states
    newPermissions[sectionKey].selected = Object.keys(newPermissions[sectionKey].subsections).every(key => 
      newPermissions[sectionKey].subsections[key].selected
    );
    
    setFieldValue('permissions', newPermissions);
  };

  // Get the value of a field
  const getFieldValue = (sectionKey, subsectionKey, fieldKey) => {
    return values.permissions?.[sectionKey]?.subsections?.[subsectionKey]?.fields?.[fieldKey] || false;
  };

  // Get subsection selected state
  const getSubsectionSelected = (sectionKey, subsectionKey) => {
    return values.permissions?.[sectionKey]?.subsections?.[subsectionKey]?.selected || false;
  };

  // Get section selected state
  const getSectionSelected = (sectionKey) => {
    return values.permissions?.[sectionKey]?.selected || false;
  };

  // Initialize default permissions structure if empty
  useEffect(() => {
    if (!values.permissions) {
      const defaultPermissions = {
        leadManagement: {
          selected: false,
          subsections: {
            leadFormViewPermission: {
              selected: false,
              subsections: {
                leadInfo: {
                  selected: false,
                  fields: {
                    firstName: false,
                    lastName: false,
                    status: false
                  }
                },
                leadEducation: {
                  selected: false,
                  fields: {
                    highestEducation: false,
                    grade: false,
                    year: false
                  }
                }
              }
            }
          }
        }
      };
      setFieldValue('permissions', defaultPermissions);
    }
  }, []);

  return (
    <div className="form-section animate-fade-in ml-0 mb-6 p-4">
      <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
        Role Access
      </h2>

      <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', p: 2, mb: 2 }}>
        {/* Lead Management Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Lead Management</Typography>
          <FormControlLabel
            control={
              <Checkbox 
                checked={getSectionSelected('leadManagement')}
                onChange={() => handleMainSectionToggle('leadManagement')}
                color="primary"
              />
            }
            label="Select All"
          />
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {/* Lead Form View Permission */}
        <Box sx={{ ml: 2, mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={getSubsectionSelected('leadManagement', 'leadFormViewPermission')}
                onChange={() => handleSubSectionToggle('leadManagement', 'leadFormViewPermission')}
                color="primary"
                indeterminate={
                  values.permissions?.leadManagement?.subsections?.leadFormViewPermission?.subsections &&
                  Object.keys(values.permissions.leadManagement.subsections.leadFormViewPermission.subsections).some(key => 
                    values.permissions.leadManagement.subsections.leadFormViewPermission.subsections[key].selected ||
                    (values.permissions.leadManagement.subsections.leadFormViewPermission.subsections[key].fields &&
                    Object.values(values.permissions.leadManagement.subsections.leadFormViewPermission.subsections[key].fields).some(Boolean))
                  ) &&
                  !Object.keys(values.permissions.leadManagement.subsections.leadFormViewPermission.subsections).every(key => 
                    values.permissions.leadManagement.subsections.leadFormViewPermission.subsections[key].selected
                  )
                }
              />
            }
            label={<Typography sx={{ fontWeight: 500 }}>Lead Form View Permission</Typography>}
          />
          
          {/* Lead Info subsection */}
          <Box sx={{ ml: 4, mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={values.permissions?.leadManagement?.subsections?.leadFormViewPermission?.subsections?.leadInfo?.selected || false}
                  onChange={() => {
                    const newPermissions = { ...values.permissions };
                    if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections) {
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections = {};
                    }
                    if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo) {
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo = { selected: false, fields: {} };
                    }
                    
                    const newSelected = !newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.selected;
                    newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.selected = newSelected;
                    
                    // Update all fields
                    const fields = newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields;
                    Object.keys(fields).forEach(field => {
                      fields[field] = newSelected;
                    });
                    
                    // Update parent's selected state based on all children
                    const allSubsectionsSelected = Object.keys(newPermissions.leadManagement.subsections.leadFormViewPermission.subsections).every(key => 
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections[key].selected
                    );
                    newPermissions.leadManagement.subsections.leadFormViewPermission.selected = allSubsectionsSelected;
                    
                    setFieldValue('permissions', newPermissions);
                  }}
                  color="primary"
                  indeterminate={
                    values.permissions?.leadManagement?.subsections?.leadFormViewPermission?.subsections?.leadInfo?.fields &&
                    Object.values(values.permissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields).some(Boolean) &&
                    !Object.values(values.permissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields).every(Boolean)
                  }
                />
              }
              label={<Typography sx={{ fontWeight: 500 }}>Lead Info</Typography>}
            />
            
            {/* Lead Info fields */}
            <Box sx={{ ml: 4 }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={values.permissions?.leadManagement?.subsections?.leadFormViewPermission?.subsections?.leadInfo?.fields?.firstName || false}
                    onChange={() => {
                      const newPermissions = { ...values.permissions };
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections = {};
                      }
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo = { selected: false, fields: {} };
                      }
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields = {};
                      }
                      
                      const newValue = !newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields.firstName;
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields.firstName = newValue;
                      
                      // Update subsection selected state based on all fields
                      const allFieldsSelected = Object.values(newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields).every(Boolean);
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.selected = allFieldsSelected;
                      
                      // Update parent's selected state based on all children
                      const allSubsectionsSelected = Object.keys(newPermissions.leadManagement.subsections.leadFormViewPermission.subsections).every(key => 
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections[key].selected
                      );
                      newPermissions.leadManagement.subsections.leadFormViewPermission.selected = allSubsectionsSelected;
                      
                      setFieldValue('permissions', newPermissions);
                    }}
                    color="primary"
                  />
                }
                label="First Name"
              />
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={values.permissions?.leadManagement?.subsections?.leadFormViewPermission?.subsections?.leadInfo?.fields?.lastName || false}
                    onChange={() => {
                      const newPermissions = { ...values.permissions };
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections = {};
                      }
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo = { selected: false, fields: {} };
                      }
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields = {};
                      }
                      
                      const newValue = !newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields.lastName;
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields.lastName = newValue;
                      
                      // Update subsection selected state based on all fields
                      const allFieldsSelected = Object.values(newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields).every(Boolean);
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.selected = allFieldsSelected;
                      
                      // Update parent's selected state based on all children
                      const allSubsectionsSelected = Object.keys(newPermissions.leadManagement.subsections.leadFormViewPermission.subsections).every(key => 
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections[key].selected
                      );
                      newPermissions.leadManagement.subsections.leadFormViewPermission.selected = allSubsectionsSelected;
                      
                      setFieldValue('permissions', newPermissions);
                    }}
                    color="primary"
                  />
                }
                label="Last Name"
              />
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={values.permissions?.leadManagement?.subsections?.leadFormViewPermission?.subsections?.leadInfo?.fields?.status || false}
                    onChange={() => {
                      const newPermissions = { ...values.permissions };
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections = {};
                      }
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo = { selected: false, fields: {} };
                      }
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields = {};
                      }
                      
                      const newValue = !newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields.status;
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields.status = newValue;
                      
                      // Update subsection selected state based on all fields
                      const allFieldsSelected = Object.values(newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.fields).every(Boolean);
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadInfo.selected = allFieldsSelected;
                      
                      // Update parent's selected state based on all children
                      const allSubsectionsSelected = Object.keys(newPermissions.leadManagement.subsections.leadFormViewPermission.subsections).every(key => 
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections[key].selected
                      );
                      newPermissions.leadManagement.subsections.leadFormViewPermission.selected = allSubsectionsSelected;
                      
                      setFieldValue('permissions', newPermissions);
                    }}
                    color="primary"
                  />
                }
                label="Status"
              />
            </Box>
          </Box>
          
          {/* Lead Education subsection */}
          <Box sx={{ ml: 4 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={values.permissions?.leadManagement?.subsections?.leadFormViewPermission?.subsections?.leadEducation?.selected || false}
                  onChange={() => {
                    const newPermissions = { ...values.permissions };
                    if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections) {
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections = {};
                    }
                    if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation) {
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation = { selected: false, fields: {} };
                    }
                    
                    const newSelected = !newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.selected;
                    newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.selected = newSelected;
                    
                    // Update all fields
                    const fields = newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields;
                    Object.keys(fields).forEach(field => {
                      fields[field] = newSelected;
                    });
                    
                    // Update parent's selected state based on all children
                    const allSubsectionsSelected = Object.keys(newPermissions.leadManagement.subsections.leadFormViewPermission.subsections).every(key => 
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections[key].selected
                    );
                    newPermissions.leadManagement.subsections.leadFormViewPermission.selected = allSubsectionsSelected;
                    
                    setFieldValue('permissions', newPermissions);
                  }}
                  color="primary"
                  indeterminate={
                    values.permissions?.leadManagement?.subsections?.leadFormViewPermission?.subsections?.leadEducation?.fields &&
                    Object.values(values.permissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields).some(Boolean) &&
                    !Object.values(values.permissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields).every(Boolean)
                  }
                />
              }
              label={<Typography sx={{ fontWeight: 500 }}>Lead Education</Typography>}
            />
            
            {/* Lead Education fields */}
            <Box sx={{ ml: 4 }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={values.permissions?.leadManagement?.subsections?.leadFormViewPermission?.subsections?.leadEducation?.fields?.highestEducation || false}
                    onChange={() => {
                      const newPermissions = { ...values.permissions };
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections = {};
                      }
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation = { selected: false, fields: {} };
                      }
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields = {};
                      }
                      
                      const newValue = !newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields.highestEducation;
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields.highestEducation = newValue;
                      
                      // Update subsection selected state based on all fields
                      const allFieldsSelected = Object.values(newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields).every(Boolean);
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.selected = allFieldsSelected;
                      
                      // Update parent's selected state based on all children
                      const allSubsectionsSelected = Object.keys(newPermissions.leadManagement.subsections.leadFormViewPermission.subsections).every(key => 
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections[key].selected
                      );
                      newPermissions.leadManagement.subsections.leadFormViewPermission.selected = allSubsectionsSelected;
                      
                      setFieldValue('permissions', newPermissions);
                    }}
                    color="primary"
                  />
                }
                label="Highest Education"
              />
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={values.permissions?.leadManagement?.subsections?.leadFormViewPermission?.subsections?.leadEducation?.fields?.grade || false}
                    onChange={() => {
                      const newPermissions = { ...values.permissions };
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections = {};
                      }
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation = { selected: false, fields: {} };
                      }
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields = {};
                      }
                      
                      const newValue = !newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields.grade;
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields.grade = newValue;
                      
                      // Update subsection selected state based on all fields
                      const allFieldsSelected = Object.values(newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields).every(Boolean);
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.selected = allFieldsSelected;
                      
                      // Update parent's selected state based on all children
                      const allSubsectionsSelected = Object.keys(newPermissions.leadManagement.subsections.leadFormViewPermission.subsections).every(key => 
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections[key].selected
                      );
                      newPermissions.leadManagement.subsections.leadFormViewPermission.selected = allSubsectionsSelected;
                      
                      setFieldValue('permissions', newPermissions);
                    }}
                    color="primary"
                  />
                }
                label="Grade"
              />
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={values.permissions?.leadManagement?.subsections?.leadFormViewPermission?.subsections?.leadEducation?.fields?.year || false}
                    onChange={() => {
                      const newPermissions = { ...values.permissions };
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections = {};
                      }
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation = { selected: false, fields: {} };
                      }
                      if (!newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields) {
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields = {};
                      }
                      
                      const newValue = !newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields.year;
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields.year = newValue;
                      
                      // Update subsection selected state based on all fields
                      const allFieldsSelected = Object.values(newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.fields).every(Boolean);
                      newPermissions.leadManagement.subsections.leadFormViewPermission.subsections.leadEducation.selected = allFieldsSelected;
                      
                      // Update parent's selected state based on all children
                      const allSubsectionsSelected = Object.keys(newPermissions.leadManagement.subsections.leadFormViewPermission.subsections).every(key => 
                        newPermissions.leadManagement.subsections.leadFormViewPermission.subsections[key].selected
                      );
                      newPermissions.leadManagement.subsections.leadFormViewPermission.selected = allSubsectionsSelected;
                      
                      setFieldValue('permissions', newPermissions);
                    }}
                    color="primary"
                  />
                }
                label="Year"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default RoleAccessForm;
