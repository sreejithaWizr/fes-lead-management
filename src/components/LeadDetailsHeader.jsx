import React from 'react';
import { CustomButton } from 'react-mui-tailwind';
import LeftArrowIcon from "../assets/arrow-left.svg";
import RightArrowIcon from "../assets/arrow-right.svg";
import PhoneIcon from "../assets/phone-icon.svg";
import PersonalCard from "../assets/personalcard.svg";
import MailIcon from "../assets/sms.svg";
import { useNavigate } from 'react-router-dom';
import { formRef } from '../pages/EditLeadPage';

const LeadDetailsHeader = ({ lead }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/leads');
    };
    const handleFormSubmit = () => {
        if (formRef.current) {
            // Set all fields as touched to trigger validation
            formRef.current.setTouched(
                Object.keys(formRef.current.values).reduce((acc, key) => {
                    acc[key] = true;
                    return acc;
                }, {})
            );

            formRef.current.submitForm();
            // formRef.current.validateForm().then(errors => {
            //   if (Object.keys(errors).length === 0) {
            //     // No errors, submit the form
            //     formRef.current.submitForm();
            //   } else {
            //     console.log('Form has validation errors:', errors);
            //     // Form has errors, don't submit
            //   }
            // });
        }
    };
    return (
        <header className="w-full shadow-card">
            <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col w-full">
                    <div className="flex w-full justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <img
                                src={LeftArrowIcon}
                                alt="FES Logo"
                                className="size-[24px] rounded-md cursor-pointer"
                                onClick={handleBack}
                            />
                            <div className="flex items-center gap-2">
                                <h1
                                    className="font-proxima font-bold text-[28px] leading-[140%] align-middle text-[#17222B]">
                                    Lead Details
                                </h1>
                            </div>
                        </div>
                        {/* for search button if needed */}
                        <></>
                        {/* <div className="flex items-center gap-3">
                            <CustomButton text="Cancel" variant="secondary" startIcon={false} endIcon={false} onClick={handleBack} />
                            <CustomButton text="Update" startIcon={false} endIcon={true} iconImg={RightArrowIcon} onClick={handleFormSubmit} />
                        </div> */}
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="flex mt-2 gap-4 items-start w-full h-[88px] pt-[12px] pb-[12px] rounded-[12px]">
                            <div className="bg-[#030229B2] text-white w-[64px] h-[64px] rounded-full flex items-center justify-center text-sm p-[12px] font-bold text-[23px] leading-[140%] tracking-[0%]">
                                {lead.initials}
                            </div>

                            <div style={{display: "flex", height: "100%", flexDirection: "column", gap: "16px",}}>
                                <div className="flex items-center gap-2 ">
                                    <h3 className="font-bold text-[19px] leading-[140%] tracking-[0%]">{lead.name}</h3>
                                    {lead.status && (
                                        <span className="bg-[#FFF3E6] text-[#FF8400] text-xs px-2 py-[2px] rounded-[8px] border border-[#FFB86B] font-bold text-[13px] leading-[140%] tracking-[0%] ">
                                            {lead.status}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mt-1">
                                    <span className="flex items-center gap-1">
                                        <img src={PersonalCard} alt="ID" className="w-[16px] h-[16px]" />
                                        {lead.id}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <img src={MailIcon} alt="Email" className="w-[16px] h-[16px]" />
                                        {lead.email}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <img src={PhoneIcon} alt="Phone" className="w-[16px] h-[16px]" />
                                        {lead.phone}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <CustomButton text="Cancel" variant="secondary" startIcon={false} endIcon={false} onClick={handleBack} />
                            <CustomButton text="Update" startIcon={false} endIcon={true} iconImg={RightArrowIcon} onClick={handleFormSubmit} />
                        </div>
                    </div>

                </div>

            </div>
        </header >

    );
};

export default LeadDetailsHeader;
