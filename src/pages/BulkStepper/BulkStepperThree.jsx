import React from "react";
import { Box } from "@mui/material";
import { CustomButton } from "react-mui-tailwind";

const BulkStepperThree = ({ handleFinish }) => {
  return (
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
  );
};

export default BulkStepperThree;