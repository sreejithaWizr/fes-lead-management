// Basic reusable validation functions
export const isEmpty = (value) => {
  return (
    value === undefined || value === null || value.toString().trim() === ""
  );
};

export const isEmailValid = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

export const isPhoneNumberValid = (number) => {
  const regex = /^\d{10}$/;
  return regex.test(number);
};

// Validation for multiple required fields
export const validateRequiredFields = (formData, fields) => {
  const errors = {};
  fields.forEach((field) => {
    if (isEmpty(formData[field])) {
      errors[field] = "This field is required.";
    }
  });
  return errors;
};

// Global tab-level validation (useful for page section validation)
export const validateForm = (formData, validationsMap) => {
  const result = {};
  for (const tab in validationsMap) {
    const fields = validationsMap[tab];
    const isValid = fields.every((field) => !isEmpty(formData[field]));
    result[tab] = isValid;
  }
  return result;
};

// Centralized validation dispatcher (optional)
export const runFieldValidations = (fieldName, value) => {
  switch (fieldName) {
    case "email":
    case "secondaryEmail":
      return isEmailValid(value) ? "" : "Invalid email address";
    case "mobileNumber":
    case "alternativeNumber":
    case "whatsappNumber":
      return isPhoneNumberValid(value) ? "" : "Invalid phone number";
    default:
      return isEmpty(value) ? "This field is required" : "";
  }
};

import * as Yup from "yup";

//Basic validations
export const requiredStringField = () => Yup.string().required(`Required`);

export const requiredEmailField = () =>
  Yup.string().email("Invalid email format").required(`Required`);

export const optionalEmailField = () =>
  Yup.string().email("Invalid email format").nullable();

export const requiredTenDigitNumber = () =>
  Yup.string()
    .matches(/^[0-9]{10}$/, `Must be exactly 10 digits`)
    .required(`Required`);

export const optionalTenDigitNumber = () =>
  Yup.string()
    .matches(/^[0-9]{10}$/, `Must be exactly 10 digits`)
    .nullable();

export const requiredBooleanTrue = () =>
  Yup.boolean().oneOf([true], "Required");

export const requiredDropdown = () =>
  Yup.mixed().required(`Required`).nullable();

export const optionalDropdown = () => Yup.mixed().nullable();

export const requiredMultiSelect = () =>
  Yup.array()
    // .of(Yup.string()) // or Yup.number(), depending on your data
    .min(1, "At least one is required")
    .required("Required")
    .nullable(false);
