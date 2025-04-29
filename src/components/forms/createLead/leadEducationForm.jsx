import { useEffect, useState } from "react";
import { CustomInputField, CustomDropDown, CustomCheckboxField } from "react-mui-tailwind";
import { getAreaOfStudy, getCountry, getQualification, getTestName } from "../../../api/services/masterAPIs/createLeadApi";

const LeadEducationForm = ({ values, errors, touched, handleChange, handleBlur, setFieldValue, mode = "edit" }) => {
    const isEditable = mode === "edit";

    const yearOptions = [...Array.from({ length: 26 }, (_, i) => `${new Date().getFullYear() - i}`)];
    const numberOfYears = [...Array.from({ length: 26 }, (_, i) => i)];
    const monthOptions = [{ id: "Q1", name: "Q1" }, { id: "Q2", name: "Q2" }, { id: "Q3", name: "Q3" }, { id: "Q4", name: "Q4" }]

    const [areaOfStudyOptions, setAreaOfStudyOptions] = useState([]);
    const [qualificationOptions, setqualificationOptions] = useState([]);
    const [preferredCountryOptions, setPreferredCountryOptions] = useState([]);
    const [testNameOptions, setTestNameOptions] = useState([]);
    const [defaultMultiValue, setDefaultMultiValue] = useState([]);
    const [defaultMultiValueForTestName, setDefaultMultiValueForTestName] = useState([]);

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

    const handleTestTrainingRequiredOnChange = (event) => {
        const { checked } = event.target;
        setFieldValue('testTrainingBoolean', checked);
    }

    // useEffect(() => {
    //     if (values?.preferredDestination) {
    //         const selectedOptions = preferredCountryOptions?.filter(option => values?.preferredDestination?.includes(option?.id));
    //         setDefaultMultiValue(selectedOptions);
    //     }
    // }, [values?.preferredDestination]);

    // useEffect(() => {
    //     if (!isEditable && values?.preferredDestination) {
    //         const selectedOptions = preferredCountryOptions?.filter(option =>
    //             values?.preferredDestination?.includes(option?.id)
    //         );
    //         setDefaultMultiValue(selectedOptions);
    //     }
    // }, [isEditable, values?.preferredDestination, preferredCountryOptions]);

    useEffect(() => {
        if (values?.preferredDestination?.length > 0) {
            const selectedOptions = preferredCountryOptions?.filter(option =>
                values?.preferredDestination.includes(option?.id)
            );
            setDefaultMultiValue(selectedOptions);
        }
    }, [values?.preferredDestination, preferredCountryOptions]);

    useEffect(() => {
        if (values?.testName?.length > 0) {
            const selectedOptions = testNameOptions?.filter(option =>
                values?.testName.includes(option?.id)
            );
            setDefaultMultiValueForTestName(selectedOptions);
        }
    }, [values?.testName, testNameOptions]);


    // console.log(
    //     "valu",
    //     values.preferredDestination,
    //     defaultMultiValue,
    //     preferredCountryOptions?.filter(option => values?.preferredDestination?.includes(option?.id))
    // );


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
                        value={qualificationOptions?.find(option => option?.id === values?.highestQualification) || ""}
                        disabled={!isEditable}
                        onChange={(value) => {
                            setFieldValue('highestQualification', value.target.value?.id);
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
                        value={values?.graduationYear}
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
                        options={areaOfStudyOptions}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        value={areaOfStudyOptions?.find(option => option?.id === values?.fieldOfStudy) || ""}
                        disabled={!isEditable}
                        onChange={(value) => {
                            setFieldValue('fieldOfStudy', value.target.value?.id);
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
                        value={values?.workExperience}
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
                        label="Intake Year"
                        options={yearOptions}
                        required={true}
                        showAsterisk={true}
                        disabled={!isEditable}
                        placeHolder="Select"
                        value={values?.intakeYear}
                        onChange={(value) => {
                            setFieldValue('intakeYear', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'intakeYear' } })}
                        hasError={touched.intakeYear && Boolean(errors.intakeYear)}
                        errorMessage={touched.intakeYear && errors.intakeYear}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Intake Month"
                        options={monthOptions}
                        // required={true}
                        showAsterisk={false}
                        disabled={!isEditable}
                        placeHolder="Select"
                        // value={values?.intakeMonth}
                        value={monthOptions?.find(option => option?.id === values?.intakeMonth?.name)}
                        onChange={(value) => {
                            setFieldValue('intakeMonth', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'intakeMonth' } })}
                        hasError={touched.intakeMonth && Boolean(errors.intakeMonth)}
                        errorMessage={touched.intakeMonth && errors.intakeMonth}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Preferred Study Destination"
                        options={preferredCountryOptions}
                        required={true}
                        multiple={true}
                        placeHolder="Select"
                        // value={defaultMultiValue}
                        // value={preferredCountryOptions?.find(option => option?.id === values?.preferredDestination) || ""}
                        value={isEditable ? defaultMultiValue : preferredCountryOptions?.filter(option => values?.preferredDestination?.includes(option?.id)) || []}
                        disabled={!isEditable}
                        onChange={(value) => {
                            setDefaultMultiValue(value.target.value); // Update dropdown visible values
                            // setFieldValue('preferredDestination', value.target.value)
                            setFieldValue('preferredDestination', value?.target?.value.map(v => v.id)); // Save only IDs to form
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
                <CustomCheckboxField name="testTrainingBoolean" label="Test Training Required" disabled={!isEditable} onChange={handleTestTrainingRequiredOnChange} checked={values?.testTrainingBoolean ? true : false} />
                {/* <span className='text-red-600'>*</span> */}
            </div>

            {/* <div className="form-field mt-4">
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
            </div> */}

            <div className="form-field">
                <CustomDropDown
                    label="Test Name"
                    options={testNameOptions}
                    required={false}
                    multiple={true}
                    placeHolder="Select"
                    // value={[
                    //     {
                    //         "id": 1,
                    //         "name": "IELTS"
                    //     },
                    //     {
                    //         "id": 2,
                    //         "name": "OET"
                    //     }
                    // ]}
                    // value={testNameOptions?.filter(option => values?.testName?.includes(option.id)) || []}
                    value={isEditable ? defaultMultiValueForTestName : testNameOptions?.filter(option => values?.testName?.includes(option?.id)) || []}
                    disabled={!isEditable}
                    // onChange={(value) => {
                    //     setFieldValue('testName', value.target.value)
                    // }}
                    onChange={(value) => {
                        setDefaultMultiValueForTestName(value.target.value); // Update dropdown visible values
                        // setFieldValue('preferredDestination', value.target.value)
                        setFieldValue('testName', value?.target?.value.map(v => v.id)); // Save only IDs to form
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