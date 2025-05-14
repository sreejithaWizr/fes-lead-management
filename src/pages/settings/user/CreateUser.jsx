import React, { useEffect, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import UserInformationForm from '../../../components/forms/createUser/UserInformationForm';
// import { validationSchema } from '../../../components/forms/createUser/schema';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from 'react-mui-tailwind';
import LeftArrowIcon from "../../../assets/arrow-left.svg";
import RightArrowIcon from "../../../assets/arrow-right.svg";

export const formRef = React.createRef();

const CreateUserPage = () => {

    const navigate = useNavigate();
    const initialValues = {
        // Lead Information
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        loginMethod: '',
        status: '',
        orgName: '',
        roles: '',
        branch: '',
        managerReportingTo: '',
        countrySpecialisation: '',
        contactCenterID: '',
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

        // const payload = {
        //     first_name: values?.firstName || '',
        //     last_name: values?.lastName || '',
        //     email: values?.email || '',
        //     secondary_email: values?.secondaryEmail || '',
        //     mobile_number: values?.mobileNumber || '',
        //     alternative_number: values?.alternativeNumber || '',
        //     whatsapp_number: values?.whatsappNumber || '',
        //     tele_callerid: values?.teleCallerName || null,
        //     priority_id: values?.priority || null,
        //     consent: values?.agreeToReceiveBoolean,
        //     created_at: values?.leadCreated || '',
        //     created_by: "Admin",
        // }

        // try {
        //     const response = await createLead(payload);
        //     console.log('User created:', response.data);
        //     if (response?.data?.succeeded === true) {
        //         navigate("/leads")
        //     }
        //     alert("Created")
        //     // Optional: reset form or show toast
        // } catch (err) {
        //     console.error('Error creating user:', err);
        // }
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

export default CreateUserPage;