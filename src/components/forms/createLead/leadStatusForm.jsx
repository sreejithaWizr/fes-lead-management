import React from 'react';
import { CustomButton, CustomInputField, CustomDropDown, CustomDatePicker } from "react-mui-tailwind";

const LeadStatusForm = ({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
    return (
        <div className="form-section animate-fade-in ml-0 mb-6">
            <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
                Lead Status
            </h2>
            <div className="form-grid">
                <div className="form-field">
                    <CustomDropDown
                        label="Status"
                        options={["Potential", "Inactive", "Enrolled", "May be Prospective"]}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        onChange={(value) => {
                            setFieldValue('leadStatus', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'leadStatus' } })}
                        initialValue={values.leadStatus}
                        hasError={touched.leadStatus && Boolean(errors.leadStatus)}
                        errorMessage={touched.leadStatus && errors.leadStatus}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Category"
                        options={["Potential", "Inactive", "Enrolled", "May be Prospective"]}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        onChange={(value) => {
                            setFieldValue('category', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'category' } })}
                        initialValue={values.category}
                        hasError={touched.category && Boolean(errors.category)}
                        errorMessage={touched.category && errors.category}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Subcategory"
                        options={["Subcategory 1", "Subcategory 2", "Subcategory 3"]}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        onChange={(value) => {
                            setFieldValue('subCategory', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'subCategory' } })}
                        initialValue={values.subCategory}
                        hasError={touched.subCategory && Boolean(errors.subCategory)}
                        errorMessage={touched.subCategory && errors.subCategory}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Branch"
                        options={["Branch 1", "Branch 2", "Branch 3"]}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        onChange={(value) => {
                            setFieldValue('branch', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'branch' } })}
                        initialValue={values.branch}
                        hasError={touched.branch && Boolean(errors.branch)}
                        errorMessage={touched.branch && errors.branch}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Counselor"
                        options={["Counselor 1", "Counselor 2", "Counselor 3"]}
                        required={true}
                        showAsterisk={false}
                        placeHolder="Select"
                        onChange={(value) => {
                            setFieldValue('counselor', value.target.value);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'counselor' } })}
                        initialValue={values.counselor}
                        hasError={touched.counselor && Boolean(errors.counselor)}
                        errorMessage={touched.counselor && errors.counselor}
                    />
                </div>
            </div>

            <div className="form-field mt-4">
                <CustomInputField
                    state="default"
                    label="Notes"
                    multiline={true}
                    value={values.notes}
                    showAsterisk={false}
                    onChange={(value) => {
                        setFieldValue('notes', value.target.value)
                    }}
                    onBlur={handleBlur}
                    placeholder="Type your notes here"
                    hasError={touched.notes && Boolean(errors.notes)}
                    error={touched.notes && errors.notes}
                />
            </div>
        </div>
    );
};

export default LeadStatusForm;