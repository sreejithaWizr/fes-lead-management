import React, { useEffect, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import UserInformationForm from '../../../components/forms/createUser/UserInformationForm';
// import { validationSchema } from '../../../components/forms/createUser/schema';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from 'react-mui-tailwind';
import LeftArrowIcon from "../../../assets/arrow-left.svg";
import PersonalCard from "../../../assets/personalcard.svg";
import EditIcon from "../../../assets/edit.svg";
import { MailIcon, PhoneIcon } from 'lucide-react';

export const formRef = React.createRef();

const ViewUserPage = () => {
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

    const handleSubmit = async (values, { setSubmitting }) => {
        alert("User Created.");

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
            const response = await createLead(payload);
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
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <img
                        src={LeftArrowIcon}
                        alt="Back"
                        className="w-6 h-6 cursor-pointer"
                        onClick={handleCancel}
                    />
                    <h1 className="text-2xl font-bold text-[#17222B]">User Details</h1>
                </div>
                <CustomButton
                    text="Edit"
                    iconImg={EditIcon}
                    startIcon={true}
                    endIcon={false}
                    onClick={handleFormSubmit}
                />
            </div>

            {/* Top Card: Avatar + Basic Info */}
            <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-[#030229B2] text-white rounded-full flex items-center justify-center text-lg font-bold">
                    UN
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-[#17222B]">User Name</h2>
                        Active
                        {/* && (
                            <span className="bg-[#E6F4EE] text-[#14AE5C] text-xs font-semibold px-3 py-1 rounded-full border border-[#B6E3CE]">
                                Active
                            </span>
                        )}
                        {user?.userStatus === "Inactive" && (
                            <span className="bg-[#FFF3E6] text-[#FF8400] text-xs font-semibold px-3 py-1 rounded-full border border-[#FFB86B]">
                                Inactive
                            </span>
                        )} */}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                        <span className="flex items-center gap-1">
                            <img src={MailIcon} className="w-4 h-4" alt="Email" />
                            username@gmail.com
                        </span>
                        <span className="flex items-center gap-1">
                            <img src={PhoneIcon} className="w-4 h-4" alt="Phone" />
                            +1 234 567 890
                        </span>
                    </div>
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
                            mode='view'
                        />
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default ViewUserPage;