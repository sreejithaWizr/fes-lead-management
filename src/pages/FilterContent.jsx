import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useSelector } from 'react-redux';
import { CustomSearch, CustomDropDown, CustomCheckboxField } from 'react-mui-tailwind';
import CustomDropdownComponent from './CustomDropdown';
import axios from 'axios'; // Assuming you're using axios for API calls
import CustomAutocompleteDropdown from './CustomDropdown';
import CustomDropdowns from './CustomDropdown';

const dropdownOptions = ['is', 'is not', 'is empty', 'is not empty', 'contains'];
const defaultValueOptions = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' },
  { id: 4, name: 'Option 4' },
  { id: 5, name: 'Option 5' },
  { id: 6, name: 'Option 6' },
  { id: 7, name: 'Option 7' },
  { id: 8, name: 'Option 8' },
];

// Transform filters for API
const transformFilters = (filters) => {
  return Object.entries(filters).map(([field, { condition, value }]) => ({
    field,
    operator: condition,
    value: Array.isArray(value) ? value : [value],
  }));
};

const FilterContent = ({ onClose, onApplyFilter, initialFilters = {} }) => {
  const { columns } = useSelector((state) => state.leads);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredColumns = columns.filter(
    (col) =>
      col.isFilter &&
      col.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to make API call
  const applyFiltersToAPI = async (transformedFilters) => {
    try {
      const response = await axios.post('/api/filters', { filters: transformedFilters });
      console.log('API Response:', response.data);
      // Optionally handle response data if needed
    } catch (error) {
      console.error('Error applying filters:', error);
      // Optionally show error to user
    }
  };

  return (
    <Formik
      initialValues={{ filters: initialFilters }}
      enableReinitialize={true}
      onSubmit={async (values) => {
        const transformed = transformFilters(values.filters);
        console.log('🚀 Transformed Filters:', transformed, values);
        // await applyFiltersToAPI(transformed); // Make API call
        onApplyFilter(transformed); // Pass to parent
        onClose(); // Close modal or drawer
      }}
    >
      {({ values, setFieldValue, resetForm }) => {
        const handleCheckboxToggle = (colId) => {
          const filters = { ...values.filters };
          if (filters[colId]) {
            delete filters[colId];
          } else {
            filters[colId] = { condition: '', value: [] }; // Initialize with empty array for multi-select
          }
          setFieldValue('filters', filters);
        };

        const handleConditionChange = (colId, event) => {
          const condition = event.target.value;
          setFieldValue(`filters.${colId}.condition`, condition);
        };

        const handleMultiSelectChange = (colId, selectedValues) => {
          const valuesArray = selectedValues?.target?.value ?? [];
          console.log("✅ Real selected array:", valuesArray);
          setFieldValue(`filters.${colId}.value`, valuesArray);
        };
        

        console.log('Formik values:', values);

        return (
          <Form className="space-y-6 overflow-hidden">
            <CustomSearch
              placeHolder="Search Filter"
              width="549px"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div>
              <h3 className="text-sm font-semibold mb-2">Filters</h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {filteredColumns.map((col) => {
                  const isChecked = values.filters[col.id] !== undefined;
                  return (
                    <div key={col.id}>
                      <CustomCheckboxField
                        label={col.label}
                        checked={isChecked}
                        onChange={() => handleCheckboxToggle(col.id)}
                      />

                      {isChecked && (
                        <div className="flex gap-4 mt-2">
                          <CustomDropDown
                            options={dropdownOptions}
                            placeHolder="Select condition"
                            value={values.filters[col.id]?.condition || ''}
                            onChange={(e) => handleConditionChange(col.id, e)}
                          />
                  {/* {console.log("Dropdown value for col", col.id, values.filters[col.id]?.value)} */}

                          <CustomDropdowns
                            options={defaultValueOptions}
                            value={
                            defaultValueOptions.filter((opt) =>
                            (values.filters[col.id]?.value || []).some((v) =>
                              typeof v === 'object' ? v.id === opt.id : v === opt.id
                            )
                            )
                            }
                            onChange={(selected) => handleMultiSelectChange(col.id, selected)}
                            placeHolder="Select options..."
                            name={`filters.${col.id}.value`}
                            multiple={true}
                            width="200px"
                            />

                        </div>
                      )}
                    </div>
                  );
                })}

                {filteredColumns.length === 0 && (
                  <p className="text-sm text-gray-500">No matching filters found.</p>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  resetForm(); // Reset form values
                  setSearchTerm(''); // Reset search input
                  onApplyFilter([]); // Clear applied filters in parent
                  onClose(); // Close the modal/drawer
                }}
                className="text-gray-500 text-sm"
              >
                Clear all
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded text-sm"
              >
                Apply Filter
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FilterContent;