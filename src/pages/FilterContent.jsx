import React from 'react';
import { Formik, Form, useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import { CustomSearch, CustomDropDown, CustomCheckboxField } from "react-mui-tailwind";

const dropdownOptions = ["is", "is not", "is empty", "is not empty", "contains"];
const defaultValueOptions = ["Option 1", "Option 2", "Option 3"];

// 🔄 Use selected condition directly as operator
const transformFilters = (filters) => {
  return Object.entries(filters).map(([field, { condition, value }]) => ({
    field,
    operator: condition,
    value: Array.isArray(value) ? value : [value],
  }));
};

const FilterContent = ({ onClose, onApplyFilter, initialFilters = {} }) => {
  const { columns } = useSelector((state) => state.leads);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredColumns = columns.filter(
    (col) =>
      col.isFilter &&
      col.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Formik
      initialValues={{ filters: initialFilters }}
      enableReinitialize={true}
      onSubmit={(values) => {
        const transformed = transformFilters(values.filters);
        console.log("🚀 Transformed Filters:", transformed, values);
        onApplyFilter(transformed); // pass to parent
        onClose(); // close modal or drawer
      }}
    >
      {({ values, setFieldValue, resetForm }) => {
        const handleCheckboxToggle = (colId) => {
          const filters = { ...values.filters };
          if (filters[colId]) {
            delete filters[colId];
          } else {
            filters[colId] = { condition: '', value: '' };
          }
          setFieldValue("filters", filters);
        };

        const handleConditionChange = (colId, event) => {
          const condition = event.target.value;
          setFieldValue(`filters.${colId}.condition`, condition);
        };

        const handleValueChange = (colId, event) => {
          const value = event.target.value;
          setFieldValue(`filters.${colId}.value`, value);
        };

        console.log("value", values);
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
                          <CustomDropDown
                            options={defaultValueOptions}
                            placeHolder="Select value"
                            value={values.filters[col.id]?.value || ''}
                            onChange={(e) => handleValueChange(col.id, e)}
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
                  resetForm();              // reset form values
                  setSearchTerm('');        // reset search input
                  onApplyFilter([]);        // clear applied filters
                  onClose();                // close the modal/drawer
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
