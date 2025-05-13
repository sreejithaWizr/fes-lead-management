import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useSelector } from 'react-redux';
import { CustomSearch, CustomDropDown, CustomCheckboxField, CustomDatePicker } from 'react-mui-tailwind';
import CustomDropdownComponent from './CustomDropdown';
import { fetchFieldDropdownValues } from '../api/services/masterAPIs/createLeadApi';

const dropdownOptions = ['is', 'is not', 'is empty', 'is not empty', 'contains'];
// Transform filters for API
const transformFilters = (filters) => {
  return Object.entries(filters).map(([field, { condition, value }]) => ({
    field,
    operator: condition,
    value: Array.isArray(value) ? value : [value],
  }));
};

const FilterContent = ({ onClose, onApplyFilter, initialFilters = {}, isFilterOpen }) => {
  const { columns } = useSelector((state) => state.leads);
  const [dropdownOptionsMap, setDropdownOptionsMap] = useState({});
  const [searchTermMap, setSearchTermMap] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [defaultStartDate, setDefaultStartDate] = useState('');
  const [defaultEndDate, setDefaultEndDate] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  const handleDropdownSearch = async (term, fieldName) => {
    setSearchTermMap((prev) => ({ ...prev, [fieldName]: term }));

    try {
      const { data } = await fetchFieldDropdownValues(term, fieldName);
      setDropdownOptionsMap((prev) => ({
        ...prev,
        [fieldName]: data?.data,
      }));
    } catch (error) {
      console.error("Error fetching dropdown options", error);
    }
  };

  const filteredColumns = columns.filter(
    (col) =>
      col.isFilter &&
      col.label.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <Formik
      initialValues={{ filters: initialFilters }}
      enableReinitialize={true}
      onSubmit={async (values) => {
        const transformed = transformFilters(values.filters);
        // await applyFiltersToAPI(transformed); // Make API call
        onApplyFilter(transformed); // Pass to parent
        onClose(); // Close modal or drawer
      }}
    >
      {({ values, setFieldValue, resetForm }) => {

        useEffect(() => {
          const startDate = values.filters['createdAt']?.value?.[0];
          setIsDisable(!startDate); // Disable if no startDate
        }, [values.filters['createdAt']?.value?.[0]]);

        const handleCheckboxToggle = (colId) => {
          const filters = { ...values.filters };
          if (filters[colId]) {
            delete filters[colId];
          } else {
            filters[colId] = { condition: '', value: [] }; // Initialize with empty array for multi-select
          }
          setFieldValue('filters', filters, initialFilters);
        };

        const handleConditionChange = (colId, event) => {
          const condition = event.target.value;
          setFieldValue(`filters.${colId}.condition`, condition);
        };

        const handleMultiSelectChange = (colId, selectedValues) => {
          setFieldValue(`filters.${colId}.value`, selectedValues);
        };

        useEffect(() => {
          if (isFilterOpen) {
            const fetchInitialOptions = async () => {
              const selectedFields = Object.keys(values.filters || {});

              const fetches = selectedFields.map((field) =>
                fetchFieldDropdownValues("", field)
                  .then((res) => ({ field, options: res.data?.data || [] }))
                  .catch((error) => {
                    console.error(`Error prefetching dropdown for ${field}:`, error);
                    return { field, options: [] };
                  })
              );

              const results = await Promise.allSettled(fetches);

              // Build a new map from all successful results
              const newOptionsMap = {};
              results.forEach((result) => {
                if (result.status === "fulfilled") {
                  const { field, options } = result.value;
                  newOptionsMap[field] = options;
                }
              });

              setDropdownOptionsMap(newOptionsMap);
            };

            fetchInitialOptions();
          }
        }, [isFilterOpen]);



        console.log('Formik values:', values, dropdownOptionsMap, initialFilters);


        return (
          <Form className="space-y-6 overflow-hidden">
            <CustomSearch
              placeHolder="Search Filter"
              width="549px"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update local search term
              onSearch={(term) => {
                // Optional: You could debounce/filter API call or local list here
                setSearchTerm(term); // This also ensures state is in sync
              }}
              loading={false} // Or true if you're waiting for an API
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
                        <div className="flex mt-2 flex-col gap-2">
                          {/* Condition Dropdown (on top) */}
                          <CustomDropDown
                            options={dropdownOptions}
                            placeHolder="Select condition"
                            value={values.filters[col.id]?.condition || ''}
                            onChange={(e) => handleConditionChange(col.id, e)}
                          />

                          {/* Date pickers side by side, below the condition */}
                          {col.id === 'createdAt' ? (
                            <div className="flex gap-4 mt-2">
                              <CustomDatePicker
                                label="Start Date"
                                value={values.filters[col.id]?.value?.[0] || ''}
                                onChange={(date) => {
                                  const end = values.filters[col.id]?.value?.[1] || '';
                                  setFieldValue(`filters.${col.id}.value`, [date, end]);
                                }}
                              />

                              <CustomDatePicker
                                label="End Date"
                                disabled={isDisable}
                                value={values.filters[col.id]?.value?.[1] || ''}
                                onChange={(date) => {
                                  const start = values.filters[col.id]?.value?.[0] || '';
                                  setFieldValue(`filters.${col.id}.value`, [start, date]);
                                }}
                              />
                            </div>
                          ) : (
                            <div className="mt-2">
                              <CustomDropdownComponent
                                options={dropdownOptionsMap[col.id] || []}
                                value={values.filters[col.id]?.value || []}
                                onChange={(selected) => handleMultiSelectChange(col.id, selected)}
                                placeholder="Select options"
                                multiple={true}
                                onSearch={(term) => handleDropdownSearch(term, col.id)}
                              />
                            </div>
                          )}
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