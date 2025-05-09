import React, { useEffect, useState } from 'react';
import {
  CustomButton,
  CustomInputField,
  CustomDropDown
} from "react-mui-tailwind";
import {
  getStatus,
  getCategory,
  getSubCategory,
  getBranch
} from '../../../api/services/masterAPIs/createLeadApi';
import { FieldArray, getIn } from 'formik';
import { X } from 'lucide-react';

const OrganisationAccountInfoForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  mode = "edit"
}) => {
  const isEditable = mode === "edit";

  console.log("formik", values, errors, touched)

  return (
    <div className="form-section animate-fade-in ml-0 mb-6">
      <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
        Ad Account Information
      </h2>

      <FieldArray name="add_account_info">
        {({ push, remove }) => (
          <div className="flex flex-col gap-6">
            {values.add_account_info.map((entry, index) => (
              <div
                key={index}
                className="relative bg-[#F5F5F5] border p-4 rounded-lg form-grid"
              >
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                  <X size={18} />
                </button>

                <div className="form-field">
                  <CustomInputField
                    state={isEditable ? "default" : "non-editable"}
                    label="Account Name"
                    value={entry.name}
                    onChange={(value) =>
                      setFieldValue(`add_account_info[${index}].name`, value?.target?.value)
                    }
                    placeholder="Enter Name"
                    onBlur={() =>
                      handleBlur({ target: { name: `add_account_info[${index}].name` } })
                    }
                    hasError={Boolean(getIn(touched, `add_account_info[${index}].name`) && getIn(errors, `add_account_info[${index}].name`))}
                    error={getIn(errors, `add_account_info[${index}].name`)}

                  />
                </div>

                <div className="form-field">
                  <CustomInputField
                    state={isEditable ? "default" : "non-editable"}
                    label="Ad Account ID"
                    value={entry.account_id}
                    onChange={(value) =>
                      setFieldValue(`add_account_info[${index}].account_id`, value?.target?.value)
                    }
                    placeholder="Enter ID"
                    onBlur={() =>
                      handleBlur({ target: { name: `add_account_info[${index}].account_id` } })
                    }
                    hasError={Boolean(getIn(touched, `add_account_info[${index}].account_id`) && getIn(errors, `add_account_info[${index}].account_id`))}
                    error={getIn(errors, `add_account_info[${index}].account_id`)}

                  />
                </div>
              </div>
            ))}
            <div className="mt-4">
              <CustomButton
                text="Add"
                endIcon={false}
                onClick={() =>
                  push({
                    name: '',
                    account_id: '',
                  })
                }
              />
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default OrganisationAccountInfoForm;
