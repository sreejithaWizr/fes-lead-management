import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "react-mui-tailwind";
import BulkTemplateIcon from "../assets/bulk-template-icon.svg";
import VerticalStepper from "../utils/VerticalStepper";

function BulkUpload() {
  const [activeStep, setActiveStep] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isCheckboxEditable, setIsCheckboxEditable] = useState(true);
  const [file, setFile] = useState(null); // State for file data
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  

  const initialCheckboxes = [
    { id: 1, label: "Created On", name: "Created On", value: true },
    {
      id: 2,
      label: "Preferred Study Destination",
      name: "Preferred Study Destination",
      value: true,
      disabled: true,
    },
    {
      id: 3,
      label: "First Name",
      name: "First Name",
      value: true,
      disabled: true,
    },
    {
      id: 4,
      label: "Source 1",
      name: "Source 1",
      value: true,
      disabled: true,
    },
    {
      id: 5,
      label: "Last Name",
      name: "Last Name",
      value: true,
      disabled: true,
    },
    { id: 6, label: "Source 2", name: "Source 2", value: true },
    {
      id: 7,
      label: "Email",
      name: "Email",
      value: true,
      disabled: true,
    },
    { id: 8, label: "Source 3", name: "Source 3", value: true },
    {
      id: 9,
      label: "Mobile Number",
      name: "Mobile Number",
      value: true,
      disabled: true,
    },
    { id: 10, label: "Source 4", name: "Source 4", value: true },
    {
      id: 11,
      label: "Highest Qualification",
      name: "Highest Qualification",
      value: true,
    },
    { id: 12, label: "Branch", name: "Branch", value: true },
    {
      id: 13,
      label: "Graduation year",
      name: "Graduation year",
      value: true,
    },
    { id: 14, label: "Telecaller", name: "Telecaller", value: true },
    {
      id: 15,
      label: "Field of Study",
      name: "Field of Study",
      value: true,
    },
    { id: 16, label: "Counsellor", name: "Counsellor", value: true },
    { id: 17, label: "Intake Year", name: "Intake Year", value: true },
    {
      id: 18,
      label: "Import leads Yes",
      name: "Import leads Yes",
      value: true,
    },
    { id: 19, label: "Intake Month", name: "Intake Month", value: true },
    { id: 20, label: "Lead Owner", name: "Lead Owner", value: true },
  ];

  const [checkboxData, setCheckboxData] = useState(initialCheckboxes);

  const steps = [
    {
      label: "Upload Excel File to Import Leads",
    },
    {
      label: "Configure which columns to include in the upload",
    },
    {
      label: "Statics of upload",
    },
  ];

  const handleCheckboxChange = (index) => (event) => {
    const updated = [...checkboxData];
    updated[index].value = event.target.checked;
    setCheckboxData(updated);
    console.log("Updated checkbox data:", updated);
  };

  const toggleCheckboxEditable = (editable, step) => {
    setIsCheckboxEditable(editable);
    setActiveStep(step);
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
    // console.log('files', files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };


  const handleFileUpload = (file) => {
    const isXlsx =
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const isValidSize = file.size <= 5 * 1024 * 1024; // 5 MB

    if (!isXlsx) {
      setUploadStatus("Error: Only .xlsx files are allowed.");
      return;
    }

    if (!isValidSize) {
      setUploadStatus("Error: File size must be 5MB or less.");
      return;
    }

     setFile(file); // store the full file object
    setUploadStatus("Uploading...");
    setTimeout(() => {
      setUploadStatus("Success");
      setActiveStep(1);
    }, 1000);
  };

  const handleFinish = () => {
    console.log("Import process complete");
    navigate("/leads");
  };
  const handlePreview = () => {
    console.log("Preview file:", file.name);
    // Optional: parse file and show data preview (via a modal, table, etc.)
  };
  
  const handleReupload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // reset to allow reselecting the same file
      fileInputRef.current.click();
    }
  };
  const handleDelete = () => {
    setFile(null);
    setUploadStatus(null);
  };

  return (
    <div className="flex flex-row justify-around mt-[75px]">
      <div>
        <VerticalStepper
          steps={steps}
          activeStep={activeStep}
          checkboxData={checkboxData}
          isCheckboxEditable={isCheckboxEditable}
          handleCheckboxChange={handleCheckboxChange}
          toggleCheckboxEditable={toggleCheckboxEditable}
          dragOver={dragOver}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          handleFileSelect={handleFileSelect}
          uploadStatus={uploadStatus}
          handleFinish={handleFinish}
          handlePreview={handlePreview}
          handleReupload={handleReupload}
          handleDelete={handleDelete}
          file={file} // Pass File Object
          fileInputRef={fileInputRef}
        />
      </div>
      <div>
        <a href="/Bulk_Upload_Template.xlsx" download>
          <CustomButton
            text="Download template file"
            variant="secondary"
            endIcon={false}
            iconImg={BulkTemplateIcon}
            width="225px"
          />
        </a>
      </div>
    </div>
  );
}

export default BulkUpload;