import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import FesLogo from '../assets/fes-logo-full.svg';
import { CustomButton, CustomInputField } from 'react-mui-tailwind';
import DisplayDashboardImage from '../assets/login-display-image-static.svg';
import InfoIcon from '@mui/icons-material/Info';
import { ResetPasswordValidationSchema } from '../utils/LoginValidationUtils';
import OtpInput from '../utils/OtpInput';
import { generateOtp, getResetPassword } from '../api/services/Login/loginEndpoints'; 

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [loginPasswordReset, setLoginPasswordReset] = useState(false);
  const [generateOTP, setGenerateOTP] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [apiError, setApiError] = useState('');

  const initialValues = {
    email: '',
    newPassword: '',
    confirmPassword: '',
    verificationCode: '',
  };

  useEffect(() => {
    let timer;
    if (otpCooldown > 0) {
      timer = setInterval(() => {
        setOtpCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpCooldown]);

  const handleGetOTP = async (validateForm, setFieldTouched, email) => {
    const errors = await validateForm();
    if (errors.email) {
      setFieldTouched('email', true);
      return;
    }
    try {
      const data = await generateOtp(email);      setApiError('');

      if (data?.succeeded) {
        setGenerateOTP(true);
        setOtpCooldown(60);
      } else {
        setApiError(data.message || 'Failed to generate OTP. Please try again.');
      }
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          'Network error. Please check your connection and try again.'
      );
    }
  };

  const handleReset = async (values, { setSubmitting, resetForm }) => {
    try {
      setApiError('');
      const data = await getResetPassword(
        values.email,
        values.newPassword,
        values.verificationCode,
      );
      if (data?.succeeded) {
        setLoginPasswordReset(true);
        resetForm();
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setApiError(data.message || 'Failed to reset password. Please check your OTP.');
      }
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          'Network error. Please check your connection and try again.'
      );
    }
    setSubmitting(false);
  };

  return (
    <div
      className="
        flex flex-col lg:flex-row 
        bg-gradient-to-tr from-[#c5deec] via-[#F2FAFF] to-white 
        2xl:px-[39px] xl:px-[10px] min-h-screen 
        overflow-hidden
      "
    >
      <div
        className="
          w-full lg:w-[40%] xl:w-[45%] 
          flex justify-center items-center 
          px-6 
          lg:px-[52px] lg:py-[10px] 
          xl:pt-0 
          2xl:pl-[100px] 2xl:pt-0 
          md:items-center md:justify-center 
          lg:gap-10
        "
      >
        <div
          className="
            w-full max-w-[424px] h-auto 
            rounded-[12px] 
            flex flex-col justify-center items-center 
            gap-[12px]
          "
        >
          <img src={FesLogo} alt="Logo" className="w-[132px] h-[32px]" />

          <h1 className="flex flex-col justify-center items-center font-proxima font-bold text-[28px] text-black">
            Forgot Password
            <span>
              {/* <p className="font-proxima font-normal text-[16px] sm:text-[14px] text-neutral-500 text-center">
                Please enter your email to receive a the OTP
              </p> */}
            </span>
          </h1>

          <div className="w-[356px] border-t border-[#CBDBE4]"></div>

          <Formik
            initialValues={initialValues}
            validationSchema={ResetPasswordValidationSchema}
            onSubmit={handleReset}
            validateOnChange
            validateOnBlur
          >
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldTouched, isSubmitting, validateForm }) => (
              <Form className="flex flex-col gap-[12px] w-full max-w-[356px]">
                <CustomInputField
                  label="Email Address"
                  width="100%"
                  placeholder="Enter Your Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  hasError={touched.email && Boolean(errors.email)}
                  error={touched.email && errors.email}
                />
                <div className="flex flex-col gap-[2px]">
                  <CustomInputField
                    isPassword
                    label="New Password"
                    width="100%"
                    placeholder="Enter New Password"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="newPassword"
                    hasError={touched.newPassword && Boolean(errors.newPassword)}
                    error={touched.newPassword && errors.newPassword}
                  />
                  <span>
                    <p className="font-proxima font-normal text-[11px] text-neutral-900">
                      Must be at least 8 characters with numbers and symbols
                    </p>
                  </span>
                </div>

                <CustomInputField
                  isPassword
                  label="Confirm Password"
                  width="100%"
                  placeholder="Confirm new password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="confirmPassword"
                  hasError={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  error={touched.confirmPassword && errors.confirmPassword}
                />

                <OtpInput
                  length={6}
                  label="Enter 6-digit OTP"
                  value={values.verificationCode}
                  onChange={(val) => setFieldValue('verificationCode', val)}
                  error={touched.verificationCode && Boolean(errors.verificationCode)}
                  helperText={generateOTP && !values.verificationCode && 'Please enter your reset code sent to your email'}
                  hasError={touched.verificationCode && errors.verificationCode}
                />

                {loginPasswordReset && (
                  <p className="text-green-600 font-medium text-sm text-center" aria-live="polite">
                    Thank you! Password Reset Successful!
                  </p>
                )}
                {apiError && (
                  <p className="text-red-600 font-medium text-sm text-center" aria-live="polite">
                    {apiError}
                  </p>
                )}

                <CustomButton
                  text={otpCooldown > 0 ? `Re-Generate OTP after ${otpCooldown} sec` : 'Generate OTP'}
                  variant="secondary"
                  startIcon={false}
                  endIcon={false}
                  width="100%"
                  onClick={() => handleGetOTP(validateForm, setFieldTouched, values.email)}
                  disabled={otpCooldown > 0}
                />

                {/* <div className="flex flex-col gap-[2px]">
                  <CustomDropDown
                    label="Security Question (Optional)"
                    width="100%"                  
                    options={['What is pet name?', 'What is your Mother name?', 'What is your Fav actor?']}
                    placeHolder="Select a security question"
                    value={values.securityQuestion}
                    onChange ={handleChange}
                    onBlur = {handleBlur}
                  //   onChange={(value) => {
                  //     setFieldValue('securityQuestion', value.target.value);
                  // }}
                  // onBlur={() => handleBlur({ target: { name: 'securityQuestion' } })}
                    name="securityQuestion"
                    hasError={touched.securityQuestion && Boolean(errors.securityQuestion)}
                    error={touched.securityQuestion && errors.securityQuestion}
                  />

                  <CustomInputField
                    label=""
                    width="100%"
                    placeholder="Your Answer"
                    showAsterisk={false}
                    required={false}
                    value={values.securityAnswer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="securityAnswer"
                    hasError={touched.securityAnswer && Boolean(errors.securityAnswer)}
                    error={touched.securityAnswer && errors.securityAnswer}
                  />
                </div> */}

                <CustomButton
                  text="Change Password"
                  startIcon={false}
                  endIcon={false}
                  width="100%"
                  type="submit"
                  disabled={isSubmitting}
                />


                <CustomButton
                  text="Return to Login"
                  variant="secondary"
                  startIcon={false}
                  endIcon={false}
                  width="100%"
                  onClick={() => {
                    setApiError('');
                    navigate('/login');
                  }}
                />
              </Form>
            )}
          </Formik>

          <div className="flex items-start w-full max-w-[356px] h-[70px] rounded-[12px] gap-2 p-2 border border-[#CBDBE4]">
            <InfoIcon className="w-4 h-4 text-[#17222B] scale-y-[-1] mt-0.9" fontSize="small" />
            <p className="font-proxima font-normal text-[13px] text-gray-400">
              If you don't recieve the OTP, please regenerate the OTP.
              {/* The reset link will expire in 15 minutes. If you don’t receive the email, please check your spam folder or
              contact support */}
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Image */}
      <div
        className="
          hidden md:hidden lg:flex 
          lg:w-[60%] xl:w-[55%] 2xl:w-[65%]  
          overflow-hidden
        "
      >
        <img
          src={DisplayDashboardImage}
          alt="Dashboard Display"
          className="xl:object-cover xl:object-top lg:object-cover lg:object-top w-full h-vh rounded-[12px]"
        />
      </div>
    </div>
  );

};

export default ResetPasswordPage;