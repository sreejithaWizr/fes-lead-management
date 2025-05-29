import React, { useState } from "react";
import { Box, Checkbox, Typography } from "@mui/material";
import { CustomButton } from "react-mui-tailwind";

const RoleAccessForm = ({ values, setFieldValue, mode='create' }) => {
    
    const isDisabled = mode === "view"

    const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
    const selectedModule = values?.roleModules[selectedModuleIndex];

    const isAllChecked = (privilege, type) =>
        privilege.fields?.length > 0 &&
        privilege.fields?.every((field) => field?.[type]);

    const handleToggleAll = (privilegeIndex, type, isChecked) => {
        const fields = selectedModule?.privilege?.[privilegeIndex]?.fields || [];

        fields.forEach((_, fieldIndex) => {
            const basePath = `roleModules[${selectedModuleIndex}].privilege[${privilegeIndex}].fields[${fieldIndex}]`;

            // Set the checkbox for the type (view/edit/mask)
            setFieldValue(`${basePath}.${type}`, isChecked);

            // Special logic: if type is edit, also update view accordingly
            if (type === "edit") {
                setFieldValue(`${basePath}.view`, isChecked);
            }

            // If unchecking view and edit is still true, unset edit too (to keep them in sync)
            if (type === "view" && !isChecked) {
                if (fields[fieldIndex].edit) {
                    setFieldValue(`${basePath}.edit`, false);
                }
            }
        });
    };

    const isAllFieldChecked = (privilege) => {
        return privilege.fields?.every((field) => field?.view);
    };

    const isSomeFieldChecked = (privilege) => {
        return privilege.fields?.some((field) => field?.view);
    };

    const handleTogglePrivilegeAll = (privilegeIndex, isChecked) => {
        const fields = selectedModule?.privilege?.[privilegeIndex]?.fields || [];
        fields.forEach((_, fieldIndex) => {
            const path = `roleModules[${selectedModuleIndex}].privilege[${privilegeIndex}].fields[${fieldIndex}].view`;
            setFieldValue(path, isChecked);
        });
    };

    // const checkBoxStyle = {
    //    ".MuiSvgIcon-root": {
    //         color: "#17222B",
    //       },
    //     "&.Mui-disabled .MuiSvgIcon-root": {
    //         color: "#BFBFBF",
    //       },
    // };

    const checkBoxStyle = {
        // Default (enabled)
        "& .MuiSvgIcon-root": {
          color: "#17222B",
          height:"19px",
        },
      
        // Disabled (unchecked)
        "&.Mui-disabled .MuiSvgIcon-root": {
          color: "#BFBFBF",
        },
      
        // Disabled and checked
        "&.Mui-disabled.Mui-checked .MuiSvgIcon-root": {
          color: "#BFBFBF",
        },
      };
      

    return (
        <div className="form-section p-[16px] animate-fade-in">
            <h2 className="font-bold text-[19px] ">Role Access</h2>
            <div className="pt-1 pb-1">
                <div className="flex space-x-2 pt-3 pb-3">
                    {values?.roleModules?.map((tab, index) => (
                        <div key={tab?.moduleID}>
                            <CustomButton
                                key={tab?.module_id}
                                text={tab?.module_name}
                                variant="chips"
                                rounded="full"
                                startIcon={false}
                                endIcon={false}
                                onClick={() => setSelectedModuleIndex(index)}
                                selected={selectedModuleIndex === index}
                            />
                        </div>
                    ))}
                </div>

                <div className="text-[15px] font-bold text-[#17222B] break-words mt-[16px]">
                    {selectedModule ? selectedModule?.module_name : "No module"}
                </div>

                <div className="flex w-full gap-6 mt-4">
                    {/* Left Column: field_level false */}
                    <div className="mt-2">
                        <div className="flex flex-col gap-[24px]">
                            {selectedModule?.privilege
                                ?.filter((p) => !p.field_level)
                                ?.map((privilege) => {
                                    const realIndex = selectedModule?.privilege.findIndex(
                                        (pr) => pr?.privilege_id === privilege?.privilege_id
                                    );

                                    return (
                                        <div
                                            key={privilege?.privilege_id}
                                            className="bg-[#F2F6F8] pt-2 pr-3 pb-2 pl-2 rounded-[12px] min-w-[408px] max-h-[325px] box-border flex flex-col custom-scroll"  
                                        >
                                            <div className="flex items-center gap-1">
                                                <Checkbox
                                                    sx={checkBoxStyle}
                                                    checked={isAllFieldChecked(privilege)}
                                                    indeterminate={
                                                        isSomeFieldChecked(privilege) &&
                                                        !isAllFieldChecked(privilege)
                                                    }
                                                    onChange={(e) =>
                                                        handleTogglePrivilegeAll(
                                                            realIndex,
                                                            e.target.checked
                                                        )
                                                    }
                                                    disabled={isDisabled}
                                                />
                                                <label
                                                    className="break-all font-[700] text-[15px]"
                                                >
                                                    {privilege?.privilege_name}
                                                </label>
                                            </div>
                                            <div className="flex-grow p-0 overflow-auto custom-scroll">
                                                {privilege?.fields?.map((field, fIndex) => {
                                                    const basePath = `roleModules[${selectedModuleIndex}].privilege[${realIndex}].fields[${fIndex}]`;

                                                    return (
                                                        <div
                                                            key={field?.field_id}
                                                            className="flex items-center mt-1 px-1 pl-4 gap-1"
                                                        >
                                                            {field.hasOwnProperty("view") && (
                                                                <Checkbox
                                                                    sx={checkBoxStyle}
                                                                    checked={field.view}
                                                                    onChange={(e) =>
                                                                        setFieldValue(
                                                                            `${basePath}.view`,
                                                                            e.target.checked
                                                                        )
                                                                    }
                                                                    disabled={isDisabled}
                                                                />
                                                            )}
                                                             <label
                                                               className="break-all flex-1 text-[15px]"
                                                            >
                                                                {field?.field_name} 
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    {/* Right Column: field_level true */}
                    <div className="flex flex-wrap gap-6 content-start mt-2">
                        {selectedModule?.privilege
                            ?.filter((p) => p.field_level)
                            ?.map((privilege) => {
                                const realIndex = selectedModule.privilege.findIndex(
                                    (pr) => pr.privilege_id === privilege.privilege_id
                                );

                                return (
                                    <div
                                        key={privilege?.privilege_id}
                                        className="bg-[#F2F6F8] p-3 flex flex-col rounded-[12px] w-[408px] box-border h-[325px] custom-scroll">
                                        <div display="flex" alignItems="center">
                                            <label className="break-all text-[15px] font-[700]">
                                                {privilege?.privilege_name}
                                            </label>
                                        </div>

                                        <div className="flex justify-between pt-1 border-b border-[#CBDBE4]">
                                            <div className="flex-1 text-[14px]">Select all</div>
                                            <div className="flex gap-5">
                                                {["view", "edit", "mask"].map((type) =>
                                                    privilege.fields?.some((f) =>
                                                        f.hasOwnProperty(type)
                                                    ) ? (
                                                        <div
                                                            key={type}
                                                            className="flex flex-col items-center"
                                                        >
                                                            <label className="font-[700] text-[14px] capitalize">
                                                                {type}
                                                            </label>
                                                            <Checkbox
                                                                sx={checkBoxStyle}
                                                                checked={isAllChecked(privilege, type)}
                                                                indeterminate={
                                                                    privilege.fields?.some((f) => f[type]) &&
                                                                    !isAllChecked(privilege, type)
                                                                }
                                                                onChange={(e) =>
                                                                    handleToggleAll(
                                                                        realIndex,
                                                                        type,
                                                                        e.target.checked
                                                                    )
                                                                }
                                                                disabled={isDisabled}
                                                            />
                                                        </div>
                                                    ) : null
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-grow p-0 overflow-auto custom-scroll">
                                            {privilege?.fields?.map((field, fIndex) => {
                                                const basePath = `roleModules[${selectedModuleIndex}].privilege[${realIndex}].fields[${fIndex}]`;

                                                return (
                                                    <div
                                                        key={field?.field_id}
                                                       className="flex justify-between mt-1 items-center"
                                                    >
                                                        <label
                                                        className="break-all text-[15px] flex-1" 
                                                        >
                                                            {field?.field_name}
                                                        </label>

                                                        <div className="flex gap-5">
                                                            {field.hasOwnProperty("view") && (
                                                                <Checkbox
                                                                    sx={checkBoxStyle}
                                                                    checked={field.view}
                                                                    onChange={(e) => {
                                                                        const checked = e.target.checked;
                                                                        setFieldValue(`${basePath}.view`, checked);
                                                                        if (!checked && field.edit) {
                                                                            setFieldValue(`${basePath}.edit`, false);
                                                                        }
                                                                    }}
                                                                    disabled={isDisabled}
                                                                />
                                                            )}
                                                            {field.hasOwnProperty("edit") && (
                                                                <Checkbox
                                                                    sx={checkBoxStyle}
                                                                    checked={field.edit}
                                                                    onChange={(e) => {
                                                                        const checked = e.target.checked;
                                                                        setFieldValue(`${basePath}.edit`, checked);
                                                                        setFieldValue(`${basePath}.view`, checked);
                                                                    }}
                                                                    disabled={isDisabled}
                                                                />
                                                            )}
                                                            {field.hasOwnProperty("mask") && (
                                                                <Checkbox
                                                                    sx={checkBoxStyle}
                                                                    checked={field.mask}
                                                                    onChange={(e) =>
                                                                        setFieldValue(
                                                                            `${basePath}.mask`,
                                                                            e.target.checked
                                                                        )
                                                                    }
                                                                    disabled={isDisabled}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleAccessForm;
