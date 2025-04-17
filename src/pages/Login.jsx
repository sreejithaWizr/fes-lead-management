import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import FesLogo from '../assets/fes-logo-full.svg';
import KeyIcon from '../assets/key-icon.svg';
import DisplayDashboardImage from '../assets/login-display-image-static.svg';
import { CustomButton, CustomCheckboxField, CustomInputField } from 'react-mui-tailwind';
import { LoginValidationSchema } from '../utils/LoginValidationUtils';

const Login = () => {
  const initialValues = {
    username: '',
    password: '',
    rememberMe: false,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form submitted with values:', values);
    setSubmitting(false);
  };

  return (
    <div className="flex bg-gradient-to-tr from-[#c5deec] via-[#F2FAFF] to-white pl-[100px] py-[39px] gap-[100px]">
      {/* Login Container */}
      <div className="flex flex-col w-[424px] h-[593px] rounded-[12px] pt-[100px] gap-[24px]">
        <img src={FesLogo} alt="Logo" className="w-[132px] h-[32px]" />

        <h1 className="font-proxima font-bold text-[28px] text-black">Welcome Back!</h1>
        <p className="font-proxima font-normal text-[16px] text-neutral-500">
          Please login to continue using FES platform
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={LoginValidationSchema}
          onSubmit={handleSubmit}
          // validateOnChange={true}
          // validateOnBlur={true}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => {
            console.log('Formik State:', { values, errors, touched });
            return (
              <Form className="flex flex-col gap-[24px]">
                {/* Username Field */}
                <div>
                  <CustomInputField
                    state="default"
                    label="Username"
                    width="356px"
                    placeholder="Username or Email"
                    value={values.username}
                    onChange={(value) => {
                      console.log('Username onChange:', value.target.value);
                      setFieldValue('username', value.target.value);
                    }}
                    onBlur = { handleBlur }
                    // onBlur={() => {
                    //   console.log('Username onBlur:', { name: 'username', value: values.username });
                    //   handleBlur({ target: { name: 'username' } });
                    // }}
                    name="username"
                    hasError={touched.username && Boolean(errors.username)}
                    error={touched.username && errors.username}
                  />
                  {/* Fallback error display */}
                  {/* {touched.username && errors.username && (
                    <span className="text-red-500 text-sm">{errors.username}</span>
                  )} */}
                  {/* Debug props */}
                  {/* {console.log('Username CustomInputField props:', {
                    value: values.username,
                    hasError: touched.username && Boolean(errors.username),
                    error: touched.username && errors.username,
                  })} */}
                </div>

                {/* Password Field */}
                <div>
                  <CustomInputField
                    state="default"
                    isPassword
                    label="Password"
                    width="356px"
                    placeholder="Password"
                    value={values.password}
                    onChange={(value) => {
                      console.log('Password onChange:', value.target.value);
                      setFieldValue('password', value.target.value);
                    }}
                    onBlur={handleBlur} 
                    name="password"
                    hasError={touched.password && Boolean(errors.password)}
                    error={touched.password && errors.password}
                  />

                        {/* Fallback error display */}
                        {/* {touched.password && errors.password && (
                    <span className="text-red-500 text-sm">{errors.password}</span>
                  )} */}
                  {/* Debug props */}
                  {/* {console.log('Password CustomInputField props:', {
                    value: values.password,
                    hasError: touched.password && Boolean(errors.password),
                    error: touched.password && errors.password,
                  })} */}
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex flex-row justify-between items-center">
                  <CustomCheckboxField
                    label="Remember me"
                    name="rememberMe"
                    checked={values.rememberMe}
                    onChange={handleChange}
                     onBlur={handleBlur} 
                    className="flex items-center space-x-2.5"
                    inputClassName="w-4 h-4 rounded-sm border border-[#17222B] bg-[#17222B]"
                    labelClassName="w-[103px] h-[22px] font-proxima-nova text-base font-normal text-[#17222B] leading-tight"
                    hasError={touched.rememberMe && Boolean(errors.rememberMe)}
                    error={touched.rememberMe && errors.rememberMe}
                  />
                  <Link
                    to="/reset-password"
                    className="font-proxima-nova text-[16px] font-normal text-[#009CDC] leading-[22px] text-right"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <CustomButton
                  text="Sign In"
                  startIcon={false}
                  endIcon={false}
                  width="356px"
                  type="submit"
                  disabled={isSubmitting}
                />
                {JSON.stringify(errors)}
              </Form>
            );
          }}
        </Formik>

        <p className="flex justify-center font-proxima font-normal text-[16px] text-neutral-500">
          Or continue with
        </p>
        <CustomButton
          text="SSO Login"
          iconImg={KeyIcon}
          variant="secondary"
          startIcon={true}
          endIcon={false}
          width="356px"
        />
      </div>

      {/* Dashboard Image */}
      <div className="w-[874px] h-[944px] rounded-[12px]">
        <img
          src={DisplayDashboardImage}
          alt="Dashboard Display"
          className="object-cover rounded-[12px]"
        />
      </div>
    </div>
  );
};

export default Login;