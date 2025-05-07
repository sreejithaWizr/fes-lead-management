import React, { useState, useEffect, useRef } from "react";
import ArrowIconActive from "../assets/arrow-circle-down-active.svg";
import ChipCloseIcon from "../assets/chip-close-circle.svg";

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
                className={`flex flex-column items-center flex-wrap w-full min-h-[33px] h-[100%] rounded-[12px] px-3 gap-1 cursor-text 
                    border ${isOpen || normalizedValue.length > 0 ? "border-[#1A2731]" : "border-[#CBDBE4]"} 
                    hover:border-[#A6ADB3] focus-within:border-[#1A2731]`}
                onClick={() => setIsOpen(true)}
            >
                <div className="flex flex-wrap">
                    {multiple ? (
                        normalizedValue.map((item, index) => {
                            const name = typeof item === "string" ? item : item?.name;
                            const id = typeof item === "string" ? item : item?.id;

                            return (
                                <div
                                    key={id || index}
                                    className="flex items-center justify-center rounded-full px-3 py-1 text-sm m-1"
                                    style={{
                                        width: "auto",
                                        height: "22px",
                                        paddingTop: "Space/300",
                                        paddingRight: "Space/400",
                                        paddingBottom: "Space/300",
                                        paddingLeft: "Space/400",
                                        gap: "8px",
                                        borderRadius: "Corner/Full",
                                        border: "1px solid var(--Secondary-S75, #CBDBE4)",
                                        backdropFilter: "blur(30px)",
                                        boxShadow: "0px 8px 10px 0px #7171AE0D"
                                    }}
                                >
                                    {name}
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(item)}
                                        className="ml-1"
                                    >
                                        <img
                                            src={ChipCloseIcon}
                                            alt="close"
                                        />
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
                            className="flex-grow border-none outline-none min-w-[60px] text-[16px] placeholder-[#818B94]"
                            onFocus={() => setIsOpen(true)}
                        />
                    )}
                </div>

                <div className="ml-auto cursor-pointer flex items-center justify-center">
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
