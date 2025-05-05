import React, { useEffect, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import LeadInformationForm from '../components/forms/createLead/leadInfoForm';
import EducationQualificationForm from '../components/forms/createLead/leadEducationForm';
import LeadStatusForm from '../components/forms/createLead/leadStatusForm';
import LeadSourceForm from '../components/forms/createLead/leadSourceForm';
import { validationSchema } from '../components/forms/createLead/schema';
import { CustomButton } from 'react-mui-tailwind'
import WarningIcon from '../assets/warning-icon.svg'
import LeadOpportunity from '../components/forms/createLead/leadOpportunity/opportunityList';
import { getUser, getUsers } from '../api/services/api';
import { createLead, getStatus } from '../api/services/masterAPIs/createLeadApi';
import { useNavigate } from 'react-router-dom';

const ErrorObserver = ({ setTabErrors }) => {
    const { errors, touched } = useFormikContext();

    useEffect(() => {
        // Group errors by tab sections
        const leadInfoFields = ['firstName', 'lastName', 'email', 'secondaryEmail', 'mobileNumber', 'alternativeNumber', 'whatsappNumber', 'leadOwner', 'leadStatusInfo', 'priority', 'teleCallerName', 'leadCreated', 'leadNumber', 'agreeToReceiveBoolean'];
        const educationFields = ['highestQualification', 'graduationYear', 'fieldOfStudy', 'cgpaGrade', 'workExperience', 'preferredDestination', 'otherCountries', 'testName', 'testTrainingBoolean', 'intake_year'];
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

const CreateLeadPage = () => {
    const [activeTab, setActiveTab] = useState('All Info');
    const tabs = ['All Info', 'Lead Information', 'Education Qualification', 'Lead Status', 'Lead Source'];
    const [tabErrors, setTabErrors] = useState({});

    const navigate = useNavigate();
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
        intake_year: '',
        intake_month: '',
        preferredDestination: [],
        otherCountries: '',
        testName: [],
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
        leadSource_4: '',
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

        preferredTimeSlot: '',
        gclID: '',
        zcGad: '',
        adID: '',
        keyIdentifier: '',
        campaignType: '',
        referrerEmail: '',
        referrerPhoneNumber: '',
        userAgent: '',
        importLead: '',
        invokeBlueprint: '',
        verseID: '',
        shortlistedCourseID: '',
        counsellorFESTech1Name: '',
        counsellorFESTech1EmailID: '',
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        // console.log('Form submitted with values:', values);

        const payload = {
            first_name: values?.firstName || '',
            last_name: values?.lastName || '',
            email: values?.email || '',
            secondary_email: values?.secondaryEmail || '',
            mobile_number: values?.mobileNumber || '',
            alternative_number: values?.alternativeNumber || '',
            whatsapp_number: values?.whatsappNumber || '',
            tele_callerid: values?.teleCallerName || null,
            priority_id: values?.priority || null,
            lead_number: values?.leadNumber || '',
            consent: values?.agreeToReceiveBoolean,
            created_at: values?.leadCreated || '',
            created_by: "Admin",
            education: {
                highest_qualification_id: values?.highestQualification || null,
                graduation_year: values?.graduationYear?.name || '',
                fieldofstudy_id: values?.fieldOfStudy|| null,
                cgpa_grade: values?.cgpaGrade || null,
                work_experience: values?.workExperience?.name,
                intake_year: values?.intake_year?.name || '',
                intake_month: values?.intake_month?.name || '',
                other_countries: values?.otherCountries,
                test_training_required: values?.testTrainingBoolean,
                preferred_countries: Array.isArray(values?.preferredDestination)
                    ? values.preferredDestination
                    : [],
                test_ids: Array.isArray(values?.testName)
                    ? values.testName
                    : []
            },
            status: {
                status: values?.leadStatus || null,
                category: values?.category || null,
                subcategory_id: values?.subCategory || null,
                branch_id: values?.branch || null,
            },
            source: {
                source1_id: values?.leadSource_1 || null,
                source2_id: values?.leadSource_2 || null,
                source3_id: values?.leadSource_3 || null,
                source4_id: values?.leadSource_4 || null,
                region_id: values?.location_1 || null,
                city_id: values?.location_2 || null,
                reference_name: values?.referrerName || '',
                reference_employee_id: values?.referrerEmployeeId || null,
                vertical: values?.vertical || null,
                desired_program: values?.desiredProgram || null,
                internship_option: values?.internshipOption == "Yes" ? true : false,
                adName: values?.adName || '',
                adCampaign: values?.adCampaign || '',
                lead_form: values?.leadForm || '',
                ip_address: "197.168.1.1",

                preferredTimeSlot: values?.preferredTimeSlot || '',
                gcl_id: values?.gclID || '',
                zcGad: values?.zcGad || '',
                ad_id: values?.adID || '',
                keyIdentifier: values?.keyIdentifier || '',
                campaignType: values?.campaignType || '',
                referrerEmail: values?.referrerEmail || '',
                referrerPhoneNumber: values?.referrerPhoneNumber || '',
                userAgent: values?.userAgent || '',
                importLead: values?.importLead?.id || '',
                invokeBlueprint: values?.invokeBlueprint?.id || '',
                verse_id: values?.verseID || '',
                shortlisted_course_id: values?.shortlistedCourseID || '',
                counsellorFESTech1Name: values?.teleCallcounsellorFESTech1NameerName?.id || null,
                counsellorFESTech1EmailID: values?.counsellorFESTech1EmailID || ''
            }
        }

        try {
            const response = await createLead(payload);
            console.log('User created:', response.data);
            if (response?.data?.succeeded === true) {
                navigate("/leads")
            }
            alert("Created")
            // Optional: reset form or show toast
        } catch (err) {
            console.error('Error creating user:', err);
        }
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
                        <div className="pb-2">
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
                                mode='create'
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
                        {/* {( activeTab === "Opportunity" && (
                            <LeadOpportunity leadID={3}/>
                        )
                        )} */}
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default CreateLeadPage;