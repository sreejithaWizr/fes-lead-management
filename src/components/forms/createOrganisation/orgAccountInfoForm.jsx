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
import TrashIcon  from '../../../assets/bulk-trash-icon.svg';
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
          <div className="flex flex-col">
            {values.add_account_info.map((entry, index) => (
              <div
              key={index}
              className="flex flex-row item-center justify-flex-start bg-[#F5F5F5] border p-4 rounded-lg"
            >
              <div style={{width:"fit-content", marginRight:"30px"}}>
                <CustomInputField
                  state={isEditable ? "default" : "non-editable"}
                  showAsterisk={false}
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
            
              <div style={{width:"fit-content", marginRight:"30px"}}>
                <CustomInputField
                  state={isEditable ? "default" : "non-editable"}
                  showAsterisk={false}
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
            
              <div style={{display:"flex", alignItems:"end"}}>
                <CustomButton
                  showText={false}
                  variant="icon"
                  iconImg={TrashIcon}
                  endIcon={false}
                  startIcon={true}
                  onClick={() => remove(index)}
                  sx={{
                    border: '1px solid red',
                    borderRadius: '12px',
                    boxShadow: 'none',
                    backgroundColor: 'transparent',
                    "&:hover": {
                      backgroundColor: "#FDE9E9",
                      border: "1px solid #F7A4A3",
                      color: "#F7A4A3",
                    },
                  }}
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
