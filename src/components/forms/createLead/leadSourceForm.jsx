import React from 'react';
import { CustomButton, CustomInputField, CustomDropDown, CustomDatePicker } from "react-mui-tailwind";

const LeadSourceForm = ({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
    return (
        <div className="form-section animate-fade-in ml-0 mb-6">
            <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
                Lead Source
            </h2>
            <div className="form-grid">
                <div className="form-field">
                    <CustomDropDown
                        label="Source 1"
                        options={["Meta", "Google Ads", "Referral", "Website"]}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        initialValue={values.leadSource_1}
                        onChange={(value) => {
                            setFieldValue('leadSource_1', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'leadSource_1' } })}
                        hasError={touched.leadSource_1 && Boolean(errors.leadSource_1)}
                        errorMessage={touched.leadSource_1 && errors.leadSource_1}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Source 2"
                        options={["Meta", "Google Ads", "Referral", "Website"]}
                        required={false}
                        showAsterisk={false}
                        placeHolder="Select"
                        initialValue={values.leadSource_2}
                        onChange={(value) => {
                            setFieldValue('leadSource_2', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'leadSource_2' } })}
                        hasError={touched.leadSource_2 && Boolean(errors.leadSource_2)}
                        errorMessage={touched.leadSource_2 && errors.leadSource_2}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Source 3"
                        options={["Meta", "Google Ads", "Referral", "Website"]}
                        required={false}
                        showAsterisk={false}
                        placeHolder="Select"
                        initialValue={values.leadSource_3}
                        onChange={(value) => {
                            setFieldValue('leadSource_3', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'leadSource_3' } })}
                        hasError={touched.leadSource_3 && Boolean(errors.leadSource_3)}
                        errorMessage={touched.leadSource_3 && errors.leadSource_3}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Location 1"
                        options={["Location 1", "Location 2", "Location 3"]}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        initialValue={values.location_1}
                        onChange={(value) => {
                            setFieldValue('location_1', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'location_1' } })}
                        hasError={touched.location_1 && Boolean(errors.location_1)}
                        errorMessage={touched.location_1 && errors.location_1}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Location 2"
                        options={["Location 1", "Location 2", "Location 3"]}
                        required={false}
                        showAsterisk={false}
                        placeHolder="Select"
                        initialValue={values.location_2}
                        onChange={(value) => {
                            setFieldValue('location_2', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'location_2' } })}
                        hasError={touched.location_2 && Boolean(errors.location_2)}
                        errorMessage={touched.location_2 && errors.location_2}
                    />
                </div>

                <div className="form-field">
                    <CustomInputField
                        state="default"
                        label="Referrer Name"
                        value={values.referrerName}
                        showAsterisk={false}
                        placeholder="Enter referrer name"
                        onChange={(value) => {
                            setFieldValue('referrerName', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.referrerName && Boolean(errors.referrerName)}
                        error={touched.referrerName && errors.referrerName}
                    />
                </div>

                <div className="form-field">
                    <CustomInputField
                        state="default"
                        label="Referrer Employee ID"
                        value={values.referrerEmployeeId}
                        showAsterisk={false}
                        placeholder="Enter referrer employee ID"
                        onChange={(value) => {
                            setFieldValue('referrerEmployeeId', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.referrerEmployeeId && Boolean(errors.referrerEmployeeId)}
                        error={touched.referrerEmployeeId && errors.referrerEmployeeId}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Vertical"
                        options={["Vertical 1", "Vertical 2", "Vertical 3"]}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        initialValue={values.vertical}
                        onChange={(value) => {
                            setFieldValue('vertical', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'vertical' } })}
                        hasError={touched.vertical && Boolean(errors.vertical)}
                        errorMessage={touched.vertical && errors.vertical}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Desired Program"
                        options={["Desired Program 1", "Desired Program 2", "Desired Program 3"]}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        initialValue={values.desiredProgram}
                        onChange={(value) => {
                            setFieldValue('desiredProgram', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'desiredProgram' } })}
                        hasError={touched.desiredProgram && Boolean(errors.desiredProgram)}
                        errorMessage={touched.desiredProgram && errors.desiredProgram}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Internship Option"
                        options={["Option 1", "Option 2", "Option 3"]}
                        required={false}
                        showAsterisk={false}
                        placeHolder="Select"
                        initialValue={values.internshipOption}
                        onChange={(value) => {
                            setFieldValue('internshipOption', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'internshipOption' } })}
                        hasError={touched.internshipOption && Boolean(errors.internshipOption)}
                        errorMessage={touched.internshipOption && errors.internshipOption}
                    />
                </div>

                <div className="form-field">
                    <CustomInputField
                        state="default"
                        label="Ad Name"
                        value={values.adName}
                        showAsterisk={false}
                        placeholder="Enter Ad name"
                        onChange={(value) => {
                            setFieldValue('adName', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.adName && Boolean(errors.adName)}
                        error={touched.adName && errors.adName}
                    />
                </div>

                <div className="form-field">
                    <CustomInputField
                        state="default"
                        label="Ad Campaign"
                        value={values.adCampaign}
                        showAsterisk={false}
                        placeholder="Enter ad campaign"
                        onChange={(value) => {
                            setFieldValue('adCampaign', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.adCampaign && Boolean(errors.adCampaign)}
                        error={touched.adCampaign && errors.adCampaign}
                    />
                </div>

                <div className="form-field">
                    <CustomInputField
                        state="default"
                        label="Lead Form"
                        value={values.leadForm}
                        showAsterisk={false}
                        placeholder="Enter lead form"
                        onChange={(value) => {
                            setFieldValue('leadForm', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.leadForm && Boolean(errors.leadForm)}
                        error={touched.leadForm && errors.leadForm}
                    />
                </div>

                <div className="form-field">
                    <CustomInputField
                        state="non-editable"
                        label="IP Address"
                        value={values.ipAddress}
                        showAsterisk={false}
                        placeholder="192.168.1.1"
                        onChange={(value) => {
                            setFieldValue('ipAddress', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.ipAddress && Boolean(errors.ipAddress)}
                        error={touched.ipAddress && errors.ipAddress}
                    />
                </div>
            </div>
        </div>
    );
};

export default LeadSourceForm;