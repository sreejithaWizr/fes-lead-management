import React, { useState } from 'react';
import { CustomSearch, CustomDropDown, CustomCheckboxField } from "react-mui-tailwind";
import { useSelector } from 'react-redux';

const dropdownOptions = ["is", "is not", "is empty", "is not empty", "contains"];

const FilterContent = ({ onClose }) => {
  const { columns } = useSelector((state) => state.leads);
  const [activeFilters, setActiveFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleCheckboxChange = (columnId) => {
    setActiveFilters((prev) => {
      const updatedFilters = { ...prev };
      if (columnId in updatedFilters) {
        delete updatedFilters[columnId];
      } else {
        updatedFilters[columnId] = '';
      }
      return updatedFilters;
    });
  };
  
  const isChecked = (columnId) => columnId in activeFilters;
  

  const handleDropdownChange = (columnId, event) => {
    const value = event.target.value;
    setActiveFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }));
  };

  // const isChecked = (columnId) => activeFilters[columnId] !== null && activeFilters[columnId] !== undefined;

  const filteredColumns = columns.filter(
    (col) =>
      col.isFilter &&
      col.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 overflow-hidden">
      <CustomSearch
        placeHolder="Search Filter"
        width="549px"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        <h3 className="text-sm font-semibold mb-2">Filters</h3>
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
          {filteredColumns.map((col) => (
            <div key={col.id}>
              <CustomCheckboxField
                label={col.label}
                checked={isChecked(col.id)}
                onChange={() => handleCheckboxChange(col.id)}
              />

              {isChecked(col.id) && (
                <div className="flex gap-4 mt-2">
                  <CustomDropDown
                    options={dropdownOptions}
                    placeHolder="Select"
                    onChange={(e) => handleDropdownChange(col.id, e)}
                  />
                  <CustomDropDown
                    options={["Option 1", "Option 2", "Option 3"]}
                    placeHolder="Select"
                    onChange={(e) => handleDropdownChange(col.id, e)}
                  />
                </div>
              )}
            </div>
          ))}

          {filteredColumns.length === 0 && (
            <p className="text-sm text-gray-500">No matching filters found.</p>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <button
          onClick={() => {
            setActiveFilters({});
            setSearchTerm('');
            onClose();
          }}
          className="text-gray-500 text-sm"
        >
          Clear all
        </button>
        <button className="bg-primary text-white px-4 py-2 rounded text-sm">
          Apply Filter
        </button>
      </div>
    </div>
  );
};


export default FilterContent;
