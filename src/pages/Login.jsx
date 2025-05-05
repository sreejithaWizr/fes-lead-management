import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import FesLogo from '../assets/fes-logo-full.svg';
import KeyIcon from '../assets/key-icon.svg';
import DisplayDashboardImage from '../assets/login-display-image-static.svg';
// import DisplayDashboardImage from '../assets/dashboard-static-image.svg';
import { CustomButton, CustomCheckboxField, CustomInputField } from 'react-mui-tailwind';
import { LoginValidationSchema } from '../utils/LoginValidationUtils';
import { getLoginUser } from '../api/services/Login/loginEndpoints'; // update with correct path
import { isAuthenticated } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate(); // <-- for redirecting
  const [loginSuccess, setLoginSuccess] = useState(false); // <-- for showing success message

  const initialValues = {
    username: '',
    password: '',
    rememberMe: false,
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (await isAuthenticated()) {
        navigate("/leads", { replace: true });
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log('Form submitted with values:', values);

      const data = await getLoginUser(values.username, values.password); // just returns the data
      if (!data?.token?.succeeded) {

        setErrors({ form: data?.errors || 'Incorrect username or password' });
        return;
      }
      // Save token
      const token = data?.token?.refreshToken;
      localStorage.setItem("token", token);
      console.log("Token saved:", token);

      // Redirect
      setLoginSuccess(true);
      navigate('/leads');
    } catch (error) {
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-tr from-[#c5deec] via-[#F2FAFF] to-white 2xl:px-[39px] xl:px-[10px] min-h-screen 
overflow-hidden">
      {/* Login Container */}
      <div className="w-full lg:w-[40%] xl:w-[45%] flex justify-center items-center px-6 
  lg:px-[52px] 
  xl:pt-0 2xl:pl-[100px] 2xl:pt-0 
  md:items-center md:justify-center 
  lg:py-[10px] lg:gap-10">

        <div className="w-full max-w-[424px] h-auto rounded-[12px] flex flex-col justify-center items-center gap-[12px] py-[34px]">
          <img src={FesLogo} alt="Logo" className="w-[132px] h-[32px]" />

          <h1 className="flex flex-col justify-center items-center font-proxima font-bold text-[28px] text-black">Login
            <span>    <p className="font-proxima font-normal text-[16px] sm:text-[14px] text-neutral-400 text-center">
              Please login to continue using FES platform
            </p></span>
          </h1>

          <div className="w-[356px] border-t border-[#CBDBE4]"></div>

          {/* <p className="font-proxima font-normal text-[16px] sm:text-[14px] text-neutral-500 text-center">
        Please login to continue using FES platform
      </p> */}

          <Formik
            initialValues={initialValues}
            validationSchema={LoginValidationSchema}
            onSubmit={handleSubmit}
            validateOnChange
            validateOnBlur
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form className="flex flex-col gap-[20px] w-full max-w-[356px]">
                <CustomInputField
                  state="default"
                  label="Username"
                  width="100%"
                  placeholder="Username or Email"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="username"
                  hasError={touched.username && Boolean(errors.username)}
                  error={touched.username && errors.username}
                />

                <CustomInputField
                  state="default"
                  isPassword
                  label="Password"
                  width="100%"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  hasError={touched.password && Boolean(errors.password)}
                  error={touched.password && errors.password}
                />

                <div className="flex flex-row justify-between items-center">
                  <CustomCheckboxField
                    type="checkbox"
                    label="Remember me"
                    name="rememberMe"
                    checked={values.rememberMe}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="flex items-center space-x-2.5"
                    inputClassName="w-4 h-4 rounded-sm border border-[#17222B] bg-[#17222B]"
                    labelClassName="font-proxima-nova text-base font-normal text-[#17222B] leading-tight"
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

                {errors.form && (
                  <p className="text-red-600 font-medium text-sm text-center">
                    {errors.form}
                  </p>
                )}

                <CustomButton
                  text="Sign In"
                  startIcon={false}
                  endIcon={false}
                  width="100%"
                  type="submit"
                  disabled={isSubmitting}
                />

                {loginSuccess && (
                  <p className="text-green-600 font-medium text-sm text-center">
                    Thank you! Login Successful!
                  </p>
                )}
                {/* <p className="font-proxima font-normal text-[16px] text-neutral-500 text-center">
        Or continue with
      </p> */}
                {/* <CustomButton
        text="SSO Login"
        iconImg={KeyIcon}
        variant="secondary"
        startIcon={true}
        endIcon={false}
        width="100%"
      /> */}
              </Form>
            )}
          </Formik>

        </div>
      </div>

      {/* Dashboard Image */}
      <div className="hidden md:hidden lg:flex lg:w-[60%] xl:w-[55%] 2xl:w-[65%] h-[100vh] overflow-hidden">
        <img
          src={DisplayDashboardImage}
          alt="Dashboard Display"
          className="xl:object-cover xl:object-top lg:object-cover lg:object-top w-full h-full rounded-[12px]"
        />
      </div>
    </div>



  );
};

export default Login;