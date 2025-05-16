import React, { useEffect, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import UserInformationForm from '../../../components/forms/createUser/UserInformationForm';
// import { validationSchema } from '../../../components/forms/createUser/schema';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from 'react-mui-tailwind';
import LeftArrowIcon from "../../../assets/arrow-left.svg";
import TickIcon from "../../../assets/tick.svg";

export const formRef = React.createRef();

const EditUserPage = () => {
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
                            Edit user
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <CustomButton text="Cancel" variant="secondary" startIcon={false} endIcon={false} onClick={handleCancel} />
                    <CustomButton text="Update" startIcon={true} endIcon={false} iconImg={TickIcon} onClick={handleFormSubmit} />
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
                        {/* <ErrorObserver setTabErrors={setTabErrors} /> */}
                        {/* <div className="pb-2">
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
                        </div> */}

                        {/* {(activeTab === 'All Info' || activeTab === 'Lead Information') && ( */}
                        <UserInformationForm
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            setFieldValue={setFieldValue}
                            mode='create'
                        />
                        {/* )} */}

                        {/* {(activeTab === 'All Info' || activeTab === 'Education Qualification') && (
                            <EducationQualificationForm
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                setFieldValue={setFieldValue}
                            />
                        )} */}

                        {/* {(activeTab === 'All Info' || activeTab === 'Lead Status') && (
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
                        )} */}
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

export default EditUserPage;