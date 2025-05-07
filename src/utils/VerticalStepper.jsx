import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  StepConnector,
  styled,
  Box
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import BulkUploaderIcon from "../assets/bulk-uploader-icon.svg";
import Dragicon from "../assets/Dragicon.svg";

import { CustomButton, CustomCheckboxField } from "react-mui-tailwind";

// const DashedConnector = styled(StepConnector)(() => ({
//   "&.MuiStepConnector-root": {
//     marginLeft: 11,
//   },
//   "& .MuiStepConnector-line": {
//     borderLeft: "2px dashed #009CDC", // Blue dashed line
//     minHeight: 32,

//   },
// }));



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
        marginLeft: "-7px"
      }}
    >
      {icon}
    </div>
  );
};


const VerticalStepper = ({ steps, activeStep, setActiveStep, onFinish }) => {

  const initialCheckboxes = [
    { id: 1, label: "Created On", name: "Created On", value: true },
    { id: 2, label: "Preferred Study Destination", name: "Preferred Study Destination", value: true, disabled: true },
    { id: 3, label: "First Name", name: "First Name", value: true, disabled: true },
    { id: 4, label: "Source 1", name: "Source 1", value: true, disabled: true },
    { id: 5, label: "Last Name", name: "Last Name", value: true, disabled: true },
    { id: 6, label: "Source 2", name: "Source 2", value: true },
    { id: 7, label: "Email", name: "Email", value: true, disabled: true },
    { id: 8, label: "Source 3", name: "Source 3", value: true },
    { id: 9, label: "Mobile Number", name: "Mobile Number", value: true, disabled: true },
    { id: 10, label: "Source 4", name: "Source 4", value: true },
    { id: 11, label: "Highest Qualification", name: "Highest Qualification", value: true },
    { id: 12, label: "Branch", name: "Branch", value: true },
    { id: 13, label: "Graduation year", name: "Graduation year", value: true },
    { id: 14, label: "Telecaller", name: "Telecaller", value: true },
    { id: 15, label: "Field of Study", name: "Field of Study", value: true },
    { id: 16, label: "Counsellor", name: "Counsellor", value: true },
    { id: 17, label: "Intake Year", name: "Intake Year", value: true },
    { id: 18, label: "Import leads Yes", name: "Import leads Yes", value: true },
    { id: 19, label: "Intake Month", name: "Intake Month", value: true },
    { id: 20, label: "Lead Owner", name: "Lead Owner", value: true },
  ];


  const [checkboxData, setCheckboxData] = useState(initialCheckboxes);
  const [isCheckboxEditable, setIsCheckboxEditable] = useState(true);


  const [dragOver, setDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      onFinish?.();
    }
  };

  const handleCheckboxChange = (index) => (event) => {
    const updated = [...checkboxData];
    updated[index].value = event.target.checked;
    setCheckboxData(updated);
    console.log("Updated checkbox data:", updated);
  };
  console.log('checkboxData', checkboxData)

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file) => {
    const isXlsx = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const isValidSize = file.size <= 5 * 1024 * 1024; // 5 MB
  
    if (!isXlsx) {
      setUploadStatus("Error: Only .xlsx files are allowed.");
      return;
    }
  
    if (!isValidSize) {
      setUploadStatus("Error: File size must be 5MB or less.");
      return;
    }
  
    setUploadStatus("Uploading...");
    setTimeout(() => {
      setUploadStatus("Success");
      handleNext();
    }, 1000);
  };
  

  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel StepIconComponent={CustomStepIcon}
            sx={{
              "& .MuiStepLabel-label": {
                fontSize: "19px",
                fontWeight: 700,
                lineHeight: "140%",
                fontFamily: 'Proxima Nova, sans-serif',
                color: "#B0BEC5", // default color // Active: dark, Inactive: light
              },
              "& .MuiStepLabel-label.Mui-active": {
                color: "#17222B", // override active color
                fontWeight: 700,
              },
            }}>{step.label}</StepLabel>
          <StepContent>
            {index === 0 ? (
              <div>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  style={{
                    width: "825px",
                    height: "275px",
                    border: dragOver
                      ? "2px  #B6CDD9"
                      : "2px dashed #B6CDD9",
                    padding: "20px",
                    textAlign: "center",
                    borderRadius: "4px",
                    backgroundColor: dragOver ? "#B6CDD9" : "#fafafa",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    marginLeft: "25px" // 
                  }}
                >
                  <div className="flex items-center gap-2">
                    <img src={BulkUploaderIcon} alt="BulkUploaderIcon" className="w-18 h-18" />
                  </div>
                  <Typography
                    sx={{
                      fontFamily: "DM Sans",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "16px",
                      letterSpacing: "0px",
                      textAlign: "center",
                      color: '#333333',

                    }}
                  >
                    Drag and Drop <br /> or
                  </Typography>
                  <CustomButton
                    text="Browse"
                    variant="primary"
                    iconImg={Dragicon}
                    endIcon={false}
                    onClick={() =>
                      document.getElementById("fileInput").click()
                    }
                  />
                  <input
                    id="fileInput"
                    type="file"
                    accept=".xlsx"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                    />

                      {uploadStatus && (
                      <Typography
                      sx={{
                      color:
                      uploadStatus.includes("Error") ? "#D32F2F" : uploadStatus === "Success" ? "#14AE5C" : "#1976D2",
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
                        color: "#17222B",
                        color: "var(--Primary-P300, #009CDC)",
                        marginTop: "3.6px" // Adjusted for mt-0.9 (approx 3.6px)
                      }}
                    />
                    <p className="font-proxima font-normal text-[13px] text-gray-400 ml-2">
                      Make sure you mapped all data exactly same as the template provided
                    </p>
                  </div>
                </div>
              </div>
            ) : typeof step.content === "string" ? (
              <Typography>{step.content}</Typography>
            ) : (
              step.content
            )}
            {index === 1 && (
              <Box
                sx={{
                  ml: 3,
                }}>
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
                      onClick={() => {
                        setIsCheckboxEditable(false); // Lock checkboxes
                        setActiveStep(2); // Move to Step 3
                      }}
                      endIcon={false}
                      startIcon={false}
                    />
                  ) : (
                    <CustomButton
                      text="Edit"
                      variant="secondary"
                      onClick={() => {
                        setIsCheckboxEditable(true); // Make editable again
                        setActiveStep(1); // Move back to Step 2 (optional visual cue)
                      }}
                      endIcon={false}
                      startIcon={false}
                    />
                  )}
                </Box>
              </Box>
            )}
            {index === 2 && (
              <Box
                sx={{
                  ml: 2,
                }}>
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
              style={{ fontFamily: 'Proxima Nova, sans-serif' }}
              >
              No errors or duplicates found
              </p>
              <p
              className="font-bold text-[19px] leading-[140%] tracking-[0] text-[#17222B]"
              style={{ fontFamily: 'Proxima Nova, sans-serif' }}
              >
              305 leads in queue
              </p>
              </div>



                </Box>
                <CustomButton
                  text="Finish Uploading"
                  variant="primary"
                  onClick={() => {
                    // Replace with actual navigate hook
                    navigate("/leads");
                  }}
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

export default VerticalStepper;