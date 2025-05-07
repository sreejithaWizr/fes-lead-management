import React, { useEffect, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import { CustomButton } from 'react-mui-tailwind'
import WarningIcon from '../../assets/warning-icon.svg'
import { useNavigate } from 'react-router-dom';

const CreateRole = () => {
    // const [activeTab, setActiveTab] = useState('All Info');
    // const tabs = ['All Info', 'Lead Information', 'Education Qualification', 'Lead Status', 'Lead Source'];
    // const [tabErrors, setTabErrors] = useState({});

    // const navigate = useNavigate();
    // const initialValues = {
    //     //Role Info
    //     roleName: '',
    //     roleType: '',
    //     parentRole: '',
    //     childRole: '',
    //     insertionMode: '',
    //     organization: '',
    //     description: '',

    //     // Role Access

    //    // Lead Form View Permission
    //     leadFormViewPermission: false,
    //     leadInformationView: false,
    //     educationQualificationView: false,
    //     leadSourceView: false,
    //     leadStatusView: false,
    //     opportunityView: false,

    //     // Lead Form Edit Permission
    //     leadFormEditPermission:false,
    //     leadInformationEdit: false,
    //     educationQualificationEdit: false,
    //     leadSourceEdit: false,
    //     leadStatusEdit: false,
    //     opportunityEdit: false,

    //     // Masked Data View
    //     maskedDataView: false,
    //     email: false,
    //     secondaryEmail: false,
    //     phone: false,
    //     whatsAppNumber: false,
    //     source1: false,

    //     // Delete Access
    //     deleteAccess: true,
    //     opportunityLead: false,
    //     leadDelete: false,

    // };

    // const handleSubmit = async (values, { setSubmitting }) => {

    //     // try {
    //     //     const response = await createLead(payload);
    //     //     console.log('User created:', response.data);
    //     //     if (response?.data?.succeeded === true) {
    //     //         navigate("/leads")
    //     //     }
    //     //     alert("Created")
    //     //     // Optional: reset form or show toast
    //     // } catch (err) {
    //     //     console.error('Error creating user:', err);
    //     // }
    // };

    // const validationSchema = {}

    return (
        <div className="w-full">
            {/* <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
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
                    </form>
                )}
            </Formik> */}
        </div>
    )
};

export default CreateRole;
