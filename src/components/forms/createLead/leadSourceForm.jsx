import React, { useEffect, useState } from 'react';
import { CustomButton, CustomInputField, CustomDropDown, CustomDatePicker } from "react-mui-tailwind";
import { getCity, getDesiredProgram, getRegion, getSource1, getVertical } from '../../../api/services/masterAPIs/createLeadApi';

const LeadSourceForm = ({ values, errors, touched, handleChange, handleBlur, setFieldValue, mode = "edit" }) => {
    const isEditable = mode === "edit";

    const [sourceOptions, setSourceOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [regionOptions, setRegionOptions] = useState([]);
    const [verticalOptions, setVerticalOptions] = useState([]);
    const [desiredProgramOptions, setDesiredProgramOptions] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sourceRes, regionRes, cityRes, verticalRes, desiredProgramRes] = await Promise.allSettled([
                    getSource1(),
                    getCity(),
                    getRegion(),
                    getVertical(),
                    getDesiredProgram()
                ]
                );
                console.log("statusRes", sourceRes?.data?.data || [])
                setSourceOptions(sourceRes?.data?.data || []);
                setCityOptions(cityRes?.data?.data || []);
                setRegionOptions(regionRes?.data?.data || []);
                setVerticalOptions(verticalRes?.data?.data || []);
                setDesiredProgramOptions(desiredProgramRes?.data?.data || []);
            } catch (err) {
                console.error('Error loading filters:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="form-section animate-fade-in ml-0 mb-6">
            <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
                Lead Source
            </h2>
            <div className="form-grid">
                <div className="form-field">
                    <CustomDropDown
                        label="Source 1"
                        options={sourceOptions}
                        required={true}
                        disabled={!isEditable}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values.leadSource_1}
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
                        options={sourceOptions}
                        required={false}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values.leadSource_2}
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
                        options={sourceOptions}
                        required={false}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values.leadSource_3}
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
                        label="Source 4"
                        options={sourceOptions}
                        required={false}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values.leadSource_4}
                        onChange={(value) => {
                            setFieldValue('leadSource_4', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'leadSource_4' } })}
                        hasError={touched.leadSource_4 && Boolean(errors.leadSource_4)}
                        errorMessage={touched.leadSource_4 && errors.leadSource_4}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Location 1"
                        options={cityOptions}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values.location_1}
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
                        options={regionOptions}
                        required={false}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values.location_2}
                        onChange={(value) => {
                            setFieldValue('location_2', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'location_2' } })}
                        hasError={touched.location_2 && Boolean(errors.location_2)}
                        errorMessage={touched.location_2 && errors.location_2}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Vertical"
                        options={verticalOptions}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values.vertical}
                        onChange={(value) => {
                            setFieldValue('vertical', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'vertical' } })}
                        hasError={touched.vertical && Boolean(errors.vertical)}
                        errorMessage={touched.vertical && errors.vertical}
                    />
                </div>

                <div className="form-field">
                    <CustomInputField
                        state="default"
                        label="Preferred Time Slot"
                        value={values?.preferredTimeSlot}
                        showAsterisk={false}
                        placeholder="Enter Preferred Time Slot"
                        onChange={(value) => {
                            setFieldValue('preferredTimeSlot', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.preferredTimeSlot && Boolean(errors.preferredTimeSlot)}
                        error={touched.preferredTimeSlot && errors.preferredTimeSlot}
                    />
                </div>

                <div className="form-field">
                    <CustomInputField
                        state="default"
                        label="GCLID"
                        value={values?.gclID}
                        showAsterisk={false}
                        placeholder="Enter GCLID"
                        onChange={(value) => {
                            setFieldValue('gclID', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.gclID && Boolean(errors.gclID)}
                        error={touched.gclID && errors.gclID}
                    />
                </div>

                <div className="form-field">
                    <CustomInputField
                        state="default"
                        label="ZC GAD"
                        value={values?.zcGad}
                        showAsterisk={false}
                        placeholder="Enter ZC GAD"
                        onChange={(value) => {
                            setFieldValue('zcGad', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.zcGad && Boolean(errors.zcGad)}
                        error={touched.zcGad && errors.zcGad}
                    />
                </div>

                <div className="form-field">
                    <CustomInputField
                        state="default"
                        label="Ad ID"
                        value={values?.adID}
                        showAsterisk={false}
                        placeholder="Enter Ad ID"
                        onChange={(value) => {
                            setFieldValue('adID', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.adID && Boolean(errors.adID)}
                        error={touched.adID && errors.adID}
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
                        label="Key Identifier"
                        value={values?.keyIdentifier}
                        showAsterisk={false}
                        placeholder="Enter Key Identifier"
                        onChange={(value) => {
                            setFieldValue('keyIdentifier', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.keyIdentifier && Boolean(errors.keyIdentifier)}
                        error={touched.keyIdentifier && errors.keyIdentifier}
                    />
                </div>

                <div className="form-field">
                    <CustomInputField
                        state="default"
                        label="Campaign Type"
                        value={values?.campaignType}
                        showAsterisk={false}
                        placeholder="Enter Campaign Type"
                        onChange={(value) => {
                            setFieldValue('campaignType', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.campaignType && Boolean(errors.campaignType)}
                        error={touched.campaignType && errors.campaignType}
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
                        label="Referrer Email"
                        value={values?.referrerEmail}
                        showAsterisk={false}
                        placeholder="Enter Referrer Email"
                        onChange={(value) => {
                            setFieldValue('referrerEmail', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.referrerEmail && Boolean(errors.referrerEmail)}
                        error={touched.referrerEmail && errors.referrerEmail}
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
                    <CustomInputField
                        state="default"
                        label="Referrer Phone Number"
                        value={values?.referrerPhoneNumber}
                        showAsterisk={false}
                        placeholder="Enter Referrer Phone Number"
                        onChange={(value) => {
                            setFieldValue('referrerPhoneNumber', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.referrerPhoneNumber && Boolean(errors.referrerPhoneNumber)}
                        error={touched.referrerPhoneNumber && errors.referrerPhoneNumber}
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

                <div className="form-field">
                    <CustomInputField
                        state="default"
                        label="User Agent"
                        value={values?.userAgent}
                        showAsterisk={false}
                        placeholder="Enter User Agent"
                        onChange={(value) => {
                            setFieldValue('userAgent', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.userAgent && Boolean(errors.userAgent)}
                        error={touched.userAgent && errors.userAgent}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Import Lead"
                        options={[{ id: "Yes", name: "Yes" }, { id: "No", name: "No" }]}
                        // required={true}
                        placeHolder="Select"
                        value={values?.importLead}
                        onChange={(value) => {
                            setFieldValue('importLead', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'importLead' } })}
                        hasError={touched.importLead && Boolean(errors.importLead)}
                        errorMessage={touched.importLead && errors.importLead}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Invoke Blueprint"
                        options={[{ id: "Yes", name: "Yes" }, { id: "No", name: "No" }]}
                        // required={true}
                        placeHolder="Select"
                        value={values?.invokeBlueprint}
                        onChange={(value) => {
                            setFieldValue('invokeBlueprint', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'invokeBlueprint' } })}
                        hasError={touched.invokeBlueprint && Boolean(errors.invokeBlueprint)}
                        errorMessage={touched.invokeBlueprint && errors.invokeBlueprint}
                    />
                </div>

                {/* <div className="form-field">
                    <CustomDropDown
                        label="Verse ID"
                        options={["Option 1", "Option 2", "Option 3"]}
                        // required={true}
                        placeHolder="Select"
                        value={values?.verseID}
                        onChange={(value) => {
                            setFieldValue('verseID', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'verseID' } })}
                        hasError={touched.verseID && Boolean(errors.verseID)}
                        errorMessage={touched.verseID && errors.verseID}
                    />
                </div> */}
                <div className="form-field">
                    <CustomInputField
                        state="default"
                        label="Verse ID"
                        value={values?.verseID}
                        showAsterisk={false}
                        placeholder="Enter Verse ID"
                        onChange={(value) => {
                            setFieldValue('verseID', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.verseID && Boolean(errors.verseID)}
                        error={touched.verseID && errors.verseID}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Desired Program"
                        options={desiredProgramOptions}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values.desiredProgram}
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
                        options={[{ id: "Yes", name: "Yes" }, { id: "No", name: "No" }]}
                        required={false}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values.internshipOption}
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
                        label="Shortlisted Course ID"
                        value={values?.shortlistedCourseID}
                        showAsterisk={false}
                        placeholder="Enter Course ID"
                        onChange={(value) => {
                            setFieldValue('shortlistedCourseID', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.shortlistedCourseID && Boolean(errors.shortlistedCourseID)}
                        error={touched.shortlistedCourseID && errors.shortlistedCourseID}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Preferred Counsellor for FESTech1 Name "
                        options={["Option 1", "Option 2", "Option 3"]}
                        // required={true}
                        placeHolder="Select"
                        value={values?.counsellorFESTech1Name}
                        onChange={(value) => {
                            setFieldValue('counsellorFESTech1Name', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'counsellorFESTech1Name' } })}
                        hasError={touched.counsellorFESTech1Name && Boolean(errors.counsellorFESTech1Name)}
                        errorMessage={touched.counsellorFESTech1Name && errors.counsellorFESTech1Name}
                    />
                </div>

                {/* <div className="form-field">
                    <CustomDropDown
                        label="Preferred Counsellor for FESTech1 Email id"
                        options={["Option 1", "Option 2", "Option 3"]}
                        // required={true}
                        placeHolder="Select"
                        value={values?.counsellorFESTech1EmailID}
                        onChange={(value) => {
                            setFieldValue('counsellorFESTech1EmailID', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'counsellorFESTech1EmailID' } })}
                        hasError={touched.counsellorFESTech1EmailID && Boolean(errors.counsellorFESTech1EmailID)}
                        errorMessage={touched.counsellorFESTech1EmailID && errors.counsellorFESTech1EmailID}
                    />
                </div> */}
                <div className="form-field">
                    <CustomInputField
                        state="disabled"
                        label="Preferred Counsellor for FESTech1 Email id"
                        value={values?.counsellorFESTech1EmailID}
                        showAsterisk={false}
                        placeholder="Enter Email id"
                        disabled={true}
                        onChange={(value) => {
                            setFieldValue('counsellorFESTech1EmailID', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.counsellorFESTech1EmailID && Boolean(errors.counsellorFESTech1EmailID)}
                        error={touched.counsellorFESTech1EmailID && errors.counsellorFESTech1EmailID}
                    />
                </div>

            </div>
        </div>
    );
};

export default LeadSourceForm;