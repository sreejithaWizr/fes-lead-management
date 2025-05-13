// 

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Box, Typography, Paper } from '@mui/material';
import RoleInformationForm from '../createRole/RoleInformationForm';
import RoleAccessForm from './RoleAccessForm';

const validationSchema = Yup.object({
  roleName: Yup.string().required('Role name is required'),
  roleType: Yup.string().required('Role type is required'),
  // Add other validation rules as needed
});

const RoleManagementForm = ({ initialValues = {}, onSubmit, mode = "edit" }) => {
  const [loading, setLoading] = useState(false);
  
  const defaultValues = {
    roleName: '',
    roleType: '',
    permissions: null,
    ...initialValues
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values)
    setLoading(true);
    try {
      // Prepare payload for API submission
      const payload = {
        ...values,
        // Transform permissions if needed for API format
      };
      
      console.log('Form submission payload:', payload);
      
      // Call the API
      if (onSubmit) {
        await onSubmit(payload);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {mode === "create" ? "Create Role" : "Edit Role"}
        </Typography>
        
        <Formik
          initialValues={defaultValues}
          // validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => (
            <Form>
              {/* Role Information Section */}
              <RoleInformationForm
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                setFieldValue={formik.setFieldValue}
                mode={mode}
              />
              
              {/* Role Access Permission Section */}
              <RoleAccessForm 
                values={formik.values}
                setFieldValue={formik.setFieldValue}
              />
              
              {/* Form Actions */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mr: 2 }}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  // disabled={loading || !formik.isValid}
                >
                  {loading ? 'Saving...' : mode === "create" ? "Create" : "Save"}
                </Button>
              </Box>
              
              {/* For debugging - remove in production */}
              <Box sx={{ mt: 4, p: 2, border: '1px dashed #ccc', borderRadius: 1, display: 'none' }}>
                <Typography variant="subtitle2">Form Values (Debug):</Typography>
                <pre>{JSON.stringify(formik.values, null, 2)}</pre>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default RoleManagementForm;