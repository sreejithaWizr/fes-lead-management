import React from "react";
import { Box, Typography } from "@mui/material";
import { CustomButton } from "react-mui-tailwind";
import BulkTemplateIcon from "../../assets/bulk-template-icon.svg";

const BulkPopup = ({ popupType, onClose, onDownloadTemplate }) => {
  const popupContent = {
    notExcel: {
      title: "Unsupported File Format",
      message: "This file is not supported. Please upload an Excel file format.",
      buttons: [
        {
          text: "Close",
          variant: "secondary",
          onClick: onClose,
          startIcon:false,
          endIcon: false,
        },
      ],
    },
    differentTemplate: {
      title: "Template Mismatch",
      message: "This file content is not matching with our system. Try downloading our template.",
      buttons: [
        {
          text: "Download Template",
          variant: "primary",
          onClick: onDownloadTemplate,
          iconImg: BulkTemplateIcon,
          startIcon: false,
          endIcon: false,
        },
        {
          text: "Close",
          variant: "secondary",
          onClick: onClose,
          startIcon: false,
          endIcon: false,
        },
      ],
    },
     onFinish: {
      title: "Upload Processing",
      message: "Your upload is processing in the background. We’ll notify you once completed.",
      buttons: [
        {
          text: "Continue",
          variant: "primary",
          onClick: onClose,
          startIcon: false,
          endIcon: false,
        },
      ],
    },
  };

  const { title, message, buttons } = popupContent[popupType] || {};

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
          {buttons.map((button, index) => (
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