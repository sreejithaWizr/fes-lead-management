import React, { useRef, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';

const OtpInput = ({
  hasLabel = true,
  showAsterisk = true,
  label = '',
  length = 6,
  value = '',
  onChange,
  error = false,
  helperText = '',
  disabled = false,
  hasError = '',
}) => {
  const inputRefs = useRef([]);

  const otpValues = value
    .split('')
    .concat(Array(length - value.length).fill(''))
    .slice(0, length);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) return;

    const newOtp = otpValues.map((v, i) => (i === index ? val[0] : v)).join('');
    onChange(newOtp);

    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otpValues[index]) {
        const newOtp = otpValues.map((v, i) => (i === index ? '' : v)).join('');
        onChange(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <Box>
        {hasLabel && (
        <Typography
          variant="body1"
          sx={{
            width: "auto",
            height: "auto",
            color: "#737373",
            fontFamily: "Proxima Nova, sans-serif",
            fontWeight: 700,
            fontSize: "11px",
            lineHeight: "140%",
            marginBottom: "4px",
          }}
        >
          {label} {showAsterisk && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )}

    <Box display="flex" gap="25px">
      {otpValues.map((val, i) => (
        <TextField
          key={i}
          inputRef={(el) => (inputRefs.current[i] = el)}
          value={val}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          inputProps={{
            maxLength: 1,
            inputMode: 'numeric',
            style: {
              textAlign: 'center',
              fontSize: '16px',
              padding: '8px 12px',
              height: '40px',
              width: '40px',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              padding: 0,
              height: '40px',
              width: '40px',
            },
          }}
          error={error}

          disabled={disabled}
        />
      ))}
    </Box>
                {helperText && (
                <Typography
                sx={{
                marginTop:'5px',
                fontFamily: 'Proxima Nova, sans-serif',
                fontWeight: 400,
                fontSize: '11px',
                color: '#111827', // Tailwind's text-neutral-900
                }}
                >
                {helperText}
                </Typography>
                )}

            {hasError && (
            <Typography variant="caption" sx={{ color: "#EC221F" }}>
            {error}
            </Typography>
            )}

      </Box>
  );
};

export default OtpInput;
