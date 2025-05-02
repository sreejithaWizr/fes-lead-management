import React, { useState, useEffect, useRef } from "react";
import ArrowIconActive from "../assets/arrow-circle-down-active.svg";

const CustomDropdownComponent = ({
    options,
    value,
    onChange,
    placeholder = "Select...",
    multiple = true,
    onSearch
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);

    const normalizedValue = Array.isArray(value) ? value : [];

    const filteredOptions = Array.isArray(options)
        ? options.filter(
              (option) =>
                  option?.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  !normalizedValue.some((item) => {
                      const itemId = typeof item === "string" ? item : item?.id;
                      return itemId === option?.id;
                  })
          )
        : [];

    const handleSelect = (option) => {
        if (multiple) {
            onChange([...normalizedValue, option]);
        } else {
            onChange([option]);
            setIsOpen(false);
        }
        setSearchTerm("");
    };

    const handleDelete = (optionToDelete) => {
        onChange(
            normalizedValue.filter((item) => {
                const itemId = typeof item === "string" ? item : item?.id;
                const deleteId = typeof optionToDelete === "string" ? optionToDelete : optionToDelete?.id;
                return itemId !== deleteId;
            })
        );
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (onSearch) onSearch(term);
    };

    useEffect(() => {
        if (onSearch && searchTerm !== "") {
            onSearch(searchTerm);
        }
    }, [searchTerm]);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                className="flex flex-wrap items-center w-full border border-gray-300 rounded-lg px-3 py-2 min-h-10 gap-1 cursor-text"
                onClick={() => setIsOpen(true)}
            >
                {multiple ? (
                    normalizedValue.map((item, index) => {
                        const name = typeof item === "string" ? item : item?.name;
                        const id = typeof item === "string" ? item : item?.id;

                        return (
                            <div
                                key={id || index}
                                className="flex items-center bg-blue-100 rounded-full px-3 py-1 text-sm m-1"
                            >
                                {name}
                                <button
                                    type="button"
                                    onClick={() => handleDelete(item)}
                                    className="ml-1"
                                >
                                    <span className="text-gray-500 hover:text-gray-700">×</span>
                                </button>
                            </div>
                        );
                    })
                ) : (
                    normalizedValue[0] && (
                        <div className="text-sm text-gray-800">
                            {typeof normalizedValue[0] === "string"
                                ? normalizedValue[0]
                                : normalizedValue[0]?.name}
                        </div>
                    )
                )}

                {(multiple || normalizedValue.length === 0) && (
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
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
                        <div className="px-3 py-2.5 text-sm text-gray-500">No options found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomDropdownComponent;
