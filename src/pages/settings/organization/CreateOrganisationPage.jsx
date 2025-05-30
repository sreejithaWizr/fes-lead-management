import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { CustomButton, CustomAlert } from 'react-mui-tailwind';
import { useNavigate } from 'react-router-dom';
import LeftArrowIcon from "../../../assets/arrow-left.svg";
import RightArrowIcon from "../../../assets/arrow-right.svg";
import OrganisationBasicInfoForm from '../../../components/forms/createOrganisation/orgBasicInfoForm';
import OrganisationAccountInfoForm from '../../../components/forms/createOrganisation/orgAccountInfoForm';
import { validationSchema } from '../../../components/forms/createOrganisation/schema';
import { createOrganisation } from '../../../api/services/settingsAPI/organisationAPI';

export const formRef = React.createRef();

const CreateOrganisationPage = () => {
    const isCreateOrganisationPage = location.pathname.startsWith('/settings/organisation/create');
    const navigate = useNavigate();

    const [alert, setAlert] = useState({
        open: false,
        severity: 'error',
        description: '',
    });

    const handleCancel = () => {
        navigate('/settings?tab=Organisation+Management');
    };

    const handleFormSubmit = () => {
        if (formRef.current) {
            // Set all fields as touched to trigger validation
            formRef.current.setTouched(
                Object.keys(formRef.current.values).reduce((acc, key) => {
                    acc[key] = true;
                    return acc;
                }, {})
            );
            formRef.current.submitForm();
        }
    };

    useEffect(() => {
        if (alert.open) {
            const timer = setTimeout(() => {
                setAlert(prev => ({ ...prev, open: false }));
            }, 5000); // Auto-dismiss after 5s
            return () => clearTimeout(timer);
        }
    }, [alert.open]);

    const initialValues = {
        // Basic Information
        orgName: '',
        type: '',
        business_mail: '',
        mobileNumber: '',
        primary_admin_user_name: '',
        admin_mail: '',
        parent_org: '',
        service_enabled: [],
        status: true,
        notes: '',

        // Business Information
        street: '',
        city: '',
        state: null,
        postal_code: '',
        country: null,
        gst_no: '',
        primary_poc: '',
        poc_mail: '',
        poc_mobileNumber: '',

        // Account Information
        add_account_info: [
            {
                name: '',
                account_id: '',
            }
        ],
    };

    const handleSubmit = async (values) => {
        const payload = {
            orgName: values?.orgName,
            type: values?.type,
            business_mail: values?.business_mail,
            mobileNumber: values?.mobileNumber,
            primary_admin_user_name: values?.primary_admin_user_name,
            admin_mail: values?.admin_mail,
            parent_org: values?.parent_org,
            service_enabled: Array.isArray(values?.service_enabled)
                ? values.service_enabled
                : [],
            status: values?.status,
            notes: values?.notes,
            street: values?.street,
            city: values?.city,
            state: values?.state,
            country: values?.country,
            gst_no: values?.gst_no,
            primary_poc: values?.primary_poc,
            poc_mail: values?.poc_mail,
            poc_mobileNumber: values?.poc_mobileNumber,
        };

        try {
            const response = await createOrganisation(payload);
            if (response?.data?.succeeded === true) {
                navigate("/settings?tab=Organisation+Management");
            } else {
                setAlert({
                    open: true,
                    severity: 'error',
                    description: response?.data?.message || 'Organisation creation failed.',
                });
                // alert(response?.data?.message);

            }
        } catch (err) {
            console.error('Error creating organisation:', err);
            setAlert({
                open: true,
                severity: 'error',
                description: err?.response?.data?.message || 'Something went wrong. Please try again.',
            });
        }
    };

    return (
        <div className="w-full">
            {isCreateOrganisationPage && (
                <div className="pt-6 px-6 pb-[24px] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src={LeftArrowIcon}
                            alt="Back"
                            className="size-[24px] rounded-md cursor-pointer"
                            onClick={handleCancel}
                        />
                        <h1 className="font-proxima font-bold text-[28px] leading-[140%] text-[#17222B]">
                            Add new Organisation
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <CustomButton text="Cancel" variant="secondary" startIcon={false} endIcon={false} onClick={handleCancel} />
                        <CustomButton text="Submit" startIcon={false} endIcon={true} iconImg={RightArrowIcon} onClick={handleFormSubmit} />
                    </div>
                </div>
            )}

            {/* Alert block */}
            {alert.open && (
                <div className="fixed top-6 right-6 z-50">
                    <div className="animate-slideIn">
                        <CustomAlert
                            severity={alert.severity}
                            variant="filled"
                            hasTitle={false}
                            hasDescription={true}
                            description={alert.description}
                            hasAction={false}
                            hasClose={true}
                            onClose={() => setAlert(prev => ({ ...prev, open: false }))}
                        />
                    </div>
                </div>
            )}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                innerRef={formRef}
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
                        <OrganisationBasicInfoForm
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            setFieldValue={setFieldValue}
                            mode='create'
                        />

                        <OrganisationAccountInfoForm
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            setFieldValue={setFieldValue}
                            mode='create'
                        />
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default CreateOrganisationPage;
