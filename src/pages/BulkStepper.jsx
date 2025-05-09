import React, { useRef } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Box,
  Collapse,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import BulkUploaderIcon from "../assets/bulk-uploader-icon.svg";
import Dragicon from "../assets/Dragicon.svg";
import BulkSaveIcon from "../assets/BulkSaveIcon.svg";
import BulkPreviewIcon from "../assets/bulk-preview-icon.svg";
import BulkRefreshIcon from "../assets/bulk-refresh-icon.svg";
import BulkTrashIcon from "../assets/bulk-trash-icon.svg";
import BulkEditIcon from "../assets/edit-icon.svg";
import { CustomButton, CustomCheckboxField } from "react-mui-tailwind";
import { formatBytes } from "../utils/commonFunction"

// Custom step icon with secondary color for inactive and primary for active
const CustomStepIcon = ({ active, completed, icon }) => {
  const backgroundColor = completed
    ? "#009CDC"
    : active
      ? "#E6F5FC"
      : "#FFFFFF";

  const border = completed
    ? "none"
    : `1px solid ${active ? "#009CDC" : "#B6CDD9"}`;

  const textColor = completed
    ? "#FFFFFF"
    : active
      ? "#009CDC"
      : "#B6CDD9";

  return (
    <div
      style={{
        width: 45,
        height: 45,
        borderRadius: "50%",
        backgroundColor,
        border,
        color: textColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 19,
        fontWeight: 900,
        marginLeft: "-7px",
      }}
    >
      {icon}
    </div>
  );
};


