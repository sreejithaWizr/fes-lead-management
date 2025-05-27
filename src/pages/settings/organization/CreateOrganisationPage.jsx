import React, { useEffect, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import { CustomButton } from 'react-mui-tailwind';
import { useNavigate } from 'react-router-dom';
import LeftArrowIcon from "../../../assets/arrow-left.svg";
import RightArrowIcon from "../../../assets/arrow-right.svg";
import OrganisationBasicInfoForm from '../../../components/forms/createOrganisation/orgBasicInfoForm';
import OrganisationAccountInfoForm from '../../../components/forms/createOrganisation/orgBasicInfoForm';
import { validationSchema } from '../../../components/forms/createOrganisation/schema';
import { createOrganisation } from '../../../api/services/settingsAPI/organisationAPI';
export const formRef = React.createRef();

const CreateOrganisationPage = () => {
    const isCreateOrganisationPage = location.pathname.startsWith('/settings/organisation/create');

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/settings');
    };

    const handleFormSubmit = () => {
        if (formRef.current) {
            // Set all fields as touched to trigger validation
            formRef.current.setTouched(
                Object.keys(formRef.current.values).reduce((acc, key) => {
                    console.log("acc", acc, formRef.current.values)
                    acc[key] = true;
                    return acc;
                }, {})
            );

            formRef.current.submitForm();

        }
    };

    const initialValues = {
        // Basic Information
        orgName: '',
        type: '',
        // region: '',
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
        console.log('Form submitted with values:', values);

        const payload = {
            orgName: values?.orgName,
            type: values?.type,
            // region: values?.region?.name,
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

            // add_account_info: values?.add_account_info?.map(info => ({
            //     name: info.name || null,
            //     account_id: info.account_id || null,
            // })),
        }

        try {
            const response = await createOrganisation(payload);
            console.log('User created:', response.data);
            if (response?.data?.succeeded === true) {
                navigate("/settings")
                // alert("Created")
            }
            else {
                // alert("Creation Failed")
            }
            // alert("Created")
            // Optional: reset form or show toast
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };

    return (
        <div className="w-full">
            {isCreateOrganisationPage && (
                <div className="pt-6 px-6 pb-[24px] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src={LeftArrowIcon}
                            alt="FES Logo"
                            className="size-[24px] rounded-md cursor-pointer"
                            onClick={handleCancel}
                        />
                        <div className="flex items-center gap-2">
                            <h1
                                className="font-proxima font-bold text-[28px] leading-[140%] align-middle text-[#17222B]">
                                Add new Organisation
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <CustomButton text="Cancel" variant="secondary" startIcon={false} endIcon={false} onClick={handleCancel} />
                        <CustomButton text="Submit" startIcon={false} endIcon={true} iconImg={RightArrowIcon} onClick={handleFormSubmit} />
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