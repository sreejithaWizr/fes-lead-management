import { useEffect, useState } from "react";
import { CustomInputField, CustomDropDown } from "react-mui-tailwind";
import { getAreaOfStudy, getCountry, getQualification, getTestName } from "../../../api/services/masterAPIs/createLeadApi";

const LeadEducationForm = ({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {

    const yearOptions = [...Array.from({ length: 26 }, (_, i) => `${new Date().getFullYear() - i}`)];
    const numberOfYears = [...Array.from({ length: 26 }, (_, i) => i)];
    const monthOptions = [{id: "Q1", name: "Q1"}, {id: "Q2", name: "Q2"}, {id: "Q3", name: "Q3"}, {id: "Q4", name: "Q4"}]

    const [areaOfStudyOptions, setAreaOfStudyOptions] = useState([]);
    const [qualificationOptions, setqualificationOptions] = useState([]);
    const [preferredCountryOptions, setPreferredCountryOptions] = useState([]);
    const [testNameOptions, setTestNameOptions] = useState([]);

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [areaOfStudy, qualification, preferredCountry, testName] = await Promise.allSettled([
                    getAreaOfStudy(),
                    getQualification(),
                    getCountry(),
                    getTestName(),
                ]);

                if (areaOfStudy?.status === 'fulfilled') {
                    setAreaOfStudyOptions(areaOfStudy?.value?.data?.data || []);
                }

                if (qualification?.status === 'fulfilled') {
                    setqualificationOptions(qualification?.value?.data?.data || []);
                }

                if (preferredCountry?.status === 'fulfilled') {
                    setPreferredCountryOptions(preferredCountry?.value?.data?.data || []);
                }

                if (testName?.status === 'fulfilled') {
                    setTestNameOptions(testName?.value?.data?.data || []);
                }

            } catch (error) {
                console.error('Error loading dropdown data:', error);
            }
        };

        fetchDropdownData();
    }, []);

    return (
        <div className="form-section animate-fade-in ml-0 mb-6">
            <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
                Education Qualification
            </h2>
            <div className="form-grid">
                <div className="form-field">
                    <CustomDropDown
                        label="Highest Qualification"
                        options={qualificationOptions}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values.highestQualification}
                        onChange={(value) => {
                            setFieldValue('highestQualification', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'highestQualification' } })}
                        hasError={touched.highestQualification && Boolean(errors.highestQualification)}
                        errorMessage={touched.highestQualification && errors.highestQualification}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Graduation Year"
                        options={yearOptions}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values.graduationYear}
                        onChange={(value) => {
                            setFieldValue('graduationYear', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'graduationYear' } })}
                        hasError={touched.graduationYear && Boolean(errors.graduationYear)}
                        errorMessage={touched.graduationYear && errors.graduationYear}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Field of Study"
                        options={areaOfStudyOptions}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values.fieldOfStudy}
                        onChange={(value) => {
                            setFieldValue('fieldOfStudy', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'fieldOfStudy' } })}
                        hasError={touched.fieldOfStudy && Boolean(errors.fieldOfStudy)}
                        errorMessage={touched.fieldOfStudy && errors.fieldOfStudy}
                    />
                </div>

                <div className="form-field">
                    <CustomInputField
                        state="default"
                        label="CGPA/Grade"
                        value={values.cgpaGrade}
                        showAsterisk={false}
                        placeholder="Enter CGPA/Grade"
                        onChange={(value) => {
                            setFieldValue('cgpaGrade', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.cgpaGrade && Boolean(errors.cgpaGrade)}
                        error={touched.cgpaGrade && errors.cgpaGrade}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Work Experience (Years)"
                        options={numberOfYears}
                        required={false}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values.workExperience}
                        onChange={(value) => {
                            setFieldValue('workExperience', value.target.value)
                        }}
                        onBlur={() => handleBlur({ target: { name: 'workExperience' } })}
                        hasError={touched.workExperience && Boolean(errors.workExperience)}
                        errorMessage={touched.workExperience && errors.workExperience}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Intake Year"
                        options={yearOptions}
                        required={true}
                        showAsterisk={true}
                        placeHolder="Select"
                        value={values.intake_year}
                        onChange={(value) => {
                            setFieldValue('intake_year', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'intake_year' } })}
                        hasError={touched.intake_year && Boolean(errors.intake_year)}
                        errorMessage={touched.intake_year && errors.intake_year}
                    />
                </div>
   
                <div className="form-field">
                    <CustomDropDown
                        label="Intake Month"
                        options={monthOptions}
                        // required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values?.intake_month}
                        onChange={(value) => {
                            setFieldValue('intake_month', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'intake_month' } })}
                        hasError={touched.intake_month && Boolean(errors.intake_month)}
                        errorMessage={touched.intake_month && errors.intake_month}
                    />
                </div>
                
                <div className="form-field">
                    <CustomDropDown
                        label="Preferred Study Destination"
                        options={preferredCountryOptions}
                        required={true}
                        multiple={true}
                        placeHolder="Select"
                        value={values.preferredDestination}
                        onChange={(value) => {
                            setFieldValue('preferredDestination', value.target.value)
                        }}
                        onBlur={() => handleBlur({ target: { name: 'preferredDestination' } })}
                        hasError={touched.preferredDestination && Boolean(errors.preferredDestination)}
                        errorMessage={touched.preferredDestination && errors.preferredDestination}
                    />
                </div>

                <div className="form-field">
                    <CustomInputField
                        state="default"
                        label="Other Countries"
                        showAsterisk={false}
                        placeHolder="Enter Country Name"
                        value={values?.otherCountries}
                        onChange={(value) => {
                            setFieldValue('otherCountries', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.otherCountries && Boolean(errors.otherCountries)}
                        errorMessage={touched.otherCountries && errors.otherCountries}
                    />
                </div>
            </div>

            <div className="mt-5 mb-5 flex items-center gap-2">
                <input
                    type="checkbox"
                    id="testTrainingBoolean"
                    name="testTrainingBoolean"
                    checked={values?.testTrainingBoolean}
                    onChange={handleChange}
                    className="w-4 h-4 gap-[10px] rounded border"
                />
                <label htmlFor="testTrainingBoolean" className="text-base font-normal leading-[140%] text-[#17222B] font-[Proxima Nova]">
                    Test Training Required
                </label>
            </div>

            {/* <div className="form-field mt-4">
                <CustomInputField
                    state="default"
                    label="Test Name"
                    value={values.testName}
                    showAsterisk={false}
                    placeholder="Enter test name"
                    onChange={(value) => {
                        setFieldValue('testName', value.target.value)
                    }}
                    onBlur={handleBlur}
                    hasError={touched.testName && Boolean(errors.testName)}
                    error={touched.testName && errors.testName}
                />
            </div> */}

            <div className="form-field">
                <CustomDropDown
                    label="Test Name"
                    options={testNameOptions}
                    required={false}
                    multiple={true}
                    placeHolder="Select"
                    value={values?.testName}
                    onChange={(value) => {
                        setFieldValue('testName', value.target.value)
                    }}
                    onBlur={() => handleBlur({ target: { name: 'testName' } })}
                    hasError={touched.testName && Boolean(errors.testName)}
                    errorMessage={touched.testName && errors.testName}
                />
            </div>
        </div>
    );
};

export default LeadEducationForm;