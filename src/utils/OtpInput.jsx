import React, { useRef, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';

const OtpInput = ({
  hasLabel = true,
  showAsterisk = true,
  label = '',
  length = 6,
  value = '',
  onChange,
  error = false, // This is a boolean indicating if there's an error
  helperText = '',
  disabled = false,
  hasError = false, // This is the error message string
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

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    
    if (!pasteData) return;
  
    const pasteArray = pasteData.split('');
    const newOtp = otpValues.map((v, i) => pasteArray[i] || v);
    onChange(newOtp.join(''));
  
    // Focus the last filled input
    const nextFocusIndex = pasteArray.length >= length ? length - 1 : pasteArray.length;
    inputRefs.current[nextFocusIndex]?.focus();
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
            width: 'auto',
            height: 'auto',
            color: '#737373',
            fontFamily: 'Proxima Nova, sans-serif',
            fontWeight: 700,
            fontSize: '11px',
            lineHeight: '140%',
            marginBottom: '4px',
          }}
        >
          {label} {showAsterisk && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}

      <Box display="flex" gap="25px">
        {otpValues.map((val, i) => (
          <TextField
            key={i}
            inputRef={(el) => (inputRefs.current[i] = el)}
            value={val}
            onChange={(e) => handleChange(e, i)}
            onPaste={handlePaste}
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
            error={error} // Red border when error is true
            disabled={disabled}
          />
        ))}
      </Box>

      {helperText && (
        <Typography
          sx={{
            marginTop: '5px',
            fontFamily: 'Proxima Nova, sans-serif',
            fontWeight: 400,
            fontSize: '11px',
            color: '#111827',
          }}
        >
          {helperText}
        </Typography>
      )}

      {hasError && error && (
        <Typography
          variant="caption"
          sx={{
            color: '#EC221F',
            fontFamily: 'Proxima Nova, sans-serif',
            fontSize: '11px',
            marginTop: '4px',
          }}
        >
          {hasError} {/* Display the error message */}
        </Typography>
      )}
    </Box>
  );
};

export default OtpInput;