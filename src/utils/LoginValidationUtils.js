import * as Yup from 'yup';

// =======================
// Shared Validation Rules
// =======================

export const emailRule = Yup.string()
  .required('Email is required')
  .email('Enter a valid email address');

export const userNameRule = Yup.string()
  .required('Username is required')
  .matches(/^[a-zA-Z0-9_]{3,}$/, 'Username must be at least 3 characters and alphanumeric');

export const passwordRule = Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Must contain at least one lowercase letter')
  .matches(/\d/, 'Must contain at least one number')
  .matches(/[-@$!%*?&#^()[\]{}<>+=~|.,:;"'_]/, 'Must contain one special character')

export const confirmPasswordRule = (refField = 'password') =>
  Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref(refField)], 'Passwords must match');

export const dropdownRule = Yup.string()
  .nullable()
  .notRequired()
  .test('is-not-empty', 'Please select an option', (value) => {
    return value ? value.trim().length > 0 : true;
  });

  export const otpRule = Yup.string()
  .required('OTP is required')
  .matches(/^\d{6}$/, 'OTP must be 6 digits');

// =======================
// Login Schema
// =======================

export const LoginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username or Email is required')
    .test(
      'is-valid-username-or-email',
      'Enter a valid username or email',
      (value) => {
        if (!value) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
        return emailRegex.test(value) || usernameRegex.test(value);
      }
    ),
  password: passwordRule,
  rememberMe: Yup.boolean(),
});

// =======================
//  Reset Password Schema
// =======================

export const ResetPasswordValidationSchema = Yup.object().shape({
  email: emailRule,
  newPassword: passwordRule,
  confirmPassword: confirmPasswordRule('newPassword'),
  securityQuestion: dropdownRule,
  securityAnswer: Yup.string().notRequired(),
  verificationCode: otpRule,
});
