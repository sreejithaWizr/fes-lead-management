// Basic reusable validation functions
export const isEmpty = (value) => {
    return value === undefined || value === null || value.toString().trim() === '';
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
            errors[field] = 'This field is required.';
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
        case 'email':
        case 'secondaryEmail':
            return isEmailValid(value) ? '' : 'Invalid email address';
        case 'mobileNumber':
        case 'alternativeNumber':
        case 'whatsappNumber':
            return isPhoneNumberValid(value) ? '' : 'Invalid phone number';
        default:
            return isEmpty(value) ? 'This field is required' : '';
    }
};
