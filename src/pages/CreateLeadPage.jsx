
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createLead } from '../store/leadsSlice';
import { useNavigate } from 'react-router-dom';
import { CustomButton, CustomInputField, CustomDropDown, CustomDatePicker } from "react-mui-tailwind";
// import { WarningIcon } from "../assets/warning-icon.svg";

const CreateLeadPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Info');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    secondaryEmail: '',
    mobileNumber: '',
    alternativeNumber: '',
    whatsappNumber: '',
    leadStatus: '',
    category: '',
    subCategory: '',
    branch: '',
    counselor: '',
    notes: '',
    leadSource_1: '',
    leadSource_2: '',
    leadSource_3: '',
    location_1: '',
    location_2: '',
    referrerName: '',
    referrerEmployeeId: '',
    vertical: '',
    desiredProgram: '',
    internshipOption: '',
    adName: '',
    adCampaign: '',
    leadForm: '',
    ipAddress: '192.168.1.1',
    priority: '',
    teleCallerName: '',
    leadCreated: new Date().toISOString().split('T')[0],
    leadNumber: `LEAD${Math.floor(Math.random() * 900000) + 100000}`,
    agreeToReceive: false,
    highestQualification: '',
    graduationYear: '',
    fieldOfStudy: '',
    cgpaGrade: '',
    workExperience: '',
    preferredDestination: '',
    otherCountries: '',
    testName: '',
  });

  // This state is used to track the validation status of each tab
  const [tabValidation, setTabValidation] = useState({
    "Lead Information": true,
    "Education Qualification": true,
    "Lead Status": true,
    "Lead Source": true,
  });

  // This function validates the fields in the current tab
  const validateFields = (fields) => {
    return fields.every((field) => formData[field]?.trim() !== "");
  };

  // This function validates all tabs and sets the validation state
  const validateTabs = () => {
    const validations = {
      "Lead Information": validateFields(["firstName", "lastName", "email", "mobileNumber", "leadOwner", "leadStatus", "priority"]),
      "Education Qualification": validateFields(["highestQualification", "graduationYear", "fieldOfStudy"]),
      "Lead Status": validateFields(["leadStatus", "category", "subCategory", "branch", "counselor"]),
      "Lead Source": validateFields(["leadSource_1", "location_1", "vertical", "desiredProgram"]),
    };

    setTabValidation(validations);
    return validations;
  };

  // State for input field value
  const [textValue, setTextValue] = useState("Value");

  const handleChange = (e) => {
    setTextValue(e.target.value)

    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validations = validateTabs();
    if (Object.values(validations).some((isValid) => !isValid)) {
      // Don't submit if any tab has invalid fields
      return;
    }

    dispatch(createLead(formData)).then(() => {
      navigate('/leads');
    });
  };

  const tabs = ['All Info', 'Lead Information', 'Education Qualification', 'Lead Status', 'Lead Source'];

  const yearOptions = ["Select", ...Array.from({ length: 20 }, (_, i) => `${new Date().getFullYear() - i}`)];
  const numberOfYears = ["Select", ...Array.from({ length: 21 }, (_, i) => i)];

  // Lead Information
  const renderLeadInformationForm = () => (
    <div className="form-section animate-fade-in ml-0">
      <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
        Lead Information
      </h2>

      <div className="form-grid">
        <div className="form-field">
          <CustomInputField
            state="default"
            label="First Name"
            value={formData.firstName}
            // onChange={(e) => setTextValue(e.target.value)}
            onChange={handleChange}
            placeholder="Enter first name"
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state="default"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state="default"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state="default"
            label="Secondary Email"
            value={formData.secondaryEmail}
            showAsterisk={false}
            onChange={handleChange}
            placeholder="Enter secondary email"
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state="default"
            label="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter mobile number"
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state="default"
            label="Alternative Number"
            value={formData.alternativeNumber}
            showAsterisk={false}
            onChange={handleChange}
            placeholder="Enter alternative number"
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state="default"
            label="Whatsapp Number"
            value={formData.whatsappNumber}
            showAsterisk={false}
            onChange={handleChange}
            placeholder="Enter whatsapp number"
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Lead Owner"
            options={["Select", "Option 1", "Option 2", "Option 3"]}
            required={true}
            initialValue="Select"
            onChange={handleChange}
            value={formData.leadOwner}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Lead Status"
            options={["Select", "Potential", "Inactive", "Enrolled", "May be Prospective"]}
            required={true}
            initialValue="Select"
            onChange={handleChange}
            value={formData.leadStatus}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Priority"
            options={["Select", "High", "Medium", "Low"]}
            required={true}
            initialValue="Select"
            onChange={handleChange}
            value={formData.priority}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Tele Caller"
            options={["Select", "John", "Jane"]}
            required={false}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.teleCallerName}
          />
        </div>

        <div className="form-field">
          <CustomDatePicker label="Lead Created" value={formData.leadCreated} onChange={handleChange} />
        </div>
      </div>

      <div className="mt-6">
        <div className="form-field">
          <CustomInputField
            state="non-editable"
            label="Lead Number"
            valueType="default"
            value={formData.leadNumber}
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
          id="agreeToReceive"
          name="agreeToReceive"
          checked={formData.agreeToReceive}
          onChange={handleChange}
          className="w-4 h-4 gap-[10px] rounded border"
        />
        <label htmlFor="agreeToReceive" className="text-base font-normal leading-[140%] text-[#17222B] font-[Proxima Nova]">
          I agree to receive communications <span className='text-red-600'>*</span>
        </label>
      </div>
    </div>
  );

  // Education Qualification
  const renderEducationQualificationForm = () => (
    <div className="form-section animate-fade-in ml-0">
      <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
        Education Qualification
      </h2>
      <div className="form-grid">
        <div className="form-field">
          <CustomDropDown
            label="Highest Qualification"
            options={["Select", "Bachelor's", "Master's", "PhD"]}
            required={true}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.highestQualification}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Graduation Year"
            options={yearOptions}
            // options={["Select", "Bachelor's", "Master's", "PhD"]}
            required={true}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.graduationYear}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Field of Study"
            options={["Select", "Computer Science", "Engineering", "Business", "Arts"]}
            required={true}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.fieldOfStudy}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state="default"
            label="CGPA/Grade"
            value={formData.cgpaGrade}
            showAsterisk={false}
            onChange={handleChange}
            placeholder="Enter CGPA/Grade"
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Work Experience (Years)"
            options={numberOfYears}
            required={false}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.workExperience}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Preferred Study Destination"
            options={["Select", "US", "Australia", "Canada", "London"]}
            required={false}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.preferredDestination}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Other Countries"
            options={["Select", "US", "Australia", "Canada", "Germany"]}
            required={false}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.otherCountries}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <input
          type="checkbox"
          id="agreeToReceive"
          name="agreeToReceive"
          checked={formData.agreeToReceive}
          onChange={handleChange}
          className="w-4 h-4 gap-[10px] rounded border"
        />
        <label htmlFor="agreeToReceive" className="text-base font-normal leading-[140%] text-[#17222B] font-[Proxima Nova]">
          Test Training Required
        </label>
      </div>

      <div className="form-field mt-4">
        <CustomInputField
          state="default"
          label="Test Name"
          value={formData.testName}
          showAsterisk={false}
          onChange={handleChange}
          placeholder="Enter test name"
        />
      </div>
    </div>
  );

  // Lead Status
  const renderLeadStatusForm = () => (
    <div className="form-section animate-fade-in ml-0">
      <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
        Lead Status
      </h2>
      <div className="form-grid">
        <div className="form-field">
          <CustomDropDown
            label="Status"
            options={["Select", "Potential", "Inactive", "Enrolled", "May be Prospective"]}
            required={true}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.leadStatus}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Category"
            options={["Select", "Potential", "Inactive", "Enrolled", "May be Prospective"]}
            required={true}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.category}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Subcategory"
            options={["Select", "Subcategory 1", "Subcategory 2", "Subcategory 3"]}
            required={true}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.subCategory}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Branch"
            options={["Select", "Branch 1", "Branch 2", "Branch 3"]}
            required={true}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.branch}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Counselor"
            options={["Select", "Counselor 1", "Counselor 2", "Counselor 3"]}
            required={true}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.counselor}
          />
        </div>
      </div>

      <div className="form-field mt-4">
        <CustomInputField
          state="default"
          label="Notes"
          value={formData.notes}
          showAsterisk={false}
          onChange={handleChange}
          placeholder="Type your notes here"
        />
      </div>
    </div>
  );

  // Lead Source
  const renderLeadSourceForm = () => (
    <div className="form-section animate-fade-in ml-0">
      <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
        Lead Source
      </h2>
      <div className="form-grid">
        <div className="form-field">
          <CustomDropDown
            label="Source 1"
            options={["Select", "Meta", "Google Ads", "Referral", "Website"]}
            required={true}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.leadSource_1}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Source 2"
            options={["Select", "Meta", "Google Ads", "Referral", "Website"]}
            required={false}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.leadSource_2}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Source 3"
            options={["Select", "Meta", "Google Ads", "Referral", "Website"]}
            required={false}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.leadSource_3}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Location 1"
            options={["Select", "Location 1", "Location 2", "Location 3"]}
            required={true}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.location_1}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Location 2"
            options={["Select", "Location 1", "Location 2", "Location 3"]}
            required={false}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.location_2}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state="default"
            label="Referrer Name"
            value={formData.referrerName}
            showAsterisk={false}
            onChange={handleChange}
            placeholder="Enter referrer name"
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state="default"
            label="Referrer Employee ID"
            value={formData.referrerEmployeeId}
            showAsterisk={false}
            onChange={handleChange}
            placeholder="Enter referrer employee ID"
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Vertical"
            options={["Select", "Vertical 1", "Vertical 2", "Vertical 3"]}
            required={true}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.vertical}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Desired Program"
            options={["Select", "Desired Program 1", "Desired Program 2", "Desired Program 3"]}
            required={true}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.desiredProgram}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Internship Option"
            options={["Select", "Option 1", "Option 2", "Option 3"]}
            required={false}
            showAsterisk={false}
            initialValue="Select"
            onChange={handleChange}
            value={formData.internshipOption}
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state="default"
            label="Ad Name"
            value={formData.adName}
            showAsterisk={false}
            onChange={handleChange}
            placeholder="Enter ad name"
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state="default"
            label="Ad Campaign"
            value={formData.adCampaign}
            showAsterisk={false}
            onChange={handleChange}
            placeholder="Enter ad campaign"
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state="default"
            label="Lead Form"
            value={formData.leadForm}
            showAsterisk={false}
            onChange={handleChange}
            placeholder="Enter lead form"
          />
        </div>

        <div className="form-field">
          <CustomInputField
            state="non-editable"
            label="IP Address"
            value={formData.ipAddress}
            showAsterisk={false}
            onChange={handleChange}
            placeholder="192.168.1.1"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-8">
      <div className="mb-4">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <CustomButton
              key={tab}
              text={tab}
              variant="chips"
              rounded="full"
              startIcon={false}
              endIcon={false}
              onClick={() => setActiveTab(tab)}
              selected={activeTab === tab}
            />
    //         {
    //   !tabValidation[tab] && (
    //     <img
    //       src={WarningIcon}
    //       alt="warning"
    //       className="absolute -top-1 -right-1 w-4 h-4"
    //     />
    //   )
    // }
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {(activeTab === 'All Info' || activeTab === 'Lead Information') && renderLeadInformationForm()}
        {(activeTab === 'All Info' || activeTab === 'Education Qualification') && renderEducationQualificationForm()}
        {(activeTab === 'All Info' || activeTab === 'Lead Status') && renderLeadStatusForm()}
        {(activeTab === 'All Info' || activeTab === 'Lead Source') && renderLeadSourceForm()}
      </form>
    </div>
  );
};

export default CreateLeadPage;
