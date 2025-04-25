import { CustomInputField, CustomDropDown } from "react-mui-tailwind";

const LeadEducationForm = ({ values, errors, touched, handleChange, handleBlur, setFieldValue, mode = "edit" }) => {
    const isEditable = mode === "edit";

    const yearOptions = [...Array.from({ length: 20 }, (_, i) => `${new Date().getFullYear() - i}`)];
    const numberOfYears = [...Array.from({ length: 21 }, (_, i) => i)];

    return (
        <div className="form-section animate-fade-in ml-0 mb-6">
            <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
                Education Qualification
            </h2>
            <div className="form-grid">
                <div className="form-field">
                    <CustomDropDown
                        label="Highest Qualification"
                        options={["Bachelor's", "Master's", "PhD"]}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values.highestQualification}
                        disabled={!isEditable}
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
                        disabled={!isEditable}
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
                        options={["Computer Science", "Engineering", "Business", "Arts"]}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={values.fieldOfStudy}
                        disabled={!isEditable}
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
                        state={isEditable ? "default" : "non-editable"}
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
                        disabled={!isEditable}
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
                        label="Preferred Study Destination"
                        options={["US", "Australia", "Canada", "London"]}
                        required={true}
                        multiple={true}
                        placeHolder="Select"
                        value={values.preferredDestination}
                        disabled={!isEditable}
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
                        state={isEditable ? "default" : "non-editable"}
                        label="Other Countries"
                        showAsterisk={false}
                        placeHolder="Enter Country Name"
                        values={values.otherCountries}
                        onChange={(value) => {
                            setFieldValue('otherCountries', value.target.value)
                        }}
                        onBlur={handleBlur}
                        hasError={touched.otherCountries && Boolean(errors.otherCountries)}
                        errorMessage={touched.otherCountries && errors.otherCountries}
                    />
                </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
                <input
                    type="checkbox"
                    id="testTrainingBoolean"
                    name="testTrainingBoolean"
                    checked={values.testTrainingBoolean}
                    onChange={handleChange}
                    className="w-4 h-4 gap-[10px] rounded border"
                />
                <label htmlFor="testTrainingBoolean" className="text-base font-normal leading-[140%] text-[#17222B] font-[Proxima Nova]">
                    Test Training Required
                </label>
            </div>

            <div className="form-field mt-4">
                <CustomInputField
                    state={isEditable ? "default" : "non-editable"}
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
            </div>
        </div>
    );
};

export default LeadEducationForm;