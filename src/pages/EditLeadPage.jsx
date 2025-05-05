import React, { useEffect, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import LeadInformationForm from '../components/forms/createLead/leadInfoForm';
import EducationQualificationForm from '../components/forms/createLead/leadEducationForm';
import LeadStatusForm from '../components/forms/createLead/leadStatusForm';
import LeadSourceForm from '../components/forms/createLead/leadSourceForm';
import { validationSchema } from '../components/forms/createLead/schema';
import { CustomButton } from 'react-mui-tailwind';
import WarningIcon from '../assets/warning-icon.svg';
import LeadDetailsHeader from '../components/LeadDetailsHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { getLeadById, updateLead } from '../api/services/leadAPI/leadAPIs';

const ErrorObserver = ({ setTabErrors }) => {
    const { errors, touched } = useFormikContext();

    useEffect(() => {
        const leadInfoFields = ['firstName', 'lastName', 'email', 'secondaryEmail', 'mobileNumber', 'alternativeNumber', 'whatsappNumber', 'leadOwner', 'leadStatusInfo', 'priority', 'teleCallerName', 'leadCreated', 'leadNumber', 'agreeToReceiveBoolean'];
        const educationFields = ['highestQualification', 'graduationYear', 'fieldOfStudy', 'cgpaGrade', 'workExperience', 'preferredDestination', 'otherCountries', 'testName', 'testTrainingBoolean', 'intake_year'];
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

export const formRef = React.createRef();

const EditLeadPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [leadData, setLeadData] = useState(null);

    const [activeTab, setActiveTab] = useState('All Info');
    const [tabErrors, setTabErrors] = useState({});
    const [initialValues, setInitialValues] = useState(null);

    // Simulated lead details (could come from API)
    useEffect(() => {
        const fetchLead = async () => {
            try {
                const response = await getLeadById(id);
                setLeadData(response?.data);
                console.log("Lead data fetched:", response?.data);
            } catch (err) {
                console.error("Failed to fetch lead:", err);
            } finally {
                // setLoading(false);
            }
        };

        fetchLead();
    }, [id]);

    const leadDetails = {
        initials: `${leadData?.first_name?.charAt(0) || ''}${leadData?.last_name?.charAt(0) || ''}`,
        name: `${leadData?.first_name} ${leadData?.last_name}`,
        status: 'May be Prospective',
        id: `${leadData?.lead_number}`,
        email: `${leadData?.email}`,
        phone: `${leadData?.mobile_number}`,
    };

    // JSON object to simulate prefilled data (could come from API)
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
            intakeMonth: { name: leadData?.intake_month },
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

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log('update');
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
            modified_by: id,
            education: {
                highest_qualification_id: values?.highestQualification || null,
                graduation_year: values?.graduationYear?.name || null,
                fieldofstudy_id: values?.fieldOfStudy || null,
                cgpa_grade: values?.cgpaGrade,
                work_experience: values?.workExperience?.name,
                intake_year: values?.intake_year?.name || '',
                intake_month: values?.intakeMonth?.name || '',
                other_countries: values?.otherCountries,
                test_training_required: values?.testTrainingBoolean || false,
                preferred_countries: Array.isArray(values?.preferredDestination)
                    ? values.preferredDestination : [],
                test_ids: Array.isArray(values?.testName)
                    ? values.testName : []
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
                vertical: values?.vertical || '',
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
                counsellorFESTech1Name: values?.counsellorFESTech1Name?.name || null,
                counsellorFESTech1EmailID: values?.counsellorFESTech1EmailID || ''
            },
        }

        try {
            const response = await updateLead(id, payload);

            if (response?.data?.succeeded === true) {
                // alert("Updated successfully");
                navigate('/leads');
            }
        } catch (error) {
            console.error('Failed to update lead:', error);
        }
    };

    if (!initialValues) return <div>Loading...</div>;

    const tabs = ['All Info', 'Lead Information', 'Education Qualification', 'Lead Status', 'Lead Source'];

    return (
        <div className="w-full h-full">
            <LeadDetailsHeader lead={leadDetails} />
            <div className="w-full h-full rounded-md">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    innerRef={formRef}
                    enableReinitialize={true}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <ErrorObserver setTabErrors={setTabErrors} />
                            <div>
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
                                    mode="edit"
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
                                    mode="edit"
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
                                    mode="edit"
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
                                    mode="edit"
                                />
                            )}
                            <pre>{JSON.stringify(errors)}</pre>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditLeadPage;
