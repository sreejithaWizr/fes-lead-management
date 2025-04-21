import * as Yup from 'yup';

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

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[@$!%*?&#^()[\]{}<>+=~|.,:;"'-]/,
      'Password must contain at least one special character'
    ),

  rememberMe: Yup.boolean(),
});
