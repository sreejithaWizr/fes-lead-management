import React from "react";
import { Box } from "@mui/material";
import { CustomButton, CustomCheckboxField } from "react-mui-tailwind";
import BulkEditIcon from "../../assets/edit-icon.svg";

const BulkStepperTwo = ({
  checkboxData,
  isCheckboxEditable,
  handleCheckboxChange,
  toggleCheckboxEditable,
}) => {
  return (
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
  );
};

export default BulkStepperTwo;