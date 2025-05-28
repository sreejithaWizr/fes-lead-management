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
            <Box pt={2} pb={2}>
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

                <div className="text-[17px] font-bold text-[#17222B] break-words mt-[16px]">
                    {selectedModule ? selectedModule?.module_name : "No module"}
                </div>

                {/* <Box display="flex" width={"100%"} gap={"24px"} mt={4}>
             
                    <div style={{ width: "33%" }}>
                        {selectedModule?.privilege
                            ?.filter((p) => !p.field_level)
                            ?.map((privilege, pIndex) => {
                                const realIndex = selectedModule.privilege.findIndex(
                                    (pr) => pr.privilege_id === privilege.privilege_id
                                );

                                return (
                                    <div key={privilege?.privilege_id} style={{ backgroundColor: "#F2F6F8", padding: "12px", borderRadius: "12px", width: "408px", }} >
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Checkbox
                                                style={checkBoxStyle}
                                                checked={isAllFieldChecked(privilege)}
                                                indeterminate={
                                                    isSomeFieldChecked(privilege) &&
                                                    !isAllFieldChecked(privilege)
                                                }
                                                onChange={(e) =>
                                                    handleTogglePrivilegeAll(realIndex, e.target.checked)
                                                }
                                            />
                                            <Typography style={{ wordBreak: "break-all" }} fontWeight="700">
                                                {privilege?.privilege_name}
                                            </Typography>
                                        </Box>

                                        {privilege?.fields?.map((field, fIndex) => {
                                            const basePath = `roleModules[${selectedModuleIndex}].privilege[${realIndex}].fields[${fIndex}]`;

                                            return (
                                                <Box
                                                    key={field?.field_id}
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    mt={1}
                                                    px={2}
                                                >
                                                    <Typography style={{ wordBreak: "break-all" }} flex={1}>{field?.field_name}</Typography>

                                                    {field.hasOwnProperty("view") && (
                                                        <Checkbox
                                                            style={checkBoxStyle}
                                                            checked={field.view}
                                                            onChange={(e) =>
                                                                setFieldValue(`${basePath}.view`, e.target.checked)
                                                            }
                                                        />
                                                    )}
                                                </Box>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                    </div>

                    
                    <div style={{ width: "66%", display: "flex", flexWrap: "wrap", gap: "24px" }}>
                        {selectedModule?.privilege
                            ?.filter((p) => p.field_level)
                            ?.map((privilege, pIndex) => {
                                const realIndex = selectedModule.privilege.findIndex(
                                    (pr) => pr.privilege_id === privilege.privilege_id
                                );

                                return (
                                    <div key={privilege?.privilege_id} style={{ backgroundColor: "#F2F6F8", padding: "12px", borderRadius: "12px", width: "408px" }} >
                                        <div display="flex" alignItems="center">
                                            <Typography style={{ wordBreak: "break-all" }} fontWeight="bold">
                                                {privilege?.privilege_name}
                                            </Typography>
                                        </div>

                                        <Box display="flex" justifyContent="space-between" pt={1} style={{ borderBottom: "1px solid #CBDBE4" }}>
                                            <Box flex={1}>Select all</Box>
                                            <Box display="flex" gap={4}>
                                                {["view", "edit", "mask"].map((type) =>
                                                    privilege.fields?.some((f) => f.hasOwnProperty(type)) ? (
                                                        <Box
                                                            key={type}
                                                            display="flex"
                                                            flexDirection="column"
                                                            alignItems="center"
                                                        >
                                                            <Typography
                                                                fontWeight="bold"
                                                                sx={{ textTransform: "capitalize" }}
                                                            >
                                                                {type}
                                                            </Typography>
                                                            <Checkbox
                                                                style={checkBoxStyle}
                                                                checked={isAllChecked(privilege, type)}
                                                                indeterminate={
                                                                    privilege.fields?.some((f) => f[type]) &&
                                                                    !isAllChecked(privilege, type)
                                                                }
                                                                onChange={(e) =>
                                                                    handleToggleAll(realIndex, type, e.target.checked)
                                                                }
                                                            />
                                                        </Box>
                                                    ) : null
                                                )}
                                            </Box>
                                        </Box>

                                        {privilege?.fields?.map((field, fIndex) => {
                                            const basePath = `roleModules[${selectedModuleIndex}].privilege[${realIndex}].fields[${fIndex}]`;

                                            return (
                                                <Box
                                                    key={field?.field_id}
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    mt={1}
                                                // px={2}
                                                >
                                                    <Typography style={{ wordBreak: "break-all" }} flex={1}>{field?.field_name}</Typography>

                                                    <Box display="flex" gap={4}>
                                                        {field.hasOwnProperty("view") && (
                                                            <Checkbox
                                                                style={checkBoxStyle}
                                                                checked={field.view}
                                                                onChange={(e) => {
                                                                    const checked = e.target.checked;
                                                                    setFieldValue(`${basePath}.view`, checked);
                                                                    if (!checked && field.edit) {
                                                                        setFieldValue(`${basePath}.edit`, false);
                                                                    }
                                                                }}
                                                            />
                                                        )}
                                                        {field.hasOwnProperty("edit") && (
                                                            <Checkbox
                                                                style={checkBoxStyle}
                                                                checked={field.edit}
                                                                onChange={(e) => {
                                                                    const checked = e.target.checked;
                                                                    setFieldValue(`${basePath}.edit`, checked);
                                                                    setFieldValue(`${basePath}.view`, checked);
                                                                }}
                                                            />
                                                        )}
                                                        {field.hasOwnProperty("mask") && (
                                                            <Checkbox
                                                                style={checkBoxStyle}
                                                                checked={field.mask}
                                                                onChange={(e) =>
                                                                    setFieldValue(`${basePath}.mask`, e.target.checked)
                                                                }
                                                            />
                                                        )}
                                                    </Box>
                                                </Box>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                    </div>
                </Box> */}

                <Box display="flex" width="100%" gap="24px" mt="16px">
                    {/* Left Column: field_level false */}
                    <Box>
                        <Box display="flex" flexDirection="column" gap="24px">
                            {selectedModule?.privilege
                                ?.filter((p) => !p.field_level)
                                ?.map((privilege) => {
                                    const realIndex = selectedModule?.privilege.findIndex(
                                        (pr) => pr?.privilege_id === privilege?.privilege_id
                                    );

                                    return (
                                        <Box
                                            key={privilege?.privilege_id}
                                            sx={{
                                                backgroundColor: "#F2F6F8",
                                                padding: "12px",
                                                borderRadius: "12px",
                                                minWidth: "408px", // Take full column width
                                                boxSizing: "border-box",
                                                maxHeight: "325px",
                                                display: "flex",
                                                flexDirection: "column"
                                            }}
                                            className="custom-scroll"
                                        >
                                            <Box display="flex" alignItems="center" gap={1}>
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
                                                <Typography
                                                    style={{ wordBreak: "break-all" }}
                                                    fontWeight="700"
                                                >
                                                    {privilege?.privilege_name}
                                                </Typography>
                                            </Box>
                                            <div style={{ flexGrow: 1, padding: 0, overflow: "auto" }} className="custom-scroll">
                                                {privilege?.fields?.map((field, fIndex) => {
                                                    const basePath = `roleModules[${selectedModuleIndex}].privilege[${realIndex}].fields[${fIndex}]`;

                                                    return (
                                                        <Box
                                                            key={field?.field_id}
                                                            display="flex"
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                            mt={1}
                                                            px={1}
                                                        >
                                                            <Typography
                                                                style={{ wordBreak: "break-all" }}
                                                                flex={1}
                                                            >
                                                                {field?.field_name}
                                                            </Typography>

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
                                                        </Box>
                                                    );
                                                })}
                                            </div>
                                        </Box>
                                    );
                                })}
                        </Box>
                    </Box>

                    {/* Right Column: field_level true */}
                    <Box
                        sx={{
                            // width: '66%',
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "24px",
                            alignContent: "flex-start",
                        }}
                    >
                        {selectedModule?.privilege
                            ?.filter((p) => p.field_level)
                            ?.map((privilege) => {
                                const realIndex = selectedModule.privilege.findIndex(
                                    (pr) => pr.privilege_id === privilege.privilege_id
                                );

                                return (
                                    <Box
                                        key={privilege?.privilege_id}
                                        sx={{
                                            backgroundColor: "#F2F6F8",
                                            padding: "12px",
                                            display: "flex",
                                            flexDirection: "column",
                                            borderRadius: "12px",
                                            width: "408px",
                                            boxSizing: "border-box",
                                            height: "325px",
                                        }}
                                        className="custom-scroll"
                                    >
                                        <div display="flex" alignItems="center">
                                            <Typography
                                                style={{ wordBreak: "break-all" }}
                                                fontWeight="bold"
                                            >
                                                {privilege?.privilege_name}
                                            </Typography>
                                        </div>

                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            pt={1}
                                            style={{ borderBottom: "1px solid #CBDBE4" }}
                                        >
                                            <Box flex={1}>Select all</Box>
                                            <Box display="flex" gap={4}>
                                                {["view", "edit", "mask"].map((type) =>
                                                    privilege.fields?.some((f) =>
                                                        f.hasOwnProperty(type)
                                                    ) ? (
                                                        <Box
                                                            key={type}
                                                            display="flex"
                                                            flexDirection="column"
                                                            alignItems="center"
                                                        >
                                                            <Typography
                                                                fontWeight="bold"
                                                                sx={{ textTransform: "capitalize" }}
                                                            >
                                                                {type}
                                                            </Typography>
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
                                                        </Box>
                                                    ) : null
                                                )}
                                            </Box>
                                        </Box>
                                        <div style={{ flexGrow: 1, padding: 0, overflow: "auto" }} className="custom-scroll">
                                            {privilege?.fields?.map((field, fIndex) => {
                                                const basePath = `roleModules[${selectedModuleIndex}].privilege[${realIndex}].fields[${fIndex}]`;

                                                return (
                                                    <Box
                                                        key={field?.field_id}
                                                        display="flex"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        mt={1}
                                                    // px={2}
                                                    >
                                                        <Typography
                                                            style={{ wordBreak: "break-all" }}
                                                            flex={1}
                                                        >
                                                            {field?.field_name}
                                                        </Typography>

                                                        <Box display="flex" gap={4}>
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
                                                        </Box>
                                                    </Box>
                                                );
                                            })}
                                        </div>
                                    </Box>
                                );
                            })}
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default RoleAccessForm;
