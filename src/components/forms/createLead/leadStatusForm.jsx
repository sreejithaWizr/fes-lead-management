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
  getSubCategory,
  getBranch
} from '../../../api/services/masterAPIs/createLeadApi';
import { use } from 'react';
// import { CloudCog } from 'lucide-react';

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
  const [branchOptions, setBranchOptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, categoryRes, branchRes] = await Promise.allSettled([
          getStatus(),
          getCategory(),
          getBranch()
        ]
        );
        setStatusOptions(statusRes?.value?.data?.data || []);
        setCategoryOptions(categoryRes?.value?.data?.data || []);
        setBranchOptions(branchRes?.value?.data?.data || []);
      } catch (err) {
        console.error('Error loading filters:', err);
      }
    };

    fetchData();
  }, []);

  // fetch subcategory based on selected category
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subCategoryRes] = await Promise.allSettled([
          getSubCategory(values?.category)
        ]
        );
        setSubCategoryOptions(subCategoryRes?.value?.data?.data || []);
      } catch (err) {
        console.error('Error loading filters:', err);
      }
    };
    fetchData();
  }, [values?.category]);

  const handleCategory = (value) => {
    // console.log("valll", value?.target?.value)
    // const selectedValue = value?.target?.value || '';
    // setFieldValue('category', selectedValue);
    setFieldValue('subCategory', "")

    const fetchData = async () => {
      try {
        const [subCategoryRes] = await Promise.allSettled([
          getSubCategory(value.target.value.id)
        ]
        );
        setSubCategoryOptions(subCategoryRes?.value?.data?.data || []);
      } catch (err) {
        console.error('Error loading filters:', err);
      }
    };

    fetchData();
  }

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
            onChange={(value) => setFieldValue('leadStatus', value?.target?.value.id)}
            onBlur={() => handleBlur({ target: { name: 'leadStatus' } })}
            // value={values.leadStatus}
            value={statusOptions.find((option) => option.id === values.leadStatus) || ""}
            hasError={touched.leadStatus && Boolean(errors.leadStatus)}
            errorMessage={touched.leadStatus && errors.leadStatus}
          />
        </div>


        <div className="form-field">
          <CustomDropDown
            label="Category"
            options={categoryOptions}
            required
            showAsterisk={false}
            placeHolder="Select"
            disabled={!isEditable}
            value={categoryOptions.find((option) => option.id === values?.category) || ""}
            onChange={(value) => {
              handleCategory(value)
              setFieldValue("category", value?.target?.value.id)
            }}
            onBlur={() => handleBlur({ target: { name: 'category' } })}
            hasError={touched.category && Boolean(errors.category)}
            errorMessage={touched.category && errors.category}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Subcategory"
            options={subCategoryOptions}
            required
            disabled={!isEditable}
            showAsterisk={false}
            placeHolder="Select"
            onChange={(value) => setFieldValue('subCategory', value?.target?.value.id)}
            onBlur={() => handleBlur({ target: { name: 'subCategory' } })}
            value={subCategoryOptions.find((option) => option.id === values?.subCategory) || ""}
            hasError={touched.subCategory && Boolean(errors.subCategory)}
            errorMessage={touched.subCategory && errors.subCategory}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Branch"
            options={branchOptions}
            required
            disabled={!isEditable}
            showAsterisk={false}
            placeHolder="Select"
            onChange={(value) => setFieldValue('branch', value?.target?.value.id)}
            onBlur={() => handleBlur({ target: { name: 'branch' } })}
            // value={values.branch}
            value={branchOptions.find((option) => option.id === values?.branch) || ""}
            hasError={touched.branch && Boolean(errors.branch)}
            errorMessage={touched.branch && errors.branch}
          />
        </div>
      </div>

      <div className="form-field mt-4">
        <CustomInputField
          state={isEditable ? "default" : "non-editable"}
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
