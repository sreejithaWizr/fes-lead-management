import React, { useEffect, useState } from 'react';
import { CustomInputField, CustomDropDown, CustomDatePicker, CustomCheckboxField } from "react-mui-tailwind";
import { getFESUser, getPriority } from "../../../api/services/masterAPIs/createLeadApi"

const RoleInformationForm = ({ values, errors, touched, handleChange, handleBlur, setFieldValue, mode = "edit" }) => {
    const isEditable = mode === "edit";

    const isCreateMode = mode === "create";

    const [userOptions, setUserOptions] = useState([]);

    const [priorityOptions, setPriorityOptions] = useState([]);
    const [selectedPriorityOption, setSelectedPriorityOption] = useState("");

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [userRes, priorityRes] = await Promise.allSettled([
                    getFESUser(),
                    getPriority(),
                ]);

                setUserOptions(userRes?.value?.data?.data || []);
                setPriorityOptions(priorityRes?.value?.data?.data || []);
            } catch (err) {
                console.error('Error loading dropdown data:', err);
            }
        };

        fetchDropdownData();
    }, []);

    useEffect(() => {
        if (values.priority && priorityOptions?.length > 0) {
            const selected = priorityOptions.find(option => option.id === values.priority);
            setSelectedPriorityOption(selected || "");
        }
    }, [values.priority, priorityOptions]);


    return (
        <div className="form-section animate-fade-in ml-0 mb-6 p-[16px]">
            <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
                Roles Information
            </h2>
            <div className="form-grid">
                <div className="form-field flex flex-row items-start">
                    <CustomInputField
                        state={isEditable || isCreateMode ? "default" : "non-editable"}
                        label="Role Name"
                        value={values.firstName}
                        onChange={(value) => {
                            setFieldValue('roleName', value.target.value)
                        }}
                        onBlur={handleBlur}
                        placeholder="Enter role name"
                        hasError={touched.firstName && Boolean(errors.firstName)}
                        error={touched.firstName && errors.firstName}
                        className="w-full max-w-[calc(100%-40px)]"
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Role Type"
                        options={userOptions}
                        required={true}
                        placeHolder="Select"
                        value={userOptions?.find(option => option.id === values?.roleType) || ""}
                        disabled={!isEditable && !isCreateMode}
                        onChange={(value) => {
                            setFieldValue('roleType', value.target.value?.id);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'roleType' } })}
                        hasError={touched.roleType && Boolean(errors.roleType)}
                        errorMessage={touched.roleType && errors.roleType}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Parent Role"
                        options={userOptions}
                        required={true}
                        placeHolder="Select"
                        value={userOptions?.find(option => option.id === values?.parentRole) || ""}
                        disabled={!isEditable && !isCreateMode}
                        onChange={(value) => {
                            setFieldValue('parentRole', value.target.value?.id);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'parentRole' } })}
                        hasError={touched.parentRole && Boolean(errors.parentRole)}
                        errorMessage={touched.parentRole && errors.parentRole}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Copy Role Template"
                        options={userOptions}
                        required={true}
                        placeHolder="Select"
                        value={userOptions?.find(option => option.id === values?.copyRoleTemplate) || ""}
                        disabled={!isEditable && !isCreateMode}
                        onChange={(value) => {
                            setFieldValue('copyRoleTemplate', value.target.value?.id);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'copyRoleTemplate' } })}
                        hasError={touched.copyRoleTemplate && Boolean(errors.copyRoleTemplate)}
                        errorMessage={touched.copyRoleTemplate && errors.copyRoleTemplate}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Insertion Mode"
                        options={userOptions}
                        required={true}
                        placeHolder="Select"
                        value={userOptions?.find(option => option.id === values?.insertionMode) || ""}
                        disabled={!isEditable && !isCreateMode}
                        onChange={(value) => {
                            setFieldValue('insertionMode', value.target.value?.id);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'insertionMode' } })}
                        hasError={touched.insertionMode && Boolean(errors.insertionMode)}
                        errorMessage={touched.insertionMode && errors.insertionMode}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Organisation"
                        options={userOptions}
                        required={true}
                        placeHolder="Select"
                        value={userOptions?.find(option => option.id === values?.organisation) || ""}
                        disabled={!isEditable && !isCreateMode}
                        onChange={(value) => { 
                            setFieldValue('organisation', value.target.value?.id);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'organisation' } })}
                        hasError={touched.organisation && Boolean(errors.organisation)}
                        errorMessage={touched.organisation && errors.organisation}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Hierarchy Level"
                        options={userOptions}
                        required={true}
                        placeHolder="Select"
                        value={userOptions?.find(option => option.id === values?.hierarchyLevel) || ""}
                        disabled={!isEditable && !isCreateMode}
                        onChange={(value) => {
                            setFieldValue('hierarchyLevel', value.target.value?.id);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'hierarchyLevel' } })}
                        hasError={touched.hierarchyLevel && Boolean(errors.hierarchyLevel)}
                        errorMessage={touched.hierarchyLevel && errors.hierarchyLevel}
                    />
                </div>

                <div className="form-field">
                <CustomInputField
                        state={isEditable || isCreateMode ? "default" : "non-editable"}
                        label="Description"
                        value={values.firstName}
                        onChange={(value) => {
                            setFieldValue('description', value.target.value)
                        }}
                        onBlur={handleBlur}
                        placeholder="Enter description"
                        hasError={touched.description && Boolean(errors.description)}
                        error={touched.description && errors.description}
                        className="w-full max-w-[calc(100%-40px)]"
                    />
                </div>
            </div>
        </div>
    );
};

export default RoleInformationForm;