import React from "react";
import { Typography, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import BulkUploaderIcon from "../../assets/bulk-uploader-icon.svg";
import Dragicon from "../../assets/Dragicon.svg";
import BulkSaveIcon from "../../assets/BulkSaveIcon.svg";
import BulkPreviewIcon from "../../assets/bulk-preview-icon.svg";
import BulkRefreshIcon from "../../assets/bulk-refresh-icon.svg";
import BulkTrashIcon from "../../assets/bulk-trash-icon.svg";
import { CustomButton } from "react-mui-tailwind";
import { formatBytes } from "../../utils/commonFunction";
import BulkPopup from "./BulkPopup";

const BulkStepperOne = ({
  dragOver,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileSelect,
  uploadStatus,
  file,
  handlePreview,
  handleReupload,
  handleDelete,
  fileInputRef,
  errorType,
  handleClosePopup,
  handleDownloadTemplate,
}) => {
  const uploadedFile =
    uploadStatus === "Success" && file
      ? { name: file.name, size: formatBytes(file.size) }
      : null;

  return (
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
              Make sure you mapped all data exactly same as the template provided
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
            marginLeft: "24px",
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
            {/* <CustomButton
              text="Preview"
              variant="secondary"
              iconImg={BulkPreviewIcon}
              endIcon={false}
              startIcon={true}
              onClick={handlePreview}
            /> */}
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
                sx={{
                    border: "1px solid red",
                    borderRadius: "12px",
                     backgroundColor: "transparent",
                    "&:hover": {
                    border: "1px solid red",
                    },
                    }}
            />
          </div>
        </Box>
      )}
      {errorType && (
        <BulkPopup
          errorType={errorType}
          onClose={handleClosePopup}
          onDownloadTemplate={handleDownloadTemplate}
        />
      )}
    </div>
  );
};

export default BulkStepperOne;