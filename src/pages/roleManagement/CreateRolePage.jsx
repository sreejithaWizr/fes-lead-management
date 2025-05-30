import React, { useEffect, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import { CustomButton } from "react-mui-tailwind";
import { Snackbar, Alert } from "@mui/material";
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

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    description: "",
  });

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
      created_by: "Admin",
    };

    try {
      const response = await createRole(payload);
      if (response?.data?.succeeded == true) {
        setAlert({
          open: true,
          severity: "success",
          description: "Role created successfully.",
        });
        setTimeout(() => {
          navigate("/settings?tab=Role+Management");
        }, 2000);
      } else if (response?.data?.succeeded == false) {
        setAlert({
          open: true,
          severity: "error",
          description: response?.data?.message || "Something went wrong !",
        });
      }
    } catch (err) {
      setAlert({
        open: true,
        severity: "error",
        description: "Something went wrong !",
      });
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

            if (selectedOrg) {
              setLoadingModules(true);
              const payload = {
                orgid: selectedOrg || null,
                copyparentrole_id: selectedCopyRole || null,
              };

              try {
                const data = await roleAccess(payload);
                formik.setFieldValue(
                  "roleModules",
                  data?.data?.data?.role_modules || []
                );
              } catch (error) {
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
            {alert.open && (
              <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                onClose={() => setAlert(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert
                  onClose={() => setAlert(false)}
                  severity={alert?.severity}
                  sx={{ width: "100%" }}
                >
                  {alert?.description}
                </Alert>
              </Snackbar>
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default CreateRolePage;
