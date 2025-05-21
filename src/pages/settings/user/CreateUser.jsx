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
            userFirstName: values?.userFirstName || '',
            userLastName: values?.userLastName || '',
            userEmail: values?.userEmail || '',
            userPhoneNumber: values?.userPhoneNumber || '',
            // password: values?.userPassword || '',
            userLoginMethod: values?.userLoginMethod || '',
            userStatus: values?.userStatus || '',
            orgId: values?.userOrganisationName || '',
            roleId: values?.userRoles || null,
            branchId: values?.userBranch || null,
            managerId: values?.userManagerReportTo,
            // userRoles: 0,
            // userBranch: 0,
            // userManagerReportTo: values?.userManagerReportTo,
            userCountrySpecialisation: values?.userCountrySpecialisation || '',
            userContactCenterId: values?.userContactCenterId || '',

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