// Custom TransitionComponent to prevent collapsing for Step 0 and Step 1
const NonCollapsingTransition = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const BulkStepper = ({
  steps,
  activeStep,
  checkboxData,
  isCheckboxEditable,
  handleCheckboxChange,
  toggleCheckboxEditable,
  dragOver,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileSelect,
  uploadStatus,
  handleFinish,
  file,
  handlePreview,
  handleReupload,
  handleDelete,
  fileInputRef
}) => {
  
  const uploadedFile =
  uploadStatus === "Success" && file
    ? { name: file.name, size: formatBytes(file.size) }
    : null;

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel
            StepIconComponent={CustomStepIcon}
            sx={{
              "& .MuiStepLabel-label": {
                fontSize: "19px",
                fontWeight: 700,
                lineHeight: "140%",
                fontFamily: "Proxima Nova, sans-serif",
                color: "#B0BEC5",
              },
              "& .MuiStepLabel-label.Mui-active": {
                color: "#17222B",
                fontWeight: 700,
                fontFamily: "Proxima Nova, sans-serif",
              },
            }}
          >
            {step.label}
          </StepLabel>
          <StepContent
            TransitionComponent={
              index === 0
                ? NonCollapsingTransition
                : index === 1 && uploadStatus === "Success"
                ? NonCollapsingTransition
                : Collapse
            }
          >
            {index === 0 ? (
              <div>
                  <input
                  id="fileInput"
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx"
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                  />
                {uploadStatus !== "Success" && (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    style={{
                      width: "825px",
                      height: "275px",
                      border: dragOver ? "2px #B6CDD9" : "2px dashed #B6CDD9",
                      padding: "20px",
                      textAlign: "center",
                      borderRadius: "4px",
                      backgroundColor: dragOver ? "#B6CDD9" : "#fafafa",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "16px",
                      marginLeft: "25px",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={BulkUploaderIcon}
                        alt="BulkUploaderIcon"
                        className="w-18 h-18"
                      />
                    </div>
                    <Typography
                      sx={{
                        fontFamily: "DM Sans",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "16px",
                        letterSpacing: "0px",
                        textAlign: "center",
                        color: "#333333",
                      }}
                    >
                      Drag and Drop <br /> or
                    </Typography>
                    <CustomButton
                      text="Browse"
                      variant="primary"
                      iconImg={Dragicon}
                      endIcon={false}
                      onClick={() => fileInputRef.current?.click()}
                    />
         

                    {uploadStatus && (
                      <Typography
                        sx={{
                          color: uploadStatus.includes("Error")
                            ? "#D32F2F"
                            : uploadStatus === "Success"
                            ? "#14AE5C"
                            : "#1976D2",
                          fontWeight: 500,
                          fontSize: "14px",
                        }}
                      >
                        {uploadStatus}
                      </Typography>
                    )}
                    <div className="flex items-center mt-2">
                      <InfoIcon
                        className="w-4 h-4 scale-y-[-1]"
                        fontSize="small"
                        sx={{
                          color: "var(--Primary-P300, #009CDC)",
                          marginTop: "3.6px",
                        }}
                      />
                      <p className="font-proxima font-normal text-[13px] text-gray-400 ml-2">
                        Make sure you mapped all data exactly same as the template
                        provided
                      </p>
                    </div>
                  </div>
                )}
                {uploadedFile && (
                  <Box
                    key={uploadedFile.name}
                    sx={{
                      width: 826,
                      height: 76,
                      border: "1px solid #E0E0E0",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px",
                      marginLeft: "25px",
                      marginTop: "16px",
                      position: "relative",
                      zIndex: 9999,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={BulkSaveIcon}
                        alt="BulkSaveIcon"
                        className="w-10 h-10"
                      />
                      <div>
                        <p
                          className="font-bold text-base leading-[140%] tracking-[0] text-[#17222B]"
                          style={{ fontFamily: "Proxima Nova, sans-serif" }}
                        >
                          {uploadedFile.name}
                        </p>
                        <p
                          className="font-normal text-sm leading-[140%] tracking-[0] text-[#B0BEC5]"
                          style={{ fontFamily: "Proxima Nova, sans-serif" }}
                        >
                          {uploadedFile.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <CustomButton
                        text="Preview"
                        variant="secondary"
                        iconImg={BulkPreviewIcon}
                        endIcon={false}
                        startIcon={true}
                        onClick={handlePreview}
                      />
                     <CustomButton
                        showText={false}
                        variant="icon"
                        iconImg={BulkRefreshIcon}
                        endIcon={false}
                        startIcon={true}
                        onClick={handleReupload}
                        />
                      <CustomButton
                        showText={false}
                        variant="icon"
                        iconImg={BulkTrashIcon}
                        endIcon={false}
                        startIcon={true}
                        onClick={handleDelete}
                        sx={{ border: '1px solid red', borderRadius: '12px' }}                      />
                    </div>
                  </Box>
                )}
              </div>
            ) : typeof step.content === "string" ? (
              <Typography>{step.content}</Typography>
            ) : (
              step.content
            )}
            {index === 1 && (
              <Box sx={{ ml: 3 }}>
                <Box
                  sx={{
                    width: "503px",
                    height: "452px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    overflowY: "auto",
                    background: "#FFFFFF",
                    border: "1px solid #E0E0E0",
                    borderRadius: "12px",
                    padding: "16px",
                  }}
                >
                  {checkboxData.map((checkbox, idx) => (
                    <CustomCheckboxField
                      key={checkbox.id}
                      name={checkbox.name}
                      label={checkbox.label}
                      checked={checkbox.value}
                      onChange={handleCheckboxChange(idx)}
                      disabled={!isCheckboxEditable || checkbox.disabled}
                    />
                  ))}
                </Box>
                <Box sx={{ gridColumn: "1 / -1", mt: 2 }}>
                  {isCheckboxEditable ? (
                    <CustomButton
                      text="Continue"
                      variant="primary"
                      onClick={() => toggleCheckboxEditable(false, 2)}
                      endIcon={false}
                      startIcon={false}
                    />
                  ) : (
                    <CustomButton
                      text="Edit"
                      variant="secondary"
                      onClick={() => toggleCheckboxEditable(true, 1)}
                      endIcon={false}
                      startIcon={true}
                      iconImg={BulkEditIcon}
                    />
                  )}
                </Box>
              </Box>
            )}
            {index === 2 && (
              <Box sx={{ ml: 2 }}>
                <Box
                  sx={{
                    width: "826px",
                    height: "97px",
                    borderRadius: "12px",
                    border: "1px solid #CBDBE4",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "start",
                    padding: "18px 24px",
                    mt: 1,
                    mb: 2,
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <p
                      className="font-bold text-base leading-[140%] tracking-[0] text-[#14AE5C]"
                      style={{ fontFamily: "Proxima Nova, sans-serif" }}
                    >
                      No errors or duplicates found
                    </p>
                    <p
                      className="font-bold text-[19px] leading-[140%] tracking-[0] text-[#17222B]"
                      style={{ fontFamily: "Proxima Nova, sans-serif" }}
                    >
                      305 leads in queue
                    </p>
                  </div>
                </Box>
                <CustomButton
                  text="Finish Uploading"
                  variant="primary"
                  onClick={handleFinish}
                  endIcon={false}
                  startIcon={false}
                />
              </Box>
            )}
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

export default BulkStepper;