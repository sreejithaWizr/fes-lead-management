import React from "react";
import { Box, Typography } from "@mui/material";
import { CustomButton } from "react-mui-tailwind";
import BulkTemplateIcon from "../../assets/bulk-template-icon.svg";

const commonButtons = {
  close: {
    text: "Close",
    variant: "secondary",
    iconImg: null,
    startIcon: false,
    endIcon: false,
    onClick: (handler) => handler,
  },
  downloadTemplate: {
    text: "Download Template",
    variant: "primary",
    iconImg: BulkTemplateIcon,
    startIcon: false,
    endIcon: false,
    onClick: (handler) => handler,
  },
  continue: {
    text: "Continue",
    variant: "primary",
    iconImg: null,
    startIcon: false,
    endIcon: false,
    onClick: (handler) => handler,
  },
};

const popupContent = {
  notExcel: {
    title: "Unsupported File Format",
    message: "This file is not supported. Please upload an Excel file format, less than 5 MB",
    buttons: ["close"],
  },
  differentTemplate: {
    title: "Template Mismatch",
    message: "This file content is not matching with our system. Try downloading our template.",
    buttons: ["downloadTemplate", "close"],
  },
  EmptySheet: {
    title: "Empty Excel File",
    message: "Excel is Empty. Please upload a file with data or download and use our template.",
    buttons: ["downloadTemplate", "close"],
  },
  fileReadError: {
    title: "File Read Error",
    message: "Unable to read the uploaded file. Please try again.",
    buttons: ["close"],
  },
  genricError: {
    title: "Something Went Wrong",
    message: "Something Went Wrong on file. Please try again.",
    buttons: ["close"],
  },
  exceedsRowLimit: {
    title: "Row Limit Exceeded",
    message:
      "The Excel file exceeds the maximum limit of 5000 records. Please upload a file with 5000 or fewer records.",
    buttons: ["downloadTemplate", "close"],
  },
  onFinish: {
    title: "Upload Processing",
    message: "Your upload is processing in the background. We’ll notify you once completed.",
    buttons: ["continue"],
  },
};

// Error Popup for All Bulk Screen.
const BulkPopup = ({ popupType, onClose, onComplete, onDownloadTemplate }) => {
const { title, message, buttons = [] } = popupContent[popupType] || {
  title: "Unknown Error",
  message: "An unexpected error occurred. Please try again.",
  buttons: ["close"],
};

  const handlerMap = {
    close: onClose,
    downloadTemplate: onDownloadTemplate,
    continue: onComplete,
  };

  const resolvedButtons = buttons.map((key) => {
    const config = commonButtons[key];
    return {
      ...config,
      onClick: config.onClick(handlerMap[key]),
    };
  });

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "24px",
          width: "400px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Proxima Nova, sans-serif",
            fontWeight: 600,
            fontSize: "18px",
            color: "#17222B",
            marginBottom: "12px",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Proxima Nova, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            color: "#333333",
            marginBottom: "24px",
          }}
        >
          {message}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          {resolvedButtons.map((button, index) => (
            <CustomButton
              key={index}
              text={button.text}
              variant={button.variant}
              iconImg={button.iconImg}
              startIcon={button.startIcon}
              endIcon={button.endIcon}
              onClick={button.onClick}
              sx={{ minWidth: "120px" }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BulkPopup;
