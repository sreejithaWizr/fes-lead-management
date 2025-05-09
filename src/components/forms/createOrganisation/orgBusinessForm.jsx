import { useEffect, useState } from "react";
import { CustomInputField, CustomDropDown, CustomCheckboxField } from "react-mui-tailwind";
import { getAreaOfStudy, getCountry, getQualification, getTestName } from "../../../api/services/masterAPIs/createLeadApi";

const OrganisationBusinessForm = ({ values, errors, touched, handleChange, handleBlur, setFieldValue, mode = "edit" }) => {
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

    console

    return (
        <div className="form-section animate-fade-in ml-0 mb-6">
            <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
                Business Information
            </h2>
            <div className="form-grid">
                <div className="form-field">
                    <CustomInputField
                        state={isEditable || isCreateMode ? "default" : "non-editable"}
                        label="Street"
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
                        state={isEditable || isCreateMode ? "default" : "non-editable"}
                        label="City"
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
                    <CustomDropDown
                        label="State"
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
                    <CustomInputField
                        state={isEditable || isCreateMode ? "default" : "non-editable"}
                        label="Postal Code"
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
                    <CustomDropDown
                        label="Country"
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
                        label="GST No"
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
                    <CustomInputField
                        state={isEditable || isCreateMode ? "default" : "non-editable"}
                        label="Primary POC(Primary Point of Contact)"
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
                        state={isEditable || isCreateMode ? "default" : "non-editable"}
                        label="POC Email"
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
                        state={isEditable || isCreateMode ? "default" : "non-editable"}
                        label="POC Phone Number"
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

            </div>
        </div>
    );
};

export default OrganisationBusinessForm;