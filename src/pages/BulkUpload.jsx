import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBulkCheckBoxData, uploadBulkLeadData, getBulkUploadStatus} from "../api/services/BulkAPI/BulkAPIs"
import BulkStepper from "./Bulk/BulkStepper";
import { validateExcelHeaders, getExcelRowCount } from "./Bulk/BulkUtilis";
// import initialCheckboxes from '../mocks/BulkMocks.json';
import { setJobId, setStatus } from "../store/bulkSlice";
import BulkPopup from "./Bulk/BulkPopup";
import { CircularProgress } from '@mui/material';


function BulkUpload() {
  const [activeStep, setActiveStep] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isCheckboxEditable, setIsCheckboxEditable] = useState(true);
  const [file, setFile] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [checkboxData, setCheckboxData] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [rowCount, setRowCount] = useState(0); // State for row count
  // const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jobId = useSelector((state) => state.bulkUpload.jobId);
  
  const fileInputRef = useRef(null);

  // Fetch checkbox data from API
        useEffect(() => {
        const fetchCheckboxData = async () => {
        try {
        setLoading(true);
        const apiData = await getBulkCheckBoxData(); // Replace {{url}} with actual base URL
        // const apiData = response.data;

        // Map API response to checkbox data format
        const mappedCheckboxes = apiData.map((item) => ({

        id: item.id,
        label: item.displayName,
        fieldName: item.fieldName,
        value: item.isRequired, 
        disabled: item.isDisabled, // Disable if field is required
        }));
        setCheckboxData(mappedCheckboxes);
        // setLoading(false);
        } catch (err) {
        console.error("Failed to fetch checkbox data.");
        // setError("Something went wrong. Please try again later.");
        }
        finally{
        setLoading(false);
        }
        };

        fetchCheckboxData();
        }, []); // Empty dependency array to run once on mount


  const handleCheckboxChange = (index) => (event) => {
    const updated = [...checkboxData];
    updated[index].value = event.target.checked;
    setCheckboxData(updated);
  };

const toggleCheckboxEditable = async (editable, step) => {
  setIsCheckboxEditable(editable);
  if (!editable && step === 2) {
    // When "Continue" is clicked, fetch row count
    try {
      const count = await getExcelRowCount(file, (error) => {
        console.error("Error in getExcelRowCount:", error);
        // Rely on existing error handling (e.g., via setPopupType)
      });
      setRowCount(count); // Store row count in state
      setActiveStep(step); // Proceed to next step
    } catch (error) {
      console.error("Failed to get row count:", error);
      // Rely on existing error handling; proceed to next step
      setActiveStep(step);
    }
  } else {
    setActiveStep(step); // Handle edit mode
  }
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

  const handleFileUpload = async (file) => {
    const isXlsx =
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const isValidSize = file.size <= 5 * 1024 * 1024; // 5 MB

        if (!isXlsx || !isValidSize) {
        setPopupType("notExcel");       
        return;
        }

    try {
      await validateExcelHeaders(file, checkboxData, setPopupType);
      setFile(file);// store the full file object
      setUploadStatus("Uploading...");
      setTimeout(() => {
        setUploadStatus("Success");
        setActiveStep(1);
      }, 1000);
    } catch (error) {
    console.error("File upload failed:", error);
    }
  };



  const handleReupload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
      fileInputRef.current.click();
    }
  };

  const handleDelete = () => {
    setFile(null);
    setUploadStatus(null);
  };
const handleFinish = async () => {
  setLoading(true);
  try {
    const checkboxValues = checkboxData
      .filter((checkbox) => checkbox.value)
      .map((checkbox) => ({
        id: checkbox.id,
        fieldName: checkbox.fieldName,
        isRequired: checkbox.value,
      }));

    const response = await uploadBulkLeadData(file, checkboxValues);
     dispatch(setJobId(response.jobId));
    setPopupType("onFinish");
  } catch (error) {
    setPopupType("genricError");
    console.error("Error in handleFinish:", error.message);
  } finally {
    setLoading(false);
  }
};

  const handleClosePopup = () => {
    setPopupType(null);
  };

const handleComplete = async () => {
    if (popupType === 'onFinish') {
      if (jobId) {
        try {
          const response = await getBulkUploadStatus(jobId);
          const { notificationstatus, message } = response.data[0];
          dispatch(setStatus({ status: notificationstatus, message: message }));
        } catch (error) {
          console.error('Failed to fetch status:', error);
          dispatch(setStatus({ status: 'Error', message: 'Failed to fetch status' }));
        }
      } else {
        console.warn('No jobId found in Redux store');
      }
      navigate('/leads'); // Navigate to /leads after closing the onFinish popup
    }
  };

  const handleDownloadTemplate = () => {
    // Trigger template download
    window.location.href = "/Bulk_Upload_Template.xlsx";
    setPopupType(null);
  };

  // Render loading or error states
  if (loading) {
    return <CircularProgress color="inherit" />;
    // return <div>Loading checkbox data...</div>;
  }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <React.Fragment>
    <div className="flex flex-row justify-center items-center mt-[25px] w-full overflow-x-auto">
      <div className="max-w-full">
        <BulkStepper
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
          handleReupload={handleReupload}
          handleDelete={handleDelete}
          file={file} // Pass File Object
          fileInputRef={fileInputRef}
          handleClosePopup={handleClosePopup}
          handleDownloadTemplate={handleDownloadTemplate}
          setPopupType={setPopupType}
          handleFinish={handleFinish}
          rowCount={rowCount} // Add rowCount prop
        />
      </div>
    </div>
        {popupType && (
        <BulkPopup
          popupType={popupType}
          onClose={handleClosePopup}
          onComplete={handleComplete}
          onDownloadTemplate={handleDownloadTemplate}
        />
      )}
      </React.Fragment>
    
  );
}

export default BulkUpload;