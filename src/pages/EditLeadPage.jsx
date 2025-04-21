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

export const formRef = React.createRef();

const EditLeadPage = () => {
    const [activeTab, setActiveTab] = useState('All Info');
    const [tabErrors, setTabErrors] = useState({});
    const [initialValues, setInitialValues] = useState(null);

    const leadDetails = {
        initials: 'NK',
        name: 'Nandhana Krishna',
        status: 'May be Prospective',
        id: 'LEAD355451001',
        email: 'test@gmail.com',
        phone: '(884) 819-3264',
    };

    // JSON object to simulate prefilled data (could come from API)
    const prefilledData = {
        firstName: 'Nandhana',
        lastName: 'Krishna',
        email: 'nandhana@example.com',
        secondaryEmail: 'n.krishna@backup.com',
        mobileNumber: '9876543210',
        alternativeNumber: '1234567890',
        whatsappNumber: '9876543210',
        leadOwner: 'John Doe',
        leadStatusInfo: 'New',
        priority: 'High',
        teleCallerName: 'Priya',
        leadCreated: '2025-04-01',
        leadNumber: 'LEAD355451001',
        agreeToReceiveBoolean: true,

        highestQualification: 'Bachelor’s Degree',
        graduationYear: '2020',
        fieldOfStudy: 'Computer Science',
        cgpaGrade: '8.5',
        workExperience: '2 years',
        preferredDestination: 'Canada',
        otherCountries: 'UK, Australia',
        testName: 'IELTS',
        testTrainingBoolean: true,

        leadStatus: 'Prospective',
        category: 'Hot',
        subCategory: 'Enquired',
        branch: 'Bangalore',
        counselor: 'Meera',
        notes: 'Very interested in Canada',

        leadSource_1: 'Google Ads',
        leadSource_2: 'Instagram',
        leadSource_3: 'Referral',
        location_1: 'Chennai',
        location_2: 'Bangalore',
        referrerName: 'Ravi Kumar',
        referrerEmployeeId: 'EMP12345',
        vertical: 'Education',
        desiredProgram: 'MS in Data Science',
        internshipOption: 'Yes',
        adName: 'Canada Campaign',
        adCampaign: 'Spring 2025',
        leadForm: 'LeadGenForm1',
        ipAddress: '192.168.1.101',
    };

    // Simulate prefetch and set as initial values
    useEffect(() => {
        // You can fetch this data from an API in real usage
        setInitialValues(prefilledData);
    }, []);

    const handleSubmit = (values, { setSubmitting }) => {
        console.log('Edited form submitted with values:', values);
    };

    if (!initialValues) return <div>Loading...</div>;

    const tabs = ['All Info', 'Lead Information', 'Education Qualification', 'Lead Status', 'Lead Source'];

    return (
        <div className="w-full h-full">
            <LeadDetailsHeader lead={leadDetails} />
            <div className="w-full h-full pt-[12px] pb-[12px] gap-[12px] rounded-md">
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
        </div>
    );
};

export default EditLeadPage;
