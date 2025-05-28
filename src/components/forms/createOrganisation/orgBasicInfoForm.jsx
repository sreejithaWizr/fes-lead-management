import React, { useEffect, useState } from 'react';
import { CustomInputField, CustomDropDown, CustomToggle } from "react-mui-tailwind";
import { getCountry, getOrganizationType, getParentOrganisation, getServiceEnabled, getState } from "../../../api/services/masterAPIs/createLeadApi"

const OrganisationBasicInfoForm = ({ values, errors, touched, handleChange, handleBlur, setFieldValue, mode = "edit" }) => {
  const isEditable = mode === "edit";

  console.log("initialValues11", values)
  const isCreateMode = mode === "create";

  const [typeOptions, setTypeOptions] = useState([]);
  const [oganisationOptions, setOrganaisationOptions] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [defaultMultiValue, setDefaultMultiValue] = useState([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [countryRes, orgRes, stateRes, parentOrgRes, serviceRes] = await Promise.allSettled([
          getCountry(),
          getOrganizationType(),
          getState(),
          getParentOrganisation(),
          getServiceEnabled()
        ]);

        setCountryOptions(countryRes?.value?.data?.data || []);
        setTypeOptions(orgRes?.value?.data?.data || []);
        setStateOptions(stateRes?.value?.data?.data || []);
        setOrganaisationOptions(parentOrgRes?.value?.data?.data || []);
        setServiceOptions(serviceRes?.value?.data?.data || []);
      } catch (err) {
        console.error('Error loading dropdown data:', err);
      }
    };

    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (values?.service_enabled?.length > 0) {
      const selectedOptions = serviceOptions?.filter(option =>
        values?.service_enabled.includes(option?.id)
      );
      setDefaultMultiValue(selectedOptions);
    }
  }, [values?.service_enabled, serviceOptions]);


  return (
    <div className="form-section animate-fade-in ml-0 mb-6">
      <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
        Basic Information
      </h2>
      <div className="form-grid">
        <div className="form-field flex flex-row items-start">
          <CustomInputField
            required
            state={isEditable || isCreateMode ? "default" : "disabled"}
            label="Organisation Name"
            value={values.orgName}
            onChange={(value) => {
              setFieldValue('orgName', value.target.value)
            }}
            onBlur={handleBlur}
            placeholder="Enter organisation name"
            hasError={touched.orgName && Boolean(errors.orgName)}
            error={touched.orgName && errors.orgName}
            className="w-full max-w-[calc(100%-40px)]"
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Type"
            options={typeOptions}
            required={true}
            placeHolder="Select"
            value={typeOptions?.find(option => option.id === values.type) || ""}
            // value={isEditable ? selectedPriorityOption : (typeOptions?.find(option => option.id === values.type) || "")}
            disabled={!isEditable && !isCreateMode}
            onChange={(value) => {
              setFieldValue('type', value?.target?.value?.id); // update formik value
            }}
            onBlur={() => handleBlur({ target: { name: 'type' } })}
            hasError={touched.type && Boolean(errors.type)}
            errorMessage={touched.type && errors.type}
          />
        </div>

        {/* <div className="form-field">
          <CustomDropDown
            label="Country/Region"
            options={countryOptions}
            required={true}
            placeHolder="Select"
            value={countryOptions?.find(option => option.id === values.region) || ""}
            // value={isEditable ? selectedPriorityOption : (countryOptions?.find(option => option.id === values.region) || "")}
            disabled={!isEditable && !isCreateMode}
            onChange={(value) => {
              setFieldValue('region', value?.target?.value?.id); // update formik value
            }}
            onBlur={() => handleBlur({ target: { name: 'region' } })}
            hasError={touched.region && Boolean(errors.region)}
            errorMessage={touched.region && errors.region}
          />
        </div> */}

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "disabled"}
            label="Business Email"
            showAsterisk={false}
            value={values.business_mail}
            onChange={(value) => {
              setFieldValue('business_mail', value.target.value)
            }}
            placeholder="Enter email"
            onBlur={handleBlur}
            hasError={touched.business_mail && Boolean(errors.business_mail)}
            error={touched.business_mail && errors.business_mail}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "disabled"}
            label="Contact Number"
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
            state="disabled"
            // state={isEditable || isCreateMode ? "default" : "disabled"}
            label="File Uploads"
            value={values.alternativeNumber}
            showAsterisk={false}
            onChange={(value) => {
              setFieldValue('alternativeNumber', value.target.value)
            }}
            placeholder="Upload File"
            onBlur={handleBlur}
            hasError={touched.alternativeNumber && Boolean(errors.alternativeNumber)}
            error={touched.alternativeNumber && errors.alternativeNumber}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "disabled"}
            label="Primary Admin User Name"
            value={values.primary_admin_user_name}
            showAsterisk={false}
            onChange={(value) => {
              setFieldValue('primary_admin_user_name', value.target.value)
            }}
            placeholder="Enter name"
            onBlur={handleBlur}
            hasError={touched.primary_admin_user_name && Boolean(errors.primary_admin_user_name)}
            error={touched.primary_admin_user_name && errors.primary_admin_user_name}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "disabled"}
            label="Admin Email"
            value={values.admin_mail}
            onChange={(value) => {
              setFieldValue('admin_mail', value.target.value)
            }}
            placeholder="Enter mail"
            onBlur={handleBlur}
            hasError={touched.admin_mail && Boolean(errors.admin_mail)}
            error={touched.admin_mail && errors.admin_mail}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Parent Organisation"
            options={oganisationOptions}
            required={true}
            placeHolder="Select"
            value={oganisationOptions?.find(option => option.id === values.parent_org) || ""}
            // value={isEditable ? selectedparent_orgOption : (oganisationOptions?.find(option => option.id === values.parent_org) || "")}
            disabled={!isEditable && !isCreateMode}
            onChange={(value) => {
              setFieldValue('parent_org', value?.target?.value?.id); // update formik value
            }}
            onBlur={() => handleBlur({ target: { name: 'parent_org' } })}
            hasError={touched.parent_org && Boolean(errors.parent_org)}
            errorMessage={touched.parent_org && errors.parent_org}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Services Enabled"
            options={serviceOptions}
            required={true}
            multiple={true}
            placeHolder="Select"
            // value={defaultMultiValue}
            // value={serviceOptions?.find(option => option?.id === values?.service_enabled) || ""}
            value={isEditable ? defaultMultiValue : serviceOptions?.filter(option => values?.service_enabled?.includes(option?.id)) || []}
            // disabled={!isEditable}
            onChange={(value) => {
              setDefaultMultiValue(value.target.value); // Update dropdown visible values
              // setFieldValue('service_enabled', value.target.value)
              setFieldValue('service_enabled', value?.target?.value.map(v => v.id)); // Save only IDs to form
            }}
            onBlur={() => handleBlur({ target: { name: 'service_enabled' } })}
            hasError={touched.service_enabled && Boolean(errors.service_enabled)}
            errorMessage={touched.service_enabled && errors.service_enabled}
          />
        </div>


        <div className="form-field">
          <span className="font-bold text-[11px] leading-[140%] align-middle text-[#858585]">
            Status
          </span>
          <CustomToggle
            label={values?.status == true ? "Active" : "Inactive"}
            position="right"
            checked={values?.status}
            onChange={(e) => setFieldValue("status", e)}
            disabled={!isEditable && !isCreateMode}
          />
        </div>


      </div>
      <div className="form-field mt-6">
        <CustomInputField
          label="Notes"
          showAsterisk={false}
          width="100%"
          value={values.notes}
          multiline={true} // Enable textarea
          rows={4} // Optional: customize visible rows
          minRows={4} // Optional: set minimum rows
          onChange={(e) => setFieldValue("notes", e.target.value)}
        />
      </div>



      <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4 mt-4">
        Business Information
      </h2>
      <div className="form-grid">
        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "disabled"}
            showAsterisk={false}
            label="Street"
            value={values.street}
            onChange={(value) => {
              setFieldValue('street', value.target.value)
            }}
            placeholder="Enter street"
            onBlur={handleBlur}
            hasError={touched.street && Boolean(errors.street)}
            error={touched.street && errors.street}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "disabled"}
            showAsterisk={false}
            label="City"
            value={values.city}
            onChange={(value) => {
              setFieldValue('city', value.target.value)
            }}
            placeholder="Enter city"
            onBlur={handleBlur}
            hasError={touched.city && Boolean(errors.city)}
            error={touched.city && errors.city}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="State"
            options={stateOptions}
            required={false}
            showAsterisk={false}
            placeHolder="Select"
            value={stateOptions?.find(option => option.id === values.state) || ""}
            // disabled={!isEditable}
            onChange={(value) => {
              setFieldValue('state', value.target.value.id);
            }}
            onBlur={() => handleBlur({ target: { name: 'state' } })}
            hasError={touched.state && Boolean(errors.state)}
            errorMessage={touched.state && errors.state}
          />
        </div>


        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "disabled"}
            showAsterisk={false}
            label="Postal Code"
            value={values.postal_code}
            onChange={(value) => {
              setFieldValue('postal_code', value.target.value)
            }}
            placeholder="Enter postal code"
            onBlur={handleBlur}
            hasError={touched.postal_code && Boolean(errors.postal_code)}
            error={touched.postal_code && errors.postal_code}
          />
        </div>
        <div className="form-field">
          <CustomDropDown
            label="Country"
            options={countryOptions}
            showAsterisk={false}
            placeHolder="Select"
            value={countryOptions?.find(option => option?.id === values?.country) || ""}
            // disabled={!isEditable}
            onChange={(value) => {
              setFieldValue('country', value.target.value?.id);
            }}
            onBlur={() => handleBlur({ target: { name: 'country' } })}
            hasError={touched.country && Boolean(errors.country)}
            errorMessage={touched.country && errors.country}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "disabled"}
            label="GST No"
            value={values.gst_no}
            placeholder="Enter GST number"
            onChange={(value) => {
              setFieldValue('gst_no', value.target.value)
            }}
            onBlur={handleBlur}
            hasError={touched.gst_no && Boolean(errors.gst_no)}
            error={touched.gst_no && errors.gst_no}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "disabled"}
            label="Primary Point of Contact (POC)"
            value={values.primary_poc}
            onChange={(value) => {
              setFieldValue('primary_poc', value.target.value)
            }}
            placeholder="Enter number"
            onBlur={handleBlur}
            hasError={touched.primary_poc && Boolean(errors.primary_poc)}
            error={touched.primary_poc && errors.primary_poc}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "disabled"}
            label="POC Email"
            value={values.poc_mail}
            onChange={(value) => {
              setFieldValue('poc_mail', value.target.value)
            }}
            placeholder="Enter mail"
            onBlur={handleBlur}
            hasError={touched.poc_mail && Boolean(errors.poc_mail)}
            error={touched.poc_mail && errors.poc_mail}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state={isEditable || isCreateMode ? "default" : "disabled"}
            showAsterisk={false}
            label="POC Phone Number"
            value={values.poc_mobileNumber}
            onChange={(value) => {
              setFieldValue('poc_mobileNumber', value.target.value)
            }}
            placeholder="Enter number"
            onBlur={handleBlur}
            hasError={touched.poc_mobileNumber && Boolean(errors.poc_mobileNumber)}
            error={touched.poc_mobileNumber && errors.poc_mobileNumber}
          />
        </div>

      </div>
    </div>
  );
};

export default OrganisationBasicInfoForm;