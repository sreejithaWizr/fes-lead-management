import React, { useEffect, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import UserInformationForm from '../../../components/forms/createUser/UserInformationForm';
// import { validationSchema } from '../../../components/forms/createUser/schema';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from 'react-mui-tailwind';
import LeftArrowIcon from "../../../assets/arrow-left.svg";
import RightArrowIcon from "../../../assets/arrow-right.svg";
import { createUser } from '../../../api/services/masterAPIs/createUserApi';

export const formRef = React.createRef();

const CreateUserPage = () => {

    const navigate = useNavigate();

    const initialValues = {
        userFirstName: '',
        userLastName: '',
        userEmail: '',
        userPhoneNumber: '',
        userLoginMethod: '',
        userStatus: '',
        userOrganisationName: '',
        userRoles: '',
        userBranch: '',
        userManagerReportTo: '',
        userCountrySpecialisation: '',
        userContactCenterId: '',
    };

    const handleCancel = () => {
        navigate('/settings?tab=User+Management');
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

    const handleSubmit = async (values) => {
        console.log('Form submitted with values:', values);

        const payload = {
            first_name: values?.userFirstName || '',
            last_name: values?.userLastName || '',
            email: values?.userEmail || '',
            phone: values?.userPhoneNumber || '',
            login_id: values?.userLoginMethod || '',
            status_id: values?.userStatus || '',
            org_id: values?.userOrganisationName || '',
            role_id: values?.userRoles || null,
            branch_id: values?.userBranch || null,
            manager_id: values?.userManagerReportTo,
            country_specialisation: values?.userCountrySpecialisation || '',
            contact_center_id: values?.userContactCenterId || '',
        }

        try {
            const response = await createUser(payload);
            console.log('User created:', response.data);
            if (response?.data?.succeeded === true) {
                navigate("/settings?tab=User+Management")
            }
            alert("Created")
            // Optional: reset form or show toast
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };

    return (
        <div className="w-full">
            <div className="pb-6 flex items-center justify-between">
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
                            Create a new user
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <CustomButton text="Cancel" variant="secondary" startIcon={false} endIcon={false} onClick={handleCancel} />
                    <CustomButton text="Submit" startIcon={false} endIcon={true} iconImg={RightArrowIcon} onClick={handleFormSubmit} />
                </div>
            </div>

            <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
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
                    setFieldValue,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <UserInformationForm
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

export default CreateUserPage;