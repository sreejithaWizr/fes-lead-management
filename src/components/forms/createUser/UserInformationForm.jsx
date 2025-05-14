import React, { useEffect, useState } from 'react';
import { CustomInputField, CustomDropDown, CustomDatePicker, CustomCheckboxField } from "react-mui-tailwind";
import { getFESUser, getPriority } from "../../../api/services/masterAPIs/createLeadApi"
import { data } from 'autoprefixer';
import EditableFieldWrapper from '../../../utils/EditableFieldWrapper';

const UserInformationForm = ({ values, errors, touched, handleChange, handleBlur, setFieldValue, mode = "edit" }) => {
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

  const handleAgreeToReceiveOnChange = (event) => {
    const { checked } = event.target;
    setFieldValue('agreeToReceiveBoolean', checked);
  }

  return (
    <div className="form-section animate-fade-in ml-0 mb-6">
      <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
        User Information
      </h2>
      <div className="form-grid">
        <div className="form-field flex flex-row items-start">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "non-editable"}
            label="First Name"
            value={values.userFirstName}
            onChange={(value) => {
              setFieldValue('userFirstName', value.target.value)
            }}
            onBlur={handleBlur}
            placeholder="Enter first name"
            hasError={touched.userFirstName && Boolean(errors.userFirstName)}
            error={touched.userFirstName && errors.userFirstName}
            className="w-full max-w-[calc(100%-40px)]"
          />
          {/* )}
          </EditableFieldWrapper> */}
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "non-editable"}
            label="Last Name"
            value={values.userLastName}
            onChange={(value) => {
              setFieldValue('userLastName', value.target.value)
            }}
            placeholder="Enter last name"
            onBlur={handleBlur}
            hasError={touched.userLastName && Boolean(errors.userLastName)}
            error={touched.userLastName && errors.userLastName}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "non-editable"}
            label="Email"
            value={values.userEmail}
            onChange={(value) => {
              setFieldValue('userEmail', value.target.value)
            }}
            placeholder="Enter email"
            onBlur={handleBlur}
            hasError={touched.userEmail && Boolean(errors.userEmail)}
            error={touched.userEmail && errors.userEmail}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "non-editable"}
            label="Phone Number"
            value={values.userPhoneNumber}
            showAsterisk={true}
            onChange={(value) => {
              setFieldValue('userPhoneNumber', value.target.value)
            }}
            placeholder="Enter phone number"
            onBlur={handleBlur}
            hasError={touched.userPhoneNumber && Boolean(errors.userPhoneNumber)}
            error={touched.userPhoneNumber && errors.userPhoneNumber}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "non-editable"}
            label="Login Method"
            value={values.userLoginMethod}
            showAsterisk={false}
            onChange={(value) => {
              setFieldValue('userLoginMethod', value.target.value)
            }}
            placeholder="Enter login method"
            onBlur={handleBlur}
            hasError={touched.userLoginMethod && Boolean(errors.userLoginMethod)}
            error={touched.userLoginMethod && errors.userLoginMethod}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "non-editable"}
            label="Status"
            value={values.userStatus}
            showAsterisk={true}
            onChange={(value) => {
              setFieldValue('userStatus', value.target.value)
            }}
            placeholder="Enter status"
            onBlur={handleBlur}
            hasError={touched.userStatus && Boolean(errors.userStatus)}
            error={touched.userStatus && errors.userStatus}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "non-editable"}
            label="Organisation Name"
            value={values.userOrganisationName}
            showAsterisk={true}
            onChange={(value) => {
              setFieldValue('userOrganisationName', value.target.value)
            }}
            placeholder="Enter organisation name"
            onBlur={handleBlur}
            hasError={touched.userOrganisationName && Boolean(errors.userOrganisationName)}
            error={touched.userOrganisationName && errors.userOrganisationName}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Roles"
            options={priorityOptions}
            required={true}
            placeHolder="Select"
            // value={priorityOptions?.find(option => option.id === values.priority) || ""}
            value={isEditable ? selectedPriorityOption : (priorityOptions?.find(option => option.id === values.priority) || "")}
            disabled={!isEditable && !isCreateMode}
            onChange={(value) => {
              // setFieldValue('priority', value.target.value);
              setSelectedPriorityOption(value?.target?.value);   // update local selected object
              setFieldValue('priority', value?.target?.value?.id); // update formik value
            }}
            onBlur={() => handleBlur({ target: { name: 'priority' } })}
            hasError={touched.priority && Boolean(errors.priority)}
            errorMessage={touched.priority && errors.priority}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Branch"
            options={userOptions}
            required={true}
            placeHolder="Select"
            value={userOptions?.find(option => option.id === values?.teleCallerName) || ""}
            disabled={!isEditable && !isCreateMode}
            onChange={(value) => {
              setFieldValue('teleCallerName', value.target.value?.id);
            }}
            onBlur={() => handleBlur({ target: { name: 'teleCallerName' } })}
            hasError={touched.teleCallerName && Boolean(errors.teleCallerName)}
            errorMessage={touched.teleCallerName && errors.teleCallerName}
          />
        </div>
       
        <div className="form-field">
          <CustomDropDown
            label="Manager Reporting To"
            options={userOptions}
            required={true}
            placeHolder="Select"
            value={userOptions?.find(option => option.id === values?.teleCallerName) || ""}
            disabled={!isEditable && !isCreateMode}
            onChange={(value) => {
              setFieldValue('teleCallerName', value.target.value?.id);
            }}
            onBlur={() => handleBlur({ target: { name: 'teleCallerName' } })}
            hasError={touched.teleCallerName && Boolean(errors.teleCallerName)}
            errorMessage={touched.teleCallerName && errors.teleCallerName}
          />
        </div>
        
        <div className="form-field">
          <CustomDropDown
            label="Country Specialisation"
            options={userOptions}
            required={true}
            placeHolder="Select"
            value={userOptions?.find(option => option.id === values?.teleCallerName) || ""}
            disabled={!isEditable && !isCreateMode}
            onChange={(value) => {
              setFieldValue('teleCallerName', value.target.value?.id);
            }}
            onBlur={() => handleBlur({ target: { name: 'teleCallerName' } })}
            hasError={touched.teleCallerName && Boolean(errors.teleCallerName)}
            errorMessage={touched.teleCallerName && errors.teleCallerName}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "non-editable"}
            label="Contact Center ID"
            value={values.userContactCenterId}
            showAsterisk={false}
            onChange={(value) => {
              setFieldValue('userContactCenterId', value.target.value)
            }}
            placeholder="Enter contact center ID"
            onBlur={handleBlur}
            hasError={touched.userContactCenterId && Boolean(errors.userContactCenterId)}
            error={touched.userContactCenterId && errors.userContactCenterId}
          />
        </div>
      </div>
    </div>
  );
};

export default UserInformationForm;