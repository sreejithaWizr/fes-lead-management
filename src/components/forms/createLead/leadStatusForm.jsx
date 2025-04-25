import React, { useEffect, useState } from 'react';
import {
  CustomButton,
  CustomInputField,
  CustomDropDown,
  CustomDatePicker
} from "react-mui-tailwind";
import {
  getStatus,
  getCategory,
  getSubCategory
} from '../../../api/services/masterAPIs/createLeadApi';
import { CloudCog } from 'lucide-react';

const LeadStatusForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  mode = "edit"
}) => {
  const isEditable = mode === "edit";

  const [statusOptions, setStatusOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, categoryRes, subCategoryRes] = await Promise.allSettled([
          getStatus(),
          getCategory(),
        ]
        );
        console.log("statusRes", statusRes?.data?.data || [])
        setStatusOptions(statusRes?.data?.data || []);
        setCategoryOptions(categoryRes?.data?.data || []);
        setSubCategoryOptions(subCategoryRes?.data?.data || []);
      } catch (err) {
        console.error('Error loading filters:', err);
      }
    };

    fetchData();
  }, []);

  const handleCategory = (value) => {
    setFieldValue('category', value.target.value);
  }

  console.log("resp", statusOptions, categoryOptions, subCategoryOptions)
  return (
    <div className="form-section animate-fade-in ml-0 mb-6">
      <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
        Lead Status
      </h2>

      <div className="form-grid">
        <div className="form-field">
          <CustomDropDown
            label="Status"
            options={statusOptions}
            disabled={!isEditable}
            required
            showAsterisk={false}
            placeHolder="Select"
            onChange={(value) => setFieldValue('leadStatus', value.target.value)}
            onBlur={() => handleBlur({ target: { name: 'leadStatus' } })}
            value={values.leadStatus}
            hasError={touched.leadStatus && Boolean(errors.leadStatus)}
            errorMessage={touched.leadStatus && errors.leadStatus}
          />
        </div>


        <div className="form-field">
          <CustomDropDown
            label="Category"
            options={categoryOptions?.data}
            required
            showAsterisk={false}
            placeHolder="Select"
            onChange={(value) => {
              handleCategory(value);
            }}
            onBlur={() => handleBlur({ target: { name: 'category' } })}
            value={values.category}
            hasError={touched.category && Boolean(errors.category)}
            errorMessage={touched.category && errors.category}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Subcategory"
            options={subCategoryOptions?.data}
            required
            showAsterisk={false}
            placeHolder="Select"
            onChange={(value) => setFieldValue('subCategory', value.target.value)}
            onBlur={() => handleBlur({ target: { name: 'subCategory' } })}
            value={values.subCategory}
            hasError={touched.subCategory && Boolean(errors.subCategory)}
            errorMessage={touched.subCategory && errors.subCategory}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Branch"
            options={["Branch 1", "Branch 2", "Branch 3"]}
            required
            showAsterisk={false}
            placeHolder="Select"
            onChange={(value) => setFieldValue('branch', value.target.value)}
            onBlur={() => handleBlur({ target: { name: 'branch' } })}
            value={values.branch}
            hasError={touched.branch && Boolean(errors.branch)}
            errorMessage={touched.branch && errors.branch}
          />
        </div>
      </div>

      <div className="form-field mt-4">
        <CustomInputField
          state="default"
          label="Notes"
          value={values.notes}
          showAsterisk={false}
          onChange={(value) => setFieldValue('notes', value.target.value)}
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
