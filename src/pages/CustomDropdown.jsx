import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import ArrowIconActive from "../assets/arrow-circle-down-active.svg";

const CustomDropdownComponent = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  multiple = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null); // Create a ref for the dropdown container

  const normalizedValue = Array.isArray(value) ? value : []; // Force value as array

  const filteredOptions = options.filter(
    (option) =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !normalizedValue.some((item) => item.id === option.id)
  );

  const handleSelect = (option) => {
    if (multiple) {
      onChange([...normalizedValue, option]);
    } else {
      onChange([option]);
      setIsOpen(false); // Close dropdown for single-select
    }
    setSearchTerm("");
  };

  const handleDelete = (option) => {
    onChange(normalizedValue.filter((item) => item.id !== option.id));
  };

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if click is outside
      }
    };

    // Add event listener to document
    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); // Empty dependency array to run only on mount/unmount

  return (
    <div className="relative w-full" ref={dropdownRef}> {/* Attach ref to container */}
      <div
        className="flex flex-wrap items-center w-full border border-gray-300 rounded-lg px-3 py-2 min-h-10 gap-1 cursor-text"
        onClick={() => setIsOpen(true)}
      >
        {multiple ? (
          normalizedValue.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-blue-100 rounded-full px-3 py-1 text-sm m-1"
            >
              {item.name}
              <button
                type="button"
                onClick={() => handleDelete(item)}
                className="ml-1"
              >
                <span className="text-gray-500 hover:text-gray-700">×</span>
              </button>
            </div>
          ))
        ) : (
          normalizedValue[0] && (
            <div className="text-sm text-gray-800">
              {normalizedValue[0].name}
            </div>
          )
        )}

        {(multiple || normalizedValue.length === 0) && (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={normalizedValue.length === 0 ? placeholder : ""}
            className="flex-grow border-none outline-none text-sm min-w-[60px]"
            onFocus={() => setIsOpen(true)}
          />
        )}

        <div className="ml-auto cursor-pointer">
          <img
            src={ArrowIconActive}
            alt="Dropdown Arrow"
            className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-50 max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSelect(option)}
                className="px-3 py-2.5 text-sm cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="px-3 py-2.5 text-sm text-gray-500">
              No options found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDropdownComponent;