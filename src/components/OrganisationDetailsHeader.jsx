import React from 'react';
import { CustomButton } from 'react-mui-tailwind';
import LeftArrowIcon from "../assets/arrow-left.svg";
import RightArrowIcon from "../assets/arrow-right.svg";
import PhoneIcon from "../assets/phone-icon.svg";
import PersonalCard from "../assets/personalcard.svg";
import MailIcon from "../assets/sms.svg";
import { useNavigate } from 'react-router-dom';
import { formRef } from '../pages/settings/organization/EditOrganisationPage';
import EditIcon from '../assets/edit.svg';

const OrganisationDetailsHeader = ({ organisation, id, mode }) => {
    const navigate = useNavigate();
    console.log("mode", mode, id)

    const handleBack = () => {
        navigate('/settings');
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

    const handleEditClick = () => {
        navigate(`/settings/organisation/edit/${id}`);
    };

    const getStatusClass = (status) => {
        console.log("stta", status)
        switch (status) {
            case true:
                return 'text-[#14AE5C] bg-[#EBF5ED]';
            case false:
                return 'text-[#EC221F] bg-[#FDE9E9]';
            default:
                return 'text-gray-700 bg-gray-100';
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
                                    Organisation Details
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
                                {organisation.initials}
                            </div>

                            <div style={{ display: "flex", height: "100%", flexDirection: "column", gap: "16px", }}>
                                <div className="flex items-center gap-2 ">
                                    <h3 className="font-bold text-[19px] leading-[140%] tracking-[0%]">{organisation.name}</h3>
                                    {/* {organisation.status && ( */}
                                        <span
                                            className={`inline-flex items-center justify-center font-bold ${getStatusClass(organisation.status)}`}
                                            style={{
                                                fontSize: "11px",
                                                lineHeight: "15.4px", // 140% of 11px
                                                width: organisation.status ? '56px' : '64px',
                                                height: '23px',
                                                padding: '4px 12px',
                                                borderRadius: '4px', // Assuming Corner/Small = 4px
                                            }}
                                        >
                                            {organisation.status ? "Active" : "Inactive"}
                                        </span>
                                    {/* )} */}
                                </div>
                                <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mt-1">
                                    {/* <span className="flex items-center gap-1">
                                        <img src={PersonalCard} alt="ID" className="w-[16px] h-[16px]" />
                                        {organisation.id}
                                    </span> */}
                                    <span className="flex items-center gap-1">
                                        <img src={MailIcon} alt="Email" className="w-[16px] h-[16px]" />
                                        {organisation.email}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <img src={PhoneIcon} alt="Phone" className="w-[16px] h-[16px]" />
                                        {organisation.phone}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {mode != "view" && (
                            <div className="flex items-center gap-3">
                                <CustomButton text="Cancel" variant="secondary" startIcon={false} endIcon={false} onClick={handleBack} />
                                <CustomButton text="Update" startIcon={false} endIcon={true} iconImg={RightArrowIcon} onClick={handleFormSubmit} />
                            </div>
                        )}
                        {mode == "view" && (
                            <div>
                                <CustomButton
                                    variant="icon"
                                    iconImg={EditIcon}
                                    endIcon={false}
                                    showText={false}
                                    onClick={() => handleEditClick()}
                                />
                            </div>
                        )}

                    </div>



                </div>

            </div>
        </header >

    );
};

export default OrganisationDetailsHeader;
