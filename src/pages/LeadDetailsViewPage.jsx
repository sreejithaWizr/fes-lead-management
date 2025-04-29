import { useNavigate, useParams } from 'react-router-dom';
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
import { getLeadById } from '../api/services/leadAPI/leadAPIs';

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
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('All Info');
  const [initialValues, setInitialValues] = useState(null);
  const [tabErrors, setTabErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [leadData, setLeadData] = useState(null);

  const tabs = ['Opportunity', 'All Info', 'Lead Information', 'Education Qualification', 'Lead Status', 'Lead Source'];

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await getLeadById(id);
        setLeadData(response?.data);
        // console.log("Lead data fetched:", response?.data);
      } catch (err) {
        console.error("Failed to fetch lead:", err);
      } finally {
        // setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  useEffect(() => {
    const fetchedLeadData = {
      // Lead Information
      firstName: leadData?.first_name,
      lastName: leadData?.last_name,
      email: leadData?.email,
      secondaryEmail: leadData?.secondary_email,
      mobileNumber: leadData?.mobile_number,
      alternativeNumber: leadData?.alternative_number,
      whatsappNumber: leadData?.whatsapp_number,
      // leadOwner: leadData?.lead_owner,
      // leadStatusInfo: 'Initial Contact',
      priority: leadData?.priority_id,
      teleCallerName: leadData?.tele_callerid,
      leadCreated: leadData?.created_at,
      leadNumber: leadData?.lead_number,
      agreeToReceiveBoolean: leadData?.consent,

      // Education Qualification
      highestQualification: leadData?.highest_qualification_id,
      graduationYear: { name: leadData?.graduation_year },
      fieldOfStudy: leadData?.fieldofstudy_id,
      cgpaGrade: leadData?.cgpa_grade,
      workExperience: { name: leadData?.work_experience },
      intakeYear: { name: leadData?.intake_year },
      intakeMonth: leadData?.intake_month,
      preferredDestination: leadData?.preffered_destination || [], //['USA', 'Canada'],
      otherCountries: leadData?.other_countries, //'USA, Australia',
      testName: leadData?.test_ids || [], //['IELTS'],
      testTrainingBoolean: leadData?.test_training_required,

      // Lead Status
      leadStatus: leadData?.status,
      category: leadData?.category,
      subCategory: leadData?.subcategory_id,
      branch: leadData?.branch_id,
      // counselor: 'Jane Smith',
      notes: '',

      // Lead Source
      leadSource_1: leadData?.source1_id,
      leadSource_2: leadData?.source2_id,
      leadSource_3: leadData?.source3_id,
      leadSource_4: leadData?.source4_id,
      location_1: leadData?.region_id,
      location_2: leadData?.city_id,
      referrerName: leadData?.reference_name,
      referrerEmployeeId: leadData?.reference_employee_id,
      vertical: leadData?.vertical,
      desiredProgram: leadData?.desired_program,
      adName: leadData?.adName,
      adCampaign: leadData?.adCampaign,
      leadForm: leadData?.lead_form,
      ipAddress: leadData?.ip_address,
      internshipOption: leadData?.internship_option,
      importLead: leadData?.importLead,
      invokeBlueprint: leadData?.invokeBlueprint,
    };

    // Simulate delay and set data
    setTimeout(() => {
      setInitialValues(fetchedLeadData);
    }, 1000);
  }, [leadData]);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form submitted with values:', values);
  };

  const handleEditClick = (data) => {
    navigate(`/leads/edit/${id}`);
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
                      {leadData?.first_name?.charAt(0)} {leadData?.last_name?.charAt(0)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h1 className="font-bold text-[19px] text-[#17222B]">{leadData?.first_name} {leadData?.last_name}</h1>
                        <span className="text-xs px-2 py-1 rounded-full bg-[#FFF3E6] text-[#FF8400] font-medium border border-[#FFB86B]">
                          May be Prospective
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 flex flex-wrap gap-x-4">
                        <div className="flex items-center space-x-2">
                          <img src={LeadNumberIcon} alt="Lead Icon" className="w-5 h-5" />
                          <span className="text-[13px]">{leadData?.lead_number}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img src={LeadMailIcon} alt="Mail Icon" className="w-5 h-5" />
                          <span className="text-[13px]">{leadData?.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img src={LeadCallIcon} alt="Call Icon" className="w-5 h-5" />
                          <span className="text-[13px]">{leadData?.mobile_number}</span>
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
                    {tabs && tabs?.map((tab) => (
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
                <LeadInformationForm {...{ values, errors, touched, handleChange, handleBlur, setFieldValue, mode: "view" }} />
              )}
              {(activeTab === 'All Info' || activeTab === 'Education Qualification') && (
                <EducationQualificationForm {...{ values, errors, touched, handleChange, handleBlur, setFieldValue, mode: "view" }} />
              )}
              {(activeTab === 'All Info' || activeTab === 'Lead Status') && (
                <LeadStatusForm {...{ values, errors, touched, handleChange, handleBlur, setFieldValue, mode: "view" }} />
              )}
              {(activeTab === 'All Info' || activeTab === 'Lead Source') && (
                <LeadSourceForm {...{ values, errors, touched, handleChange, handleBlur, setFieldValue, mode: "view" }} />
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
