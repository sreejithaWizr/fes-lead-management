import React, { useEffect, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import LeadInformationForm from '../components/forms/createLead/leadInfoForm';
import EducationQualificationForm from '../components/forms/createLead/leadEducationForm';
import LeadStatusForm from '../components/forms/createLead/leadStatusForm';
import LeadSourceForm from '../components/forms/createLead/leadSourceForm';
import { validationSchema } from '../components/forms/createLead/schema';
import { CustomButton } from 'react-mui-tailwind'
import WarningIcon from '../assets/warning-icon.svg'

const ErrorObserver = ({ setTabErrors }) => {
  const { errors, touched } = useFormikContext();

  useEffect(() => {
    // Group errors by tab sections
    const leadInfoFields = ['firstName', 'lastName', 'email', 'secondaryEmail', 'mobileNumber', 'alternativeNumber', 'whatsappNumber', 'leadOwner', 'leadStatusInfo', 'priority', 'teleCallerName', 'leadCreated', 'leadNumber', 'agreeToReceiveBoolean'];
    const educationFields = ['highestQualification', 'graduationYear', 'fieldOfStudy', 'cgpaGrade', 'workExperience', 'preferredDestination', 'otherCountries', 'testName', 'testTrainingBoolean'];
    const statusFields = ['leadStatus', 'category', 'subCategory', 'branch', 'counselor', 'notes'];
    const sourceFields = ['leadSource_1', 'leadSource_2', 'leadSource_3', 'location_1', 'location_2', 'referrerName', 'referrerEmployeeId', 'vertical', 'desiredProgram', 'internshipOption', 'adName', 'adCampaign', 'leadForm', 'ipAddress'];

    // For checking any touched errors in each section
    const hasLeadInfoErrors = leadInfoFields.some(field => errors[field] && touched[field]);
    const hasEducationErrors = educationFields.some(field => errors[field] && touched[field]);
    const hasStatusErrors = statusFields.some(field => errors[field] && touched[field]);
    const hasSourceErrors = sourceFields.some(field => errors[field] && touched[field]);

    setTabErrors({
      'Lead Information': hasLeadInfoErrors,
      'Education Qualification': hasEducationErrors,
      'Lead Status': hasStatusErrors,
      'Lead Source': hasSourceErrors,
      'All Info': hasLeadInfoErrors || hasEducationErrors || hasStatusErrors || hasSourceErrors
    });
  }, [errors, touched, setTabErrors]);

  return null;
};

// ref to expose the submit function
export const formRef = React.createRef();

const LeadDetailsViewPage = () => {
  const [activeTab, setActiveTab] = useState('All Info');
  const tabs = ['All Info', 'Lead Information', 'Education Qualification', 'Lead Status', 'Lead Source'];
  const [tabErrors, setTabErrors] = useState({});

  const initialValues = {
    // Lead Information
    firstName: '',
    lastName: '',
    email: '',
    secondaryEmail: '',
    mobileNumber: '',
    alternativeNumber: '',
    whatsappNumber: '',
    leadOwner: '',
    leadStatusInfo: '',
    priority: '',
    teleCallerName: '',
    leadCreated: '',
    leadNumber: `LEAD${Math.floor(Math.random() * 900000) + 100000}`,
    agreeToReceiveBoolean: false,

    // Education Qualification
    highestQualification: '',
    graduationYear: '',
    fieldOfStudy: '',
    cgpaGrade: '',
    workExperience: '',
    preferredDestination: '',
    otherCountries: '',
    testName: '',
    testTrainingBoolean: false,

    // Lead Status
    leadStatus: '',
    category: '',
    subCategory: '',
    branch: '',
    counselor: '',
    notes: '',

    // Lead Source
    leadSource_1: '',
    leadSource_2: '',
    leadSource_3: '',
    location_1: '',
    location_2: '',
    referrerName: '',
    referrerEmployeeId: '',
    vertical: '',
    desiredProgram: '',
    internshipOption: '',
    adName: '',
    adCampaign: '',
    leadForm: '',
    ipAddress: '192.168.1.1',
  };


  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form submitted with values:', values);

    console.log('Lead Information:', {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      secondaryEmail: values.secondaryEmail,
      mobileNumber: values.mobileNumber,
      alternativeNumber: values.alternativeNumber,
      whatsappNumber: values.whatsappNumber,
      leadOwner: values.leadOwner,
      leadStatusInfo: values.leadStatusInfo,
      priority: values.priority,
      teleCallerName: values.teleCallerName,
      leadCreated: values.leadCreated,
    });

    console.log('Education Qualification:', {
      highestQualification: values?.highestQualification,
      graduationYear: values?.graduationYear,
      fieldOfStudy: values?.fieldOfStudy,
      cgpaGrade: values?.cgpaGrade,
      workExperience: values?.workExperience,
      preferredDestination: values?.preferredDestination,
      otherCountries: values?.otherCountries,
      testName: values?.testName,
      testTrainingBoolean: values?.testTrainingBoolean,
      leadNumber: `LEAD${Math.floor(Math.random() * 900000) + 100000}`,
      agreeToReceiveBoolean: values?.agreeToReceiveBoolean,
    });

    console.log('Lead Status:', {
      leadStatus: values.leadStatus,
      category: values.category,
      subCategory: values.subCategory,
      branch: values.branch,
      counselor: values.counselor,
      notes: values.notes,
    });

    console.log('Lead Source:', {
      leadSource_1: values?.leadSource_1,
      leadSource_2: values?.leadSource_2,
      leadSource_3: values?.leadSource_3,
      location_1: values?.location_1,
      location_2: values?.location_2,
      referrerName: values?.referrerName,
      referrerEmployeeId: values?.referrerEmployeeId,
      vertical: values?.vertical,
      desiredProgram: values?.desiredProgram,
      internshipOption: values?.internshipOption,
      adName: values?.adName,
      adCampaign: values?.adCampaign,
      leadForm: values?.leadForm,
      ipAddress: values?.ipAddress,
    });
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={formRef}
      // enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <ErrorObserver setTabErrors={setTabErrors} />
            <div className="pb-8">
              <div className="mb-4">
                <div className="flex space-x-2">
                  {tabs.map((tab) => (
                    <div key={tab}>
                      <CustomButton
                        key={tab}
                        text={tab}
                        variant="chips"
                        rounded="full"
                        startIcon={false}
                        endIcon={tabErrors[tab] || false}
                        iconImg={tabErrors[tab] ? WarningIcon : undefined}
                        onClick={() => setActiveTab(tab)}
                        selected={activeTab === tab}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {(activeTab === 'All Info' || activeTab === 'Lead Information') && (
              <LeadInformationForm
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
            )}

            {(activeTab === 'All Info' || activeTab === 'Education Qualification') && (
              <EducationQualificationForm
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
            )}

            {(activeTab === 'All Info' || activeTab === 'Lead Status') && (
              <LeadStatusForm
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
            )}

            {(activeTab === 'All Info' || activeTab === 'Lead Source') && (
              <LeadSourceForm
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LeadDetailsViewPage;