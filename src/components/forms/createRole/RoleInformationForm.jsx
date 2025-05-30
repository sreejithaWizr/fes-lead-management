import React, { useEffect, useState } from "react";
import {
  CustomInputField,
  CustomDropDown,
  CustomDatePicker,
  CustomCheckboxField,
} from "react-mui-tailwind";
import InfoIcon from "../../../assets/info-icon.svg";
import {
  getCopyRoleTemplate,
  getInsertionMode,
  getUserRole,
  getUserRoleType,
  getOrganization,
} from "../../../api/services/masterAPIs/createRoleAPI";

const RoleInformationForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  mode = "create",
}) => {
  const isEditMode = mode === "edit";
  const isCreateMode = mode === "create";
  const isViewMode = mode === "view";

  const [roleTypeOptions, setRoleTypeOptions] = useState([]);
  const [parentRoleOptions, setParentRoleOptions] = useState([]);
  const [copyRoleTemplateOptions, setCopyRoleTemplateOptions] = useState([]);
  const [insertionModeOptions, setInsertionModeOptions] = useState([]);
  const [organisationOptions, setOrganisationOptions] = useState([]);
  const [hierarchyLevelOptions, setHierarchyLevelOptions] = useState([
    { id: "L1", name: "L1" },
    { id: "L2", name: "L2" },
    { id: "L3", name: "L3" },
  ]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [
          roleTypeRes,
          parentRoleRes,
          insertionModeRes,
          organisationRes,
          // hierarchyRes
        ] = await Promise.allSettled([
          getUserRoleType(),
          getUserRole(),
          getInsertionMode(),
          getOrganization(),
        ]);

        setRoleTypeOptions(roleTypeRes?.value?.data?.data || []);
        setParentRoleOptions(parentRoleRes?.value?.data?.data || []);
        // setCopyRoleTemplateOptions(templateRes?.value?.data?.data || []);
        setInsertionModeOptions(insertionModeRes?.value?.data?.data || []);
        setOrganisationOptions(organisationRes?.value?.data?.data || []);
        // setHierarchyLevelOptions(hierarchyRes?.value?.data?.data || []);
      } catch (err) {
        console.error("Error loading dropdown data:", err);
      }
    };

    fetchDropdownData();
  }, []);

  const handlePopUpClick = () => {
    alert("Clicked");
  };

  useEffect(() => {
    if (values?.parentRole) {
      const fetchCopyRoleTemplate = async () => {
        try {
          const response = await getCopyRoleTemplate({
            parentrole_Id: values?.parentRole,
          }); // Make sure this API takes the parentRole ID
          setCopyRoleTemplateOptions(response?.data?.data || []); // Update the template options
        } catch (err) {
          console.error("Error fetching copy role templates:", err);
        }
      };

      fetchCopyRoleTemplate();
    }
  }, [values.parentRole]);

  return (
    <div className="form-section animate-fade-in ml-0 mb-6 p-[16px]">
      <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
        Roles Information
      </h2>
      <div className="form-grid">
        <div className="form-field flex flex-row items-start">
          <CustomInputField
            state={isViewMode ? "disabled" : "default"}
            label="Role Name"
            showAsterisk={true}
            value={values.roleName}
            onChange={(value) => {
              setFieldValue("roleName", value.target.value);
            }}
            onBlur={handleBlur}
            placeholder="Enter role name"
            hasError={touched.roleName && Boolean(errors.roleName)}
            error={touched.roleName && errors.roleName}
            className="w-full max-w-[calc(100%-40px)]"
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Role Type"
            options={roleTypeOptions}
            required={true}
            placeHolder="Select"
            value={
              roleTypeOptions?.find(
                (option) => option.id === values?.roleType
              ) || ""
            }
            disabled={isViewMode}
            onChange={(value) => {
              setFieldValue("roleType", value.target.value?.id);
            }}
            onBlur={() => handleBlur({ target: { name: "roleType" } })}
            hasError={touched.roleType && Boolean(errors.roleType)}
            errorMessage={touched.roleType && errors.roleType}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Parent Role"
            options={parentRoleOptions}
            required={true}
            placeHolder="Select"
            value={
              parentRoleOptions?.find(
                (option) => option.id === values?.parentRole
              ) || ""
            }
            disabled={isViewMode}
            onChange={(value) => {
              setFieldValue("parentRole", value.target.value?.id);
              if (mode == "create") {
                setFieldValue("copyRoleTemplte", "");
              }
            }}
            onBlur={() => handleBlur({ target: { name: "parentRole" } })}
            hasError={touched.parentRole && Boolean(errors.parentRole)}
            errorMessage={touched.parentRole && errors.parentRole}
          />
        </div>

        {isCreateMode && (
          <div className="form-field">
            <CustomDropDown
              label="Copy Role Template"
              options={copyRoleTemplateOptions}
              required={false}
              placeHolder="Select"
              value={
                copyRoleTemplateOptions?.find(
                  (option) => option.id === values?.copyRoleTemplte
                ) || ""
              }
              disabled={isViewMode}
              onChange={(value) => {
                setFieldValue("copyRoleTemplte", value.target.value?.id);
              }}
              onBlur={() => handleBlur({ target: { name: "copyRoleTemplte" } })}
              hasError={
                touched.copyRoleTemplte && Boolean(errors.copyRoleTemplte)
              }
              errorMessage={touched.copyRoleTemplte && errors.copyRoleTemplte}
            />
          </div>
        )}

        <div className="form-field">
          <CustomDropDown
            label="Organisation"
            options={organisationOptions}
            required={true}
            placeHolder="Select"
            value={
              organisationOptions?.find(
                (option) => option.id === values?.organisation
              ) || ""
            }
            disabled={isViewMode}
            onChange={(value) => {
              setFieldValue("organisation", value.target.value?.id);
            }}
            onBlur={() => handleBlur({ target: { name: "organisation" } })}
            hasError={touched.organisation && Boolean(errors.organisation)}
            errorMessage={touched.organisation && errors.organisation}
          />
        </div>

        <div className="form-field">
          <CustomDropDown
            label="Insertion Mode"
            options={insertionModeOptions}
            required={true}
            placeHolder="Select"
            value={
              insertionModeOptions?.find(
                (option) => option.id === values?.insertionMode
              ) || ""
            }
            disabled={isViewMode}
            onChange={(value) => {
              setFieldValue("insertionMode", value.target.value?.id);
            }}
            onBlur={() => handleBlur({ target: { name: "insertionMode" } })}
            hasError={touched.insertionMode && Boolean(errors.insertionMode)}
            errorMessage={touched.insertionMode && errors.insertionMode}
          />
        </div>

        <div className="form-field" style={{ flexDirection: "row" }}>
          <CustomDropDown
            label="Hierarchy Level"
            options={hierarchyLevelOptions}
            required={true}
            placeHolder="Select"
            value={
              hierarchyLevelOptions?.find(
                (option) => option.id === values?.hierarchyLevel
              ) || ""
            }
            disabled={isViewMode}
            onChange={(value) => {
              setFieldValue("hierarchyLevel", value.target.value?.id);
            }}
            onBlur={() => handleBlur({ target: { name: "hierarchyLevel" } })}
            hasError={touched.hierarchyLevel && Boolean(errors.hierarchyLevel)}
            errorMessage={touched.hierarchyLevel && errors.hierarchyLevel}
          />
          <div style={{ marginLeft: "-110px", marginTop: "" }}>
            <img onClick={handlePopUpClick} src={InfoIcon} />
          </div>
        </div>

        <div className="form-field">
          <CustomInputField
            state={isViewMode ? "disabled" : "default"}
            label="Description"
            value={values?.description}
            showAsterisk={false}
            onChange={(value) => {
              setFieldValue("description", value?.target?.value);
            }}
            onBlur={handleBlur}
            placeholder="Enter description"
            hasError={touched.description && Boolean(errors.description)}
            error={touched.description && errors.description}
            className="w-full max-w-[calc(100%-40px)]"
          />
        </div>
      </div>
    </div>
  );
};

export default RoleInformationForm;
