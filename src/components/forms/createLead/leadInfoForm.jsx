import React, { useEffect, useState } from 'react';
import { CustomInputField, CustomDropDown, CustomDatePicker, CustomCheckboxField } from "react-mui-tailwind";
import { getFESUser, getPriority } from "../../../api/services/masterAPIs/createLeadApi"
import { data } from 'autoprefixer';
import EditableFieldWrapper from '../../../utils/EditableFieldWrapper';

const LeadInformationForm = ({ values, errors, touched, handleChange, handleBlur, setFieldValue, mode = "edit" }) => {
  const isEditable = mode === "edit";

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
    console.log('checked', checked);
    setFieldValue('agreeToReceiveBoolean', checked);
  }

  return (
    <div className="form-section animate-fade-in ml-0 mb-6">
      <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
        Lead Information
      </h2>
      <div className="form-grid">
        <div className="form-field flex flex-row items-start">
          {/* <EditableFieldWrapper
            fieldName="firstName"
            value={values.firstName}
            onSave={(field, updatedValue) => setFieldValue(field, updatedValue)}
            onCancel={() => setFieldValue('firstName', values.firstName)} // or previous value
          >
            {(isEditing, val, setVal) => ( */}
          <CustomInputField
            state={isEditable ? "default" : "non-editable"}
            label="First Name"
            value={values.firstName}
            onChange={(value) => {
              setFieldValue('firstName', value.target.value)
            }}
            onBlur={handleBlur}
            placeholder="Enter first name"
            hasError={touched.firstName && Boolean(errors.firstName)}
            error={touched.firstName && errors.firstName}
            className="w-full max-w-[calc(100%-40px)]"
          />
          {/* )}
          </EditableFieldWrapper> */}
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable ? "default" : "non-editable"}
            label="Last Name"
            value={values.lastName}
            onChange={(value) => {
              setFieldValue('lastName', value.target.value)
            }}
            placeholder="Enter last name"
            onBlur={handleBlur}
            hasError={touched.lastName && Boolean(errors.lastName)}
            error={touched.lastName && errors.lastName}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable ? "default" : "non-editable"}
            label="Email"
            value={values.email}
            onChange={(value) => {
              setFieldValue('email', value.target.value)
            }}
            placeholder="Enter email"
            onBlur={handleBlur}
            hasError={touched.email && Boolean(errors.email)}
            error={touched.email && errors.email}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable ? "default" : "non-editable"}
            label="Secondary Email"
            value={values.secondaryEmail}
            showAsterisk={false}
            onChange={(value) => {
              setFieldValue('secondaryEmail', value.target.value)
            }}
            placeholder="Enter secondary email"
            onBlur={handleBlur}
            hasError={touched.secondaryEmail && Boolean(errors.secondaryEmail)}
            error={touched.secondaryEmail && errors.secondaryEmail}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable ? "default" : "non-editable"}
            label="Mobile Number"
            value={values.mobileNumber}
            onChange={(value) => {
              setFieldValue('mobileNumber', value.target.value)
            }}
            placeholder="Enter mobile number"
            onBlur={handleBlur}
            hasError={touched.mobileNumber && Boolean(errors.mobileNumber)}
            error={touched.mobileNumber && errors.mobileNumber}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable ? "default" : "non-editable"}
            label="Alternative Number"
            value={values.alternativeNumber}
            showAsterisk={false}
            onChange={(value) => {
              setFieldValue('alternativeNumber', value.target.value)
            }}
            placeholder="Enter alternative number"
            onBlur={handleBlur}
            hasError={touched.alternativeNumber && Boolean(errors.alternativeNumber)}
            error={touched.alternativeNumber && errors.alternativeNumber}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable ? "default" : "non-editable"}
            label="Whatsapp Number"
            value={values.whatsappNumber}
            showAsterisk={false}
            onChange={(value) => {
              setFieldValue('whatsappNumber', value.target.value)
            }}
            placeholder="Enter whatsapp number"
            onBlur={handleBlur}
            hasError={touched.whatsappNumber && Boolean(errors.whatsappNumber)}
            error={touched.whatsappNumber && errors.whatsappNumber}
          />
        </div>

        {/* <div className="form-field">
          <CustomDropDown
            name="leadOwner"
            label="Lead Owner"
            options={["Option 1", "Option 2", "Option 3"]}
            required={true}
            placeHolder="Select"
            value={values.leadOwner}
            onChange={(value) => {
              setFieldValue('leadOwner', value.target.value);
            }}
            onBlur={() => handleBlur({ target: { name: 'leadOwner' } })}
            hasError={touched.leadOwner && Boolean(errors.leadOwner)}
            errorMessage={touched.leadOwner && errors.leadOwner}
            key={`leadStatus-${values.leadStatus}`}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Lead Status"
            options={["Potential", "Inactive", "Enrolled", "May be Prospective"]}
            required={true}
            placeHolder="Select"
            value={values.leadStatusInfo}
            onChange={(value) => {
              setFieldValue('leadStatusInfo', value.target.value);
            }}
            onBlur={() => handleBlur({ target: { name: 'leadStatusInfo' } })}
            hasError={touched.leadStatusInfo && Boolean(errors.leadStatusInfo)}
            errorMessage={touched.leadStatusInfo && errors.leadStatusInfo}
          />
        </div> */}

        <div className="form-field">
          <CustomDropDown
            label="Priority"
            options={priorityOptions}
            required={true}
            placeHolder="Select"
            // value={priorityOptions?.find(option => option.id === values.priority) || ""}
            value={isEditable ? selectedPriorityOption : (priorityOptions?.find(option => option.id === values.priority) || "")}
            disabled={!isEditable}
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
            label="Tele Caller"
            options={userOptions}
            required={true}
            placeHolder="Select"
            value={userOptions?.find(option => option.id === values?.teleCallerName) || ""}
            disabled={!isEditable}
            onChange={(value) => {
              setFieldValue('teleCallerName', value.target.value?.id);
            }}
            onBlur={() => handleBlur({ target: { name: 'teleCallerName' } })}
            hasError={touched.teleCallerName && Boolean(errors.teleCallerName)}
            errorMessage={touched.teleCallerName && errors.teleCallerName}
          />
        </div>

        <div className="form-field">
          <CustomDatePicker
            label="Lead Created"
            value={values?.leadCreated}
            disabled={!isEditable}
            onChange={(value) => {
              setFieldValue('leadCreated', value)
            }}
          />
        </div>
      </div>
      <div className="mt-6">
        <div className="form-field">
          <CustomInputField
            state="non-editable"
            label="Lead Number"
            valueType="default"
            value={values.leadNumber}
            showAsterisk={false}
            readOnly
            onChange={handleChange}
            placeholder="LEAD355451001"
            className="bg-gray-50"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        {/* <CustomCheckboxField name="agreeToReceiveBoolean" label="I agree to receive communications" disabled={!isEditable ? true : false} onChange={handleAgreeToReceiveOnChange} checked={values?.agreeToReceiveBoolean} /> */}
        <CustomCheckboxField name="agreeToReceiveBoolean" label="I agree to receive communications"  onChange={handleAgreeToReceiveOnChange} disabled={!isEditable} checked={values?.agreeToReceiveBoolean ? true : false} />
        {/* <span className='text-red-600'>*</span> */}
      </div>

    </div>
  );
};

export default LeadInformationForm;