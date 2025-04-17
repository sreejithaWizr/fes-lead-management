import React from 'react'
import FesLogo from '../assets/fes-logo-full.svg';
import { CustomButton, CustomDropDown, CustomInputField } from 'react-mui-tailwind';
import DisplayDashboardImage from '../assets/login-display-image-static.svg';
import InfoIcon from '@mui/icons-material/Info';



const ResetPasswordPage = () => {
  return (
<div className="flex bg-gradient-to-tr from-[#c5deec] via-[#F2FAFF] to-white py-[39px] pl-[100px] gap-[100px]">

         {/* Reset Container */}
    <div className="flex flex-col w-[424px] h-[593px] rounded-[12px] pt-[79px] gap-[24px]">
    <img src={FesLogo} alt="Logo" className="w-[132px] h-[32px]" />

    <h1 className="font-proxima font-bold text-[28px] text-black">Reset your Password</h1>
    <p className="font-proxima font-normal text-[16px] text-neutral-500">
     Please enter your email to receive a reset link
    </p>
    <div className="w-[356px] border-t border-[#CBDBE4]"></div>

  
             <CustomInputField
                label="Email Address"
                width="356px"
                placeholder="Enter Your Email"
              />
              <CustomInputField
               isPassword
                label="New Password"
                width="356px"
                placeholder="Enter New Password"
              />

<p className="font-proxima font-normal text-[13px] text-neutral-900">Must be at least 8 characters with numbers and symbols</p>

             <CustomInputField
               isPassword
                label="Confirm Password"
                width="356px"
                placeholder="Confirm new password"
              />  
                <div>
                   <CustomDropDown
                    label="Security Question (Optional)"
                    width="356px"
                    options={["What is pet name?", "What is your Mother name?", "Whats is your Fav actor?"]}
                    placeHolder="Select a security question"
                    />

                    <CustomInputField
                    label= " "
                    width="356px"
                    placeholder="Your Answer"
                    showAsterisk={false}
                    required={false}
                    />
                  </div>

                      <CustomButton
                        text="Reset Password"
                        startIcon={false}
                        endIcon={false}
                        width="356px"
                        // onSubmit={handleSubmit}
                      />

                      <CustomButton 
                      text="Return to Login" 
                      variant="secondary"
                      startIcon={false}
                      endIcon={false}
                      width="356px" />

            <div className="flex items-start w-[356px] h-[70px] rounded-[12px] gap-2 p-2 border border-[#CBDBE4]">
            <InfoIcon className="w-4 h-4 text-[#17222B] scale-y-[-1] mt-0.5" fontSize="small" />
            <p className="font-proxima font-normal text-[13px] text-gray-400">
            The reset link will expire in 15 minutes. If you don't receive the email, please check your spam folder or contact support
            </p>
            </div>






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
  )
}

export default ResetPasswordPage
