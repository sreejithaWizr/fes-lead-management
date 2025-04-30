import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomInputField, CustomDropDown, CustomButton } from 'react-mui-tailwind';
import TickIcon from "../../../../assets/tick.svg"
import { optionalDropdown, requiredDropdown, requiredStringField } from '../../../../utils/validationUtils';
import { getOpportunityDataByID } from '../../../../api/services/opportunityAPI/opportunityAPI';
import { getCategory, getCountry, getFESUser, getStatus, getSubCategory } from '../../../../api/services/masterAPIs/createLeadApi';

const labelStyle = {
    fontSize: '11px',
    fontWeight: 700,
    color: '#858585',
};

const validationSchema = Yup.object().shape({
    countryName: requiredStringField(),
    // opportunityIDFormat: requiredStringField(),
    counsellor1: requiredDropdown(),
    counsellor2: optionalDropdown(),
    intake: requiredDropdown(),
    opportunityStatus: requiredDropdown(),
    opportunityCategory: requiredDropdown(),
    opportunitySubCatergory: requiredDropdown(),
});

const EditOpportunityRow = ({ key, data, onCancel, onUpdate }) => {

    const [editData, setEditData] = useState();

    const [userOptions, setUserOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [userRes, statusRes, categoryRes, countryRes] = await Promise.allSettled([
                    getFESUser(),
                    getStatus(),
                    getCategory(),
                    getCountry(),
                ]);

                setUserOptions(userRes?.value?.data?.data || []);
                setStatusOptions(statusRes?.value?.data?.data || []);
                setCategoryOptions(categoryRes?.value?.data?.data || []);
                setCountryOptions(countryRes?.value?.data?.data || []);
            } catch (err) {
                console.error('Error loading dropdown data:', err);
            }
        };

        fetchDropdownData();
    }, []);

    useEffect(() => {
        getOpportunityDataByID(data?.id)
            .then((result) => {
                setEditData(result?.data)
            })
            .catch((error) => console.log(error))
    }, [])

    const initialValues = {
        countryName: data?.country_name || '',
        countryID : editData?.preffered_study_destination || '',
        opportunityID: data?.id || '',
        opportunityIDFormat: editData?.opportunityId || '',
        counsellor1: editData?.opportunity_owner || '',
        counsellor2: editData?.product_manager_id || '',
        intake: editData?.preffered_intake || '',
        opportunityStatus: editData?.opportunity_status || '',
        opportunityCategory: editData?.opportunity_category || '',
        opportunitySubCatergory: editData?.opportunity_subcategory || '',
        notes: editData?.note || '',
        lead_id: editData?.lead_id || null
    };

    useEffect(() => {
        if (editData?.opportunity_category) {
            const categoryId = editData.opportunity_category;
            getSubCategory(categoryId)
                .then((res) => {
                    setSubCategoryOptions(res?.data?.data || []);
                    if (editData.opportunity_subcategory) {
                        formik.setFieldValue('opportunitySubCatergory', editData.opportunity_subcategory);
                    }
                })
                .catch((err) => {
                    console.error('Failed to fetch subcategories on initial load:', err);
                    setSubCategoryOptions([]);
                });
        }
    }, [editData?.opportunity_category]);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values) => {
            onUpdate(values);
        },
        enableReinitialize: true
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
                    value={formik.values.countryName}
                    state="disabled"
                    disabled={true}
                    hasLabel={false}
                    onChange={(e) => formik.setFieldValue('countryName', countryOptions?.find((o)=> o?.formik.values.countryName === o.id ) )}
                    onBlur={formik.handleBlur}
                    error={formik.touched.countryName && formik.errors.countryName}
                    hasError={formik.touched.countryName && Boolean(formik.errors.countryName)}
                />
            </div>

            <div style={{ width: '100%' }}>
                <label style={labelStyle}>Opportunity ID</label>
                <CustomInputField
                    name="opportunityIDFormat"
                    value={formik.values.opportunityIDFormat}
                    state="disabled"
                    hasLabel={false}
                    onChange={(e) => formik.setFieldValue('opportunityIDFormat', e.target.value)}
                    onBlur={formik.handleBlur}
                    error={formik.touched.opportunityIDFormat && formik.errors.opportunityIDFormat}
                    hasError={formik.touched.opportunityIDFormat && Boolean(formik.errors.opportunityIDFormat)}
                />
            </div>

            <div style={{ width: '100%' }}>
                <label style={labelStyle}>Counsellor 1</label>
                <CustomDropDown
                    name="counsellor1"
                    options={userOptions}
                    value={userOptions?.find((option) => option.id === formik.values.counsellor1) || ""}
                    required={true}
                    hasLabel={false}
                    onChange={(e) => formik.setFieldValue('counsellor1', e.target.value?.id)}
                    onBlur={formik.handleBlur}
                    hasError={formik.touched.counsellor1 && Boolean(formik.errors.counsellor1)}
                    error={formik.touched.counsellor1 && formik.errors.counsellor1}
                />
            </div>

            <div style={{ width: '100%' }}>
                <label style={labelStyle}>Counsellor 2</label>
                <CustomDropDown
                    name="counsellor2"
                    options={userOptions}
                    value={userOptions?.find((option) => option.id === formik.values.counsellor2) || ""}
                    required={true}
                    hasLabel={false}
                    onChange={(e) => formik.setFieldValue('counsellor2', e.target.value?.id)}
                    onBlur={formik.handleBlur}
                    hasError={formik.touched.counsellor2 && Boolean(formik.errors.counsellor2)}
                    error={formik.touched.counsellor2 && formik.errors.counsellor2}
                />
            </div>

            <div style={{ width: '100%' }}>
                <label style={labelStyle}>Preferred Intake</label>
                <CustomInputField
                    name="intake"
                    state="disabled"
                    value={formik.values.intake}
                    disabled={true}
                    hasLabel={false}
                    onChange={(e) => formik.setFieldValue('intake', e.target.value)}
                    onBlur={formik.handleBlur}
                    error={formik.touched.intake && formik.errors.intake}
                    hasError={formik.touched.intake && Boolean(formik.errors.intake)}
                />
            </div>

            <div style={{ width: '100%' }}>
                <label style={labelStyle}>Opportunity Status</label>
                <CustomDropDown
                    name="opportunityStatus"
                    options={statusOptions}
                    value={statusOptions?.find((option) => option?.id === formik.values.opportunityStatus) || ''}
                    onChange={(e) => formik.setFieldValue('opportunityStatus', e?.target?.value?.id)}
                    errorMessage={formik.touched.opportunityStatus && formik.errors.opportunityStatus}
                    hasError={formik.touched.opportunityStatus && Boolean(formik.errors.opportunityStatus)}
                />
            </div>

            <div style={{ width: '100%' }}>
                <label style={labelStyle}>Opportunity Category</label>
                <CustomDropDown
                    name="opportunityCategory"
                    options={categoryOptions}
                    value={categoryOptions?.find((option) => option.id === formik.values.opportunityCategory) || ''}
                    // onChange={(e) => {
                    //     formik.setFieldValue('opportunityCategory', e?.target?.value?.id)
                    //     handleCategory(e)
                    // }}
                    onChange={async (e) => {
                        const selectedCategoryId = e?.target?.value?.id;
                
                        formik.setFieldValue('opportunityCategory', selectedCategoryId);
                        formik.setFieldValue('opportunitySubCatergory', '');
                
                        try {
                            const res = await getSubCategory(selectedCategoryId);
                            setSubCategoryOptions(res?.data?.data || []);
                        } catch (err) {
                            console.error('Error fetching subcategories on category change:', err);
                            setSubCategoryOptions([]);
                        }
                    }}
                
                    errorMessage={formik.touched.opportunityCategory && formik.errors.opportunityCategory}
                    hasError={formik.touched.opportunityCategory && Boolean(formik.errors.opportunityCategory)}
                />
            </div>

            <div style={{ width: '100%' }}>
                <label style={labelStyle}>Opportunity Sub Category</label>
                <CustomDropDown
                    name="opportunitySubCatergory"
                    options={subCategoryOptions}
                    // value={formik.values.opportunitySubCatergory}
                    value={
                        subCategoryOptions?.find(
                            (option) => option.id === formik.values.opportunitySubCatergory
                        ) || ''
                    }
                    onChange={(e) => formik.setFieldValue('opportunitySubCatergory', e?.target?.value?.id)}
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
        </form>

    );
};

export default EditOpportunityRow;
