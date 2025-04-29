import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomInputField, CustomDropDown, CustomButton } from 'react-mui-tailwind';
import TickIcon from "../../../../assets/tick.svg"
import { optionalDropdown, requiredDropdown, requiredStringField } from '../../../../utils/validationUtils';

const labelStyle = {
    fontSize: '11px',
    fontWeight: 700,
    color: '#858585',
};

const validationSchema = Yup.object().shape({
    countryName: requiredStringField(),
    opportunityID: requiredStringField(),
    counsellor1: requiredDropdown(),
    counsellor2: optionalDropdown(),
    intake: requiredDropdown(),
    opportunityStatus: requiredDropdown(),
    opportunityCategory: requiredDropdown(),
    opportunitySubCatergory: requiredDropdown(),
});

const EditOpportunityRow = ({ key ,data, onCancel, onUpdate }) => {

    console.log("data", data)

    const initialValues = {
        countryName: data?.country_name || '',
        opportunityID:  data?.id  || '',
        counsellor1:  data?.owner_name  || '',
        counsellor2: {name: data?.owner_name2 } || '',
        intake: {name: data?.intake} || '',
        opportunityStatus: data?.opportunityStatus || '',
        opportunityCategory: data?.opportunityCategory || '',
        opportunitySubCatergory: data?.opportunitySubCatergory || '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values) => {
            onUpdate(values);
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4 p-5 border border-[#CBDBE4] rounded-[12px] bg-white animate-fade-in"
        >
            <div style={{ width: '100%' }}>
                <label style={labelStyle}>Country</label>
                <CustomInputField
                    name="countryName"
                    // options={['Canada', 'England']}
                    value={formik.values.countryName}
                     state="disabled"
                    disabled={true}
                    hasLabel={false}
                    onChange={(e) => formik.setFieldValue('countryName', e.target.value)}
                    onBlur={formik.handleBlur}
                    error={formik.touched.countryName && formik.errors.countryName}
                    hasError={formik.touched.countryName && Boolean(formik.errors.countryName)}
                />
            </div>

            <div style={{ width: '100%' }}>
                <label style={labelStyle}>Opportunity ID</label>
                <CustomInputField
                    name="opportunityID"
                    value={formik.values.opportunityID}
                    state="disabled"
                    hasLabel={false}
                    onChange={(e) => formik.setFieldValue('opportunityID', e.target.value)}
                    onBlur={formik.handleBlur}
                    error={formik.touched.opportunityID && formik.errors.opportunityID}
                    hasError={formik.touched.opportunityID && Boolean(formik.errors.opportunityID)}
                />
            </div>

            <div style={{ width: '100%' }}>
                <label style={labelStyle}>Counsellor 1</label>
                <CustomDropDown
                    name="counsellor1"
                    options={[]}
                    value={formik.values.counsellor1}
                    required={true}
                    hasLabel={false}
                    onChange={(e) => formik.setFieldValue('counsellor1', e.target.value)}
                    onBlur={formik.handleBlur}
                    hasError={formik.touched.counsellor1 && Boolean(formik.errors.counsellor1)}
                    error={formik.touched.counsellor1 && formik.errors.counsellor1}
                />
            </div>

            <div style={{ width: '100%' }}>
                <label style={labelStyle}>Counsellor 2</label>
                <CustomInputField
                    name="counsellor2"
                    value={formik.values.counsellor2}
                    state="disabled"
                    hasLabel={false}
                    onChange={(e) => formik.setFieldValue('counsellor2', e.target.value)}
                    onBlur={formik.handleBlur}
                    hasError={formik.touched.counsellor2 && Boolean(formik.errors.counsellor2)}
                    error={formik.touched.counsellor2 && formik.errors.counsellor2}
                />
            </div>

            <div style={{ width: '100%' }}>
                <label style={labelStyle}>Preferred Intake</label>
                <CustomDropDown
                    name="intake"
                    options={['2024', '2025']}
                    value={formik.values.intake}
                    disabled={true}
                    hasLabel={false}
                    onChange={(e) => formik.setFieldValue('intake', e.target.value)}
                    onBlur={formik.handleBlur}
                    errorMessage={formik.touched.intake && formik.errors.intake}
                    hasError={formik.touched.intake && Boolean(formik.errors.intake)}
                />
            </div>

            <div style={{ width: '100%' }}>
                <label style={labelStyle}>Opportunity Status</label>
                <CustomDropDown
                    name="opportunityStatus"
                    options={['Ready for Counsellor', 'Inprogress']}
                    value={formik.values.opportunityStatus}
                    onChange={(e) => formik.setFieldValue('opportunityStatus', e.target.value)}
                    errorMessage={formik.touched.opportunityStatus && formik.errors.opportunityStatus}
                    hasError={formik.touched.opportunityStatus && Boolean(formik.errors.opportunityStatus)}
                />
            </div>

            <div style={{ width: '100%' }}>
                <label style={labelStyle}>Opportunity Category</label>
                <CustomDropDown
                    name="opportunityCategory"
                    options={['Interested', 'Not Interested']}
                    value={formik.values.opportunityCategory}
                    onChange={(e) => formik.setFieldValue('opportunityCategory', e.target.value)}
                    errorMessage={formik.touched.opportunityCategory && formik.errors.opportunityCategory}
                    hasError={formik.touched.opportunityCategory && Boolean(formik.errors.opportunityCategory)}
                />
            </div>

            <div style={{ width: '100%' }}>
                <label style={labelStyle}>Opportunity Sub Category</label>
                <CustomDropDown
                    name="opportunitySubCatergory"
                    options={['Contacted', 'Not Contacted']}
                    value={formik.values.opportunitySubCatergory}
                    onChange={(e) => formik.setFieldValue('opportunitySubCatergory', e.target.value)}
                    errorMessage={formik.touched.opportunitySubCatergory && formik.errors.opportunitySubCatergory}
                    hasError={formik.touched.opportunitySubCatergory && Boolean(formik.errors.opportunitySubCatergory)}
                />
            </div>

            <div
              className="col-span-full flex gap-3 justify-end items-end"
            >
                <CustomButton
                    type="button"
                    variant="secondary"
                    startIcon={false}
                    endIcon={false}
                    text="Cancel"
                    onClick={onCancel}
                />
                <CustomButton
                    onClick={formik.handleSubmit}
                    type="button"
                    variant="primary"
                    text="Update"
                    startIcon={true}
                    iconImg={TickIcon}
                    endIcon={false}
                />
            </div>
            {/* <pre>{JSON.stringify(formik?.values)}</pre> */}
        </form>

    );
};

export default EditOpportunityRow;
