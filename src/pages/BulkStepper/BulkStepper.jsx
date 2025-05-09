import React, { useRef } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Collapse,
  StepConnector,
  styled

} from "@mui/material";
import BulkStepperOne from "./BulkStepperOne";
import BulkStepperTwo from "./BulkStepperTwo";
import BulkStepperThree from "./BulkStepperThree";




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

const DashedStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.MuiStepConnector-vertical`]: {
    // marginLeft: 22, // align with custom icon center
  },
  [`& .MuiStepConnector-lineVertical`]: {
    borderLeft: "2px dashed #B6CDD9",
    minHeight: 40,
  },
}));


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
  fileInputRef,
  errorType,
  handleClosePopup,
  handleDownloadTemplate,
}) => {

  return (
    <Stepper activeStep={activeStep} orientation="vertical"
    connector={<DashedStepConnector />}>
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
                color: "#B0BEC5"
              },
              "& .MuiStepLabel-label.Mui-active": {
                color: "#17222B",
                fontWeight: 700,
              },
              "& .MuiStepLabel-label.Mui-completed": {
                color: "#17222B",
                fontWeight: 700,
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
            sx={{
              ml: "12px",
              pl: "20px",
              pr: "8px",
              borderLeft: "none", // remove default
              position: "relative",
              "::before": {
                content: index !== steps.length - 1 ? '""' : "none",
                position: "absolute",
                top: "0", // extend upward
                bottom: 0,
                left: 0,
                borderLeft: "2px dashed #B6CDD9",
                zIndex: 0,
              },
              }}
                    >
            {index === 0 && (
              <BulkStepperOne
                dragOver={dragOver}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDrop={handleDrop}
                handleFileSelect={handleFileSelect}
                uploadStatus={uploadStatus}
                file={file}
                handlePreview={handlePreview}
                handleReupload={handleReupload}
                handleDelete={handleDelete}
                fileInputRef={fileInputRef}
                errorType={errorType}
                handleClosePopup={handleClosePopup}
                handleDownloadTemplate={handleDownloadTemplate}
              />
            )}
            {index === 1 && (
              <BulkStepperTwo
                checkboxData={checkboxData}
                isCheckboxEditable={isCheckboxEditable}
                handleCheckboxChange={handleCheckboxChange}
                toggleCheckboxEditable={toggleCheckboxEditable}
              />
            )}
            {index === 2 && (
              <BulkStepperThree handleFinish={handleFinish} />
            )}
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

export default BulkStepper;