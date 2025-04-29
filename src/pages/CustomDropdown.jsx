import { useState } from "react";
import {
  Autocomplete,
  TextField,
  Chip,
  FormHelperText,
} from "@mui/material";
import ArrowIconActive from "../assets/arrow-circle-down-active.svg";
import ArrowIconDisable from "../assets/arrow-circle-down-disable.svg";
import CloseCircle from "../assets/close-circle.svg";

const CustomDropdown = ({
  label,
  options,
  errorMessage,
  disabled,
  required,
  value = "",
  multiple = false,
  onChange,
  placeHolder,
  name,
  width = "200px",
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (_, newValue) => {
    const selectedValue = multiple
      ? newValue.map((val) =>
          typeof val === "string" ? { name: val } : val
        )
      : typeof newValue === "string"
      ? { name: newValue }
      : newValue;

    onChange?.({
      target: {
        name,
        value: selectedValue,
      },
    });
  };

  const handleDelete = (itemToDelete) => () => {
    if (disabled) return;
    const newValue = value.filter(
      (item) => (item?.name || item) !== (itemToDelete?.name || itemToDelete)
    );
    onChange?.({
      target: {
        name,
        value: newValue,
      },
    });
  };

  return (
    <div style={{ width }}>
      {label && (
        <label
          style={{
            fontFamily: "Proxima Nova, sans-serif",
            fontWeight: 700,
            fontSize: "11px",
            color: disabled ? "#9CA3AF" : "#737373",
            marginBottom: "4px",
            display: "block",
          }}
        >
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}

      <Autocomplete
        multiple={multiple}
        disabled={disabled}
        options={options || []}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option?.name || ""
        }
        value={value || (multiple ? [] : null)}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
        isOptionEqualToValue={(opt, val) =>
          (opt?.name || opt) === (val?.name || val)
        }
        popupIcon={
          <img
            src={disabled ? ArrowIconDisable : ArrowIconActive}
            alt="Dropdown Icon"
            style={{ width: 14, height: 14 }}
          />
        }
        clearIcon={null}
        renderTags={(tagValue, getTagProps) => {
          if (multiple) {
            return (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 4,
                  maxHeight: "108px",
                  overflowY: "auto",
                  width: "120%",
                  marginRight: "-32px",
                }}
              >
                {tagValue.map((item, index) => (
                  <Chip
                    key={item?.name || item}
                    label={item?.name || item}
                    onDelete={disabled ? undefined : handleDelete(item)}
                    deleteIcon={
                      <img
                        src={CloseCircle}
                        alt="Close"
                        style={{ width: 16, height: 16 }}
                      />
                    }
                    onMouseDown={(event) => event.stopPropagation()}
                    sx={{
                      height: 32,
                      border: "1px solid #CBDBE4",
                      backgroundColor: "#FFFFFF",
                      color: "#17222B",
                      "& .MuiChip-deleteIcon": {
                        display: disabled ? "none" : "block",
                      },
                    }}
                  />
                ))}
              </div>
            );
          }
          return tagValue.map((option, index) => (
            <Chip
              key={index}
              label={option?.name || option}
              {...getTagProps({ index })}
              sx={{
                height: 32,
                border: "1px solid #CBDBE4",
                backgroundColor: "#FFFFFF",
                color: "#17222B",
                "& .MuiChip-deleteIcon": {
                  display: disabled ? "none" : "block",
                },
              }}
              deleteIcon={
                <img
                  src={CloseCircle}
                  alt="Close"
                  style={{ width: 16, height: 16 }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />
              }
            />
          ));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeHolder}
            error={Boolean(errorMessage)}
            helperText={errorMessage}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: errorMessage
                  ? "transparent"
                  : disabled
                  ? "#F4F6F8"
                  : "#FFFFFF",
                padding: "3px 6px",
                borderRadius: "8px",
                minHeight: "32px",
                // height: '2.3rem',
                "& fieldset": {
                  borderColor: errorMessage ? "#E53935" : "#CBDBE4",
                  borderWidth: "1px !important",
                },
                "&:hover fieldset": {
                  borderColor: errorMessage
                    ? "#D32F2F"
                    : disabled
                    ? "#CBDBE4"
                    : "#A6ADB3",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errorMessage ? "#D32F2F" : "#1A2731 !important",
                  boxShadow: errorMessage
                    ? "0px 8px 10px rgba(229, 57, 53, 0.1)"
                    : "0px 8px 10px rgba(113, 113, 174, 0.1)",
                },
                "&.Mui-disabled fieldset": {
                  borderColor: "#CBDBE4 !important",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: errorMessage ? "#E53935" : "#CBDBE4",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: errorMessage
                  ? "#D32F2F"
                  : disabled
                  ? "#CBDBE4"
                  : "#A6ADB3",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: errorMessage ? "#D32F2F" : "#1A2731",
                boxShadow: errorMessage
                  ? "0px 8px 10px rgba(229, 57, 53, 0.1)"
                  : "0px 8px 10px rgba(113, 113, 174, 0.1)",
              },
              "& .MuiInputBase-input": {
                fontFamily: "Proxima Nova, sans-serif",
                fontSize: "14px",
              },
              "&.Mui-focused": {
                outline: "none",
              },
            }}
          />
        )}
        ListboxProps={{
          style: {
            maxHeight: "none", // Remove the inner maxHeight restriction
            overflowY: "visible", // Prevent inner scrollbar
          },
        }}
        PaperComponent={(props) => (
          <div
            {...props}
            style={{
              ...props.style,
              maxHeight: 150,
              overflowY: "auto",
              width: width, // Match the component's width
            }}
          />
        )}
      />

      {errorMessage && (
        <FormHelperText
          sx={{
            color: "#E53935",
            backgroundColor: "white",
            minHeight: "29px",
            padding: "6px 0 0 6px",
            fontFamily: "Proxima Nova, sans-serif",
          }}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </div>
  );
};

export default CustomDropdown;