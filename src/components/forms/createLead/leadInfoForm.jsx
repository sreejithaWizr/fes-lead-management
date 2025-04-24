import React from 'react';
import { CustomInputField, CustomDropDown, CustomDatePicker } from "react-mui-tailwind";
import EditableFieldWrapper from '../../../utils/EditableFieldWrapper';

const LeadInformationForm = ({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {

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
            state="default"
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
            state="default"
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
            state="default"
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
            state="default"
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
            state="default"
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
            state="default"
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
            state="default"
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

        <div className="form-field">
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
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Priority"
            options={["High", "Medium", "Low"]}
            required={true}
            placeHolder="Select"
            value={values.priority}
            onChange={(value) => {
              setFieldValue('priority', value.target.value);
            }}
            onBlur={() => handleBlur({ target: { name: 'priority' } })}
            hasError={touched.priority && Boolean(errors.priority)}
            errorMessage={touched.priority && errors.priority}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Tele Caller"
            options={["John", "Jane"]}
            required={false}
            showAsterisk={false}
            placeHolder="Select"
            value={values.teleCallerName}
            onChange={(value) => {
              setFieldValue('teleCallerName', value.target.value);
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
        <input
          type="checkbox"
          id="agreeToReceiveBoolean"
          name="agreeToReceiveBoolean"
          checked={values.agreeToReceiveBoolean}
          onChange={handleChange}
          className="w-4 h-4 gap-[10px] rounded border"
        />
        <label htmlFor="agreeToReceiveBoolean" className="text-base font-normal leading-[140%] text-[#17222B] font-[Proxima Nova]">
          I agree to receive communications <span className='text-red-600'>*</span>
        </label>
      </div>

    </div>
  );
};

export default LeadInformationForm;