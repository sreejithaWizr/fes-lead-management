import React, { useEffect, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import LeadInformationForm from '../components/forms/createLead/leadInfoForm';
import EducationQualificationForm from '../components/forms/createLead/leadEducationForm';
import LeadStatusForm from '../components/forms/createLead/leadStatusForm';
import LeadSourceForm from '../components/forms/createLead/leadSourceForm';
import { validationSchema } from '../components/forms/createLead/schema';
import { CustomButton } from 'react-mui-tailwind';
import WarningIcon from '../assets/warning-icon.svg';
import LeadOpportunity from '../components/forms/createLead/leadOpportunity/opportunityList';
import LeadNumberIcon from '../assets/personalcard.svg';
import LeadMailIcon from '../assets/sms.svg';
import LeadCallIcon from '../assets/phone-icon.svg';
import EditIcon from '../assets/edit.svg';

// Ref for external form submit
export const formRef = React.createRef();

const ErrorObserver = ({ setTabErrors }) => {
  const { errors, touched } = useFormikContext();

  useEffect(() => {
    const leadInfoFields = ['firstName', 'lastName', 'email', 'secondaryEmail', 'mobileNumber', 'alternativeNumber', 'whatsappNumber', 'leadOwner', 'leadStatusInfo', 'priority', 'teleCallerName', 'leadCreated', 'leadNumber', 'agreeToReceiveBoolean'];
    const educationFields = ['highestQualification', 'graduationYear', 'fieldOfStudy', 'cgpaGrade', 'workExperience', 'preferredDestination', 'otherCountries', 'testName', 'testTrainingBoolean'];
    const statusFields = ['leadStatus', 'category', 'subCategory', 'branch', 'counselor', 'notes'];
    const sourceFields = ['leadSource_1', 'leadSource_2', 'leadSource_3', 'location_1', 'location_2', 'referrerName', 'referrerEmployeeId', 'vertical', 'desiredProgram', 'internshipOption', 'adName', 'adCampaign', 'leadForm', 'ipAddress'];

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

const LeadDetailsViewPage = () => {
  const [activeTab, setActiveTab] = useState('All Info');
  const [initialValues, setInitialValues] = useState(null);
  const [tabErrors, setTabErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const tabs = ['Opportunity', 'All Info', 'Lead Information', 'Education Qualification', 'Lead Status', 'Lead Source'];

  // Simulated data fetching
  useEffect(() => {
    const mockLeadData = {
      firstName: 'Nandhana',
      lastName: 'Krishna',
      email: 'test@gmail.com',
      secondaryEmail: 'alt@gmail.com',
      mobileNumber: '8848193264',
      alternativeNumber: '9876543210',
      whatsappNumber: '1234567890',
      leadOwner: 'John Doe',
      leadStatusInfo: 'Initial Contact',
      priority: 'High',
      teleCallerName: 'Agent 47',
      leadCreated: '2025-04-20',
      leadNumber: 'LEAD355451001',
      agreeToReceiveBoolean: true,
      highestQualification: 'Bachelor\'s',
      graduationYear: '2022',
      fieldOfStudy: 'Computer Science',
      cgpaGrade: '8.5',
      workExperience: '2 years',
      preferredDestination: 'Canada',
      otherCountries: 'USA, Australia',
      testName: 'IELTS',
      testTrainingBoolean: true,
      leadStatus: 'Interested',
      category: 'Student',
      subCategory: 'UG',
      branch: 'Main Branch',
      counselor: 'Jane Smith',
      notes: 'Interested in fast-track programs',
      leadSource_1: 'Facebook',
      leadSource_2: 'Referral',
      leadSource_3: 'Webinar',
      location_1: 'Chennai',
      location_2: 'Bangalore',
      referrerName: 'Alice',
      referrerEmployeeId: 'EMP123',
      vertical: 'Education',
      desiredProgram: 'MS in CS',
      internshipOption: 'Yes',
      adName: 'CS Campaign',
      adCampaign: 'April2025',
      leadForm: 'Landing Page',
      ipAddress: '192.168.1.100',
    };

    // Simulate delay and set data
    setTimeout(() => {
      setInitialValues(mockLeadData);
    }, 1000);
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form submitted with values:', values);
  };

  const handleEditClick = (data) => {
    alert('Edit button clicked!');
    setEditingId(data.opportunityID);
    setFormData({ ...data });
  };

  return (
    <div className="w-full">
      {initialValues ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          innerRef={formRef}
          enableReinitialize
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

              {/* Lead Header Section */}
              <div className="p-4 rounded-lg mb-4">
                <div className="flex items-start justify-between flex-wrap">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-slate-700 text-white rounded-full flex items-center justify-center text-lg font-semibold">
                      NK
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h1 className="font-bold text-[19px] text-[#17222B]">Nandhana Krishna</h1>
                        <span className="text-xs px-2 py-1 rounded-full bg-[#FFF3E6] text-[#FF8400] font-medium border border-[#FFB86B]">
                          May be Prospective
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 flex flex-wrap gap-x-4">
                        <div className="flex items-center space-x-2">
                          <img src={LeadNumberIcon} alt="Lead Icon" className="w-5 h-5" />
                          <span className="text-[13px]">LEAD355451001</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img src={LeadMailIcon} alt="Mail Icon" className="w-5 h-5" />
                          <span className="text-[13px]">test@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img src={LeadCallIcon} alt="Call Icon" className="w-5 h-5" />
                          <span className="text-[13px]">(884) 819-3264</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <CustomButton
                      variant="icon"
                      iconImg={EditIcon}
                      endIcon={false}
                      showText={false}
                      onClick={() => handleEditClick(initialValues)}
                    />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="pb-2">
                <div className="mb-2">
                  <div className="flex items-center space-x-2">
                    {tabs.map((tab) => (
                      <React.Fragment key={tab}>
                        <CustomButton
                          text={tab}
                          variant="chips"
                          rounded="full"
                          startIcon={false}
                          endIcon={tabErrors[tab] || false}
                          iconImg={tabErrors[tab] ? WarningIcon : undefined}
                          onClick={() => setActiveTab(tab)}
                          selected={activeTab === tab}
                        />
                        {tab === 'Opportunity' && (
                          <div className="h-6 w-px bg-gray-300 mx-2" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Forms by Tab */}
              {(activeTab === 'All Info' || activeTab === 'Lead Information') && (
                <LeadInformationForm {...{ values, errors, touched, handleChange, handleBlur, setFieldValue }} />
              )}
              {(activeTab === 'All Info' || activeTab === 'Education Qualification') && (
                <EducationQualificationForm {...{ values, errors, touched, handleChange, handleBlur, setFieldValue }} />
              )}
              {(activeTab === 'All Info' || activeTab === 'Lead Status') && (
                <LeadStatusForm {...{ values, errors, touched, handleChange, handleBlur, setFieldValue }} />
              )}
              {(activeTab === 'All Info' || activeTab === 'Lead Source') && (
                <LeadSourceForm {...{ values, errors, touched, handleChange, handleBlur, setFieldValue }} />
              )}
              {activeTab === 'Opportunity' && (
                <LeadOpportunity />
              )}
            </form>
          )}
        </Formik>
      ) : (
        <div className="p-8 text-center">Loading lead data...</div>
      )}
    </div>
  );
};

export default LeadDetailsViewPage;
