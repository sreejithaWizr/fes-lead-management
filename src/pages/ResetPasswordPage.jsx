import React from 'react'
import FesLogo from '../assets/fes-logo-full.svg';

const ResetPasswordPage = () => {
  return (
<div className="flex bg-gradient-to-tr from-[#c5deec] via-[#F2FAFF] to-white  pl-[100px] py-[39px] gap-[100px]">
    <div>
         {/* Reset Container */}
    <div className="flex flex-col w-[424px] h-[593px] rounded-[12px]  pt-[100px]  gap-[24px]">
    <img src={FesLogo} alt="Logo" className="w-[132px] h-[32px]" />

    <h1 className="font-proxima font-bold text-[28px] text-black">Reset your Password</h1>
    <p className="font-proxima font-normal text-[16px] text-neutral-500">
     Please enter your email to receive a reset link
    </p>
    </div>
    </div>
    </div>
  )
}

export default ResetPasswordPage
