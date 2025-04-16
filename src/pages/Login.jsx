import React from 'react';
import { Link } from 'react-router-dom';
import FesLogo from '../assets/fes-logo-full.svg';
import DisplayDashboardImage from '../assets/login-display-image-static.svg';
import { CustomInputField, CustomButton, CustomCheckboxField } from 'react-mui-tailwind';


const Login = () => {
  return (
<div className="flex bg-gradient-to-tr from-[#c5deec] via-[#F2FAFF] to-white  pl-[100px] py-[39px] gap-[100px]">
   {/* Login Container */}
      <div className="flex flex-col w-[424px] h-[593px] rounded-[12px]  pt-[100px]  gap-[24px]">
        <img src={FesLogo} alt="Logo" className="w-[132px] h-[32px]" />

        <h1 className="font-proxima font-bold text-[28px] text-black">Welcome Back!</h1>
        <p className="font-proxima font-normal text-[16px] text-neutral-500">
          Please login to continue using FES platform
        </p>

        <CustomInputField
          // className="w-[356px] h-10"
          label="Username"
          width="356px"
          placeholder="UserName or Email"
          value=""
        />
        <CustomInputField
          type = "password"
          // className="w-[356px] h-10"
          label="Password"
          width="356px"
          placeholder="Password"
          value=""
        />

        <div className="flex flex-row justify-between items-center">
          <CustomCheckboxField
            label="Remember me"
            className="flex items-center space-x-2.5"
            inputClassName="w-4 h-4 rounded-sm border border-[#17222B] bg-[#17222B]"
            labelClassName="w-[103px] h-[22px] font-proxima-nova text-base font-normal text-[#17222B] leading-tight"
          />
       <Link
        to="/reset-password"
        className="font-proxima-nova text-[16px] font-normal text-[#009CDC] leading-[22px] text-right"
      >
        Forgot Password?
      </Link>
        </div>

        <CustomButton
          text="Sign In"
          startIcon={false}
          endIcon={false}
          width="356px"
        />
      </div>

      {/* Dashboard Image */}
      <div className="w-[874px] h-[944] rounded-[12px]">
        <img
          src={DisplayDashboardImage}
          alt="Dashboard Display"
          className=" object-cover rounded-[12px]"
        />
      </div>
    </div>
  );
};

export default Login;
