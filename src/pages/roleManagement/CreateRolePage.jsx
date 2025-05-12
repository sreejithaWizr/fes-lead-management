import React, { useEffect, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import { CustomButton } from 'react-mui-tailwind'
import WarningIcon from '../../assets/warning-icon.svg'
import { useNavigate } from 'react-router-dom';
import RoleInformationForm from '../../components/forms/createRole/RoleInformationForm';
import { validationSchema } from '../../components/forms/createLead/schema';
import LeadNumberIcon from '../../assets/personalcard.svg';
import LeftArrowIcon from "../../assets/arrow-left.svg";
import RightArrowIcon from "../../assets/arrow-right.svg";

const CreateRole = () => {

    const navigate = useNavigate()


    

    const initialValues = {
        //Role Info
        roleName: '',
        roleType: '',
        parentRole: '',
        childRole: '',
        insertionMode: '',
        organization: '',
        description: '',

        // Role Access

        // Lead Form View Permission
        leadFormViewPermission: false,
        leadInformationView: false,
        educationQualificationView: false,
        leadSourceView: false,
        leadStatusView: false,
        opportunityView: false,

        // Lead Form Edit Permission
        leadFormEditPermission: false,
        leadInformationEdit: false,
        educationQualificationEdit: false,
        leadSourceEdit: false,
        leadStatusEdit: false,
        opportunityEdit: false,

        // Masked Data View
        maskedDataView: false,
        email: false,
        secondaryEmail: false,
        phone: false,
        whatsAppNumber: false,
        source1: false,

        // Delete Access
        deleteAccess: true,
        opportunityLead: false,
        leadDelete: false,

    };

    useEffect(() => {
        
    })

    const handleSubmit = async (values, { setSubmitting }) => {

        console.log("Valuees", values)

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

    const leadData = {
        first_name: "Anjana",
        last_name: "James",
        lead_number: "o9090",
        email: "akskksksk@fjma0.com",
        mobile_number: "0909389489"
    }

    const handleBack = () => {
        navigate("/settings?tab=Role+Management")
    }

    return (
        <div className="w-full">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
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
                        <div className="flex w-full justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={LeftArrowIcon}
                                    alt="FES Logo"
                                    className="size-[24px] rounded-md cursor-pointer"
                                    onClick={handleBack}
                                />
                                <div className="flex items-center gap-2">
                                    <h1
                                        className="font-proxima font-bold text-[28px] leading-[140%] align-middle text-[#17222B]">
                                        Add new role
                                    </h1>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <CustomButton text="Cancel" variant="secondary" startIcon={false} endIcon={false} onClick={handleBack} />
                                <CustomButton text="Submit" startIcon={false} endIcon={true} iconImg={RightArrowIcon} onClick={handleSubmit} />
                            </div>
                            {/* for search button if needed */}
                            <></>
                            {/* <div className="flex items-center gap-3">
                                                    <CustomButton text="Cancel" variant="secondary" startIcon={false} endIcon={false} onClick={handleBack} />
                                                    <CustomButton text="Update" startIcon={false} endIcon={true} iconImg={RightArrowIcon} onClick={handleFormSubmit} />
                                                </div> */}
                        </div>
                        {/* <div className="p-4 rounded-lg mb-4">
                            <div className="flex items-start justify-between flex-wrap">
                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 bg-slate-700 text-white rounded-full flex items-center justify-center text-lg font-semibold">
                                        {leadData?.first_name?.charAt(0)} {leadData?.last_name?.charAt(0)}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <h1 className="font-bold text-[19px] text-[#17222B]">{leadData?.first_name} {leadData?.last_name}</h1>
                                            <span className="text-xs px-2 py-1 rounded-full bg-[#FFF3E6] text-[#FF8400] font-medium border border-[#FFB86B]">
                                                May be Prospective
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600 flex flex-wrap gap-x-4">
                                            <div className="flex items-center space-x-2">
                                                <img src={LeadNumberIcon} alt="Lead Icon" className="w-5 h-5" />
                                                <span className="text-[13px]">{leadData?.lead_number}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">

                                            </div>
                                            <div className="flex items-center space-x-2">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <CustomButton
                                        variant="button"
                                        text="Submit"
                                        endIcon={false}
                                        showText={true}
                                        onClick={handleSubmit}
                                    />
                                </div>
                            </div>
                        </div> */}
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

                        <RoleInformationForm
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            setFieldValue={setFieldValue}
                        />
                    </form>
                )}
            </Formik>
        </div>
    )
};

export default CreateRole;
