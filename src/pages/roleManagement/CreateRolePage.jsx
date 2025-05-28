import React, { useEffect, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { CustomButton } from "react-mui-tailwind";
import { useNavigate } from "react-router-dom";
import LeftArrowIcon from "../../assets/arrow-left.svg";
import RightArrowIcon from "../../assets/arrow-right.svg";
import {
  createRole,
  roleAccess,
} from "../../api/services/settingsAPI/roleAPIs";
import { roleSchemaValidations } from "../../components/forms/createRole/schema";
import RoleInformationForm from "../../components/forms/createRole/RoleInformationForm";
import RoleAccessForm from "../../components/forms/createRole/RoleAccessForm";
import RoleModuleFetcher from "./RoleFetcher";

const CreateRolePage = () => {

  const navigate = useNavigate();

  const [loadingModules, setLoadingModules] = useState(false);

  // const [alert, setAlert] = useState({
  //   open: false,
  //   severity: "success",
  //   title: "",
  //   description: "",
  // });

  const handleBack = () => {
    navigate("/settings?tab=Role+Management");
  };

  const handleSubmit = async (values) => {
    const payload = {
      role_name: values?.roleName,
      role_type_id: values?.roleType,
      parent_role_id: values?.parentRole,
      hierarchy_level: values?.hierarchyLevel,
      insertion_mode_id: values?.insertionMode,
      description: values?.description,
      org_id: values?.organisation,
      role_modules: values?.roleModules,
    };

    // setAlert({
    //   open: true,
    //   severity: "success",
    //   title: "Success",
    //   description: "Item created successfully!",
    // });

    try {
      const response = await createRole(payload);
      console.log("User created:", response.data);
      if (response?.data?.succeeded === true) {
        navigate("/settings?tab=Role+Management");
      }
    } catch (err) {
    }
  };

  return (
    <Formik
      initialValues={{
        roleName: "",
        roleType: "",
        parentRole: "",
        copyRoleTemplte: "",
        insertionMode: "",
        organisation: "",
        hierarchyLevel: "",
        description: "",
        roleModules: [],
      }}
      validationSchema={roleSchemaValidations}
      onSubmit={(values) => handleSubmit(values)}
    >
      {(formik) => {
        // For Fetching the data when organization and copyrole changes
        useEffect(() => {
          const fetchModules = async () => {
            const selectedOrg = formik?.values?.organisation;
            const selectedCopyRole = formik?.values?.copyRoleTemplte;

            console.log("copy role template", selectedCopyRole);

            if (selectedOrg) {
              setLoadingModules(true);
              const payload = {
                orgid: selectedOrg || null,
                copyparentrole_id: selectedCopyRole || null,
              };
              console.log("Payload:", payload);

              try {
                const data = await roleAccess(payload);
                console.log("Fetched data:", data);
                formik.setFieldValue(
                  "roleModules",
                  data?.data?.data?.role_modules || []
                );
              } catch (error) {
                console.error("Failed to fetch role modules:", error);
                formik.setFieldValue("roleModules", []);
              } finally {
                setLoadingModules(false); // <-- this always runs
              }
            } else {
              formik.setFieldValue("roleModules", []);
            }
          };

          fetchModules();
        }, [formik?.values?.organisation, formik?.values?.copyRoleTemplte]);

        return (
          <>
            <Form>
              <div className="flex w-full justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={LeftArrowIcon}
                    alt="FES Logo"
                    className="size-[24px] rounded-md cursor-pointer"
                    onClick={handleBack}
                  />
                  <div className="flex items-center gap-2">
                    <h1 className="font-proxima font-bold text-[28px] leading-[140%] align-middle text-[#17222B]">
                      Add new role
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CustomButton
                    text="Cancel"
                    variant="secondary"
                    startIcon={false}
                    endIcon={false}
                    onClick={handleBack}
                  />
                  <CustomButton
                    type="Submit"
                    text="Submit"
                    startIcon={false}
                    endIcon={true}
                    iconImg={RightArrowIcon}
                  />
                </div>
              </div>
              <RoleInformationForm {...formik} mode="create" />
              {formik?.values?.organisation &&
                (loadingModules ? (
                  <div className="flex justify-center items-center py-10">
                    <div
                      // className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-900"
                      className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-solid  border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    ></div>
                  </div>
                ) : (
                  formik?.values?.roleModules?.length > 0 && (
                    <RoleAccessForm
                      values={formik?.values}
                      setFieldValue={formik.setFieldValue}
                      mode="create"
                    />
                  )
                ))}
            </Form>
            {/* {alert.open && (
              <Snackbar
                severity={alert.severity}
                variant="filled"
                hasTitle={true}
                title={alert.title}
                hasDescription={true}
                description={alert.description}
                hasClose={true}
              />
            )} */}
          </>
        );
      }}
    </Formik>
  );
};

export default CreateRolePage;
