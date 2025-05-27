import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { roleAccess } from "../../api/services/settingsAPI/roleAPIs";

const RoleModuleFetcher = ({ setLoadingModules }) => {
    const { values, setFieldValue } = useFormikContext();

    useEffect(() => {
        const fetchModules = async () => {
            const selectedOrg = values?.organisation;
            const selectedCopyRole = values?.copyRoleTemplte;

            if (selectedOrg) {
                setLoadingModules(true);
                const payload = {
                    orgid: selectedOrg,
                    copyparentrole_id: selectedCopyRole,
                };
                console.log("Payload in useEffect:", payload);
                try {
                    const data = await roleAccess({
                        orgid: selectedOrg,
                        copyparentrole_id: 2,
                    });
                    console.log("Fetched modules:", data);
                    setFieldValue("roleModules", data?.data?.data?.role_modules || []);
                } catch (error) {
                    console.error("Failed to fetch modules:", error);
                } finally {
                    setLoadingModules(false);
                }
            } else {
                setFieldValue("roleModules", []);
            }
        };

        fetchModules();
    }, [values.organisation, values.copyRoleTemplte]);

    return null; // No UI, just logic
};

export default RoleModuleFetcher;
