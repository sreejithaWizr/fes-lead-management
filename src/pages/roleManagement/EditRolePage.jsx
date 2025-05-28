import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomButton } from "react-mui-tailwind";
import { useNavigate, useParams } from "react-router-dom";
import LeftArrowIcon from "../../assets/arrow-left.svg";
import TickIcon from "../../assets/tick.svg";
import DeleteIcon from "../../assets/delete-icon-red.svg";
import {
    createRole,
    deleteRole,
    getRolebyId,
    roleAccess,
    updateRole,
} from "../../api/services/settingsAPI/roleAPIs";
import { roleSchemaValidations } from "../../components/forms/createRole/schema";
import RoleInformationForm from "../../components/forms/createRole/RoleInformationForm";
import RoleAccessForm from "../../components/forms/createRole/RoleAccessForm";
import EditIcon from "../../assets/edit.svg";
import { getLeadById } from "../../api/services/leadAPI/leadAPIs";
import DeletePopup from "../../utils/DeletePopup";
import { getInitials } from "../../utils/commonFunction";

const deleteButtonStyles = {
    border: "1px solid #F7A4A3",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    color: "#EC221F",
    "&:hover": {
        backgroundColor: "#ffffff",
    },
    "&:focus": {
        color: "#EC221F !important",
        border: "1px solid #F7A4A3",
        backgroundColor: "#ffffff",
    },
};

const EditViewRolePage = ({ mode = "edit" }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loadingModules, setLoadingModules] = useState(false);
    const [loadingRoleData, setLoadingRoleData] = useState(true);
    const [formMode, setFormMode] = useState(mode);
    const [roleData, setRoleData] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [hasOrgChanged, setHasOrgChanged] = useState(false);

    const [initialValues, setInitialValues] = useState({
        roleName: "",
        roleType: "",
        parentRole: "",
        copyRoleTemplte: "",
        insertionMode: "",
        organisation: "",
        hierarchyLevel: "",
        description: "",
        roleModules: [],
    });

    useEffect(() => {
        const fetchRoleDetails = async () => {
            setLoadingRoleData(true); //
            try {
                const response = await getRolebyId(id);
                setRoleData(response?.data?.data);
                console.log("Role data fetched:", response?.data?.data);
            } catch (err) {
                console.error("Failed to fetch role:", err);
            } finally {
                setLoadingRoleData(false);
            }
        };

        fetchRoleDetails();
    }, []);

    useEffect(() => {
        const roleDataByID = {
            roleName: roleData?.role_name,
            roleType: roleData?.role_type_id,
            parentRole: roleData?.parent_role_id,
            copyRoleTemplte: Number(id),
            insertionMode: roleData?.insertion_mode_id,
            organisation: roleData?.org_id,
            hierarchyLevel: roleData?.hierarchy_level,
            description: roleData?.description,
            roleModules: roleData?.role_modules || [],
        };

        // setTimeout(() => {
        setInitialValues(roleDataByID);
        // }, 1000);
    }, [roleData]);

    const handleBack = () => {
        navigate("/settings?tab=Role+Management");
    };

    console.log("roleData", roleData)

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

        try {
            const response = await updateRole(id, payload);
            console.log("User created:", response.data);
            if (response?.data?.succeeded === true) {
                navigate("/settings?tab=Role+Management");
            }
        } catch (err) {
            console.error("Error creating user:", err);
        }
    };

    const handleEditClick = () => {
        navigate(`/settings/role/edit/${id}`);
        setFormMode("edit");
    };

    const handleDelete = () => {
        setIsDeleteOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await deleteRole(id);
            console.log("Role delete:", response.data);
            if (response?.data?.succeeded === true) {
                setIsDeleteOpen(false);
                navigate("/settings?tab=Role+Management");
            }
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    if (loadingRoleData) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-solid  border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            </div>
        );
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={roleSchemaValidations}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
            >
                {(formik) => {

                    useEffect(() => {
                        if (
                            roleData &&
                            formik?.values?.organisation &&
                            formik?.values?.organisation !== roleData?.org_id
                        ) {
                            setHasOrgChanged(true);
                        }
                    }, [formik?.values?.organisation]);

                    // For Fetching the data when organization and copyrole changes
                    useEffect(() => {
                        const fetchModules = async () => {
                            const selectedOrg = formik?.values?.organisation;
                            const selectedCopyRole = formik?.values?.copyRoleTemplte;

                            if (hasOrgChanged && selectedOrg) {
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
                            }
                        };

                        fetchModules();

                    }, [formik?.values?.organisation, formik?.values?.copyRoleTemplte, hasOrgChanged]);

                    return (
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
                                            {formMode == "edit" ? "Edit Role" : "Role Details"}
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    height: "max-content",
                                    padding: "12px 0",
                                    margin: "10px 0",
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <div className="flex flex-row items-center gap-4">
                                    <div className="bg-[#030229B2] text-white w-[64px] h-[64px] rounded-full flex items-center justify-center p-[12px] font-bold text-[23px] leading-[140%] tracking-[0%]">
                                        {getInitials(formik?.values?.roleName)}
                                    </div>
                                    <label style={{ fontWeight: "700", fontSize: "19px", wordBreak: "break-word" }}>
                                        {formik.values.roleName}
                                    </label>
                                </div>
                                <div>
                                    {formMode == "view" ? (
                                        <div className="flex items-center gap-3">
                                            <CustomButton
                                                type="button"
                                                text="Delete"
                                                variant="secondary"
                                                startIcon={true}
                                                endIcon={false}
                                                iconImg={DeleteIcon}
                                                sx={deleteButtonStyles}
                                                onClick={handleDelete}
                                            />
                                            <CustomButton
                                                // type="button"
                                                variant="secondary"
                                                iconImg={EditIcon}
                                                startIcon={true}
                                                endIcon={false}
                                                showText={true}
                                                text={"Edit"}
                                                onClick={handleEditClick}
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <CustomButton
                                                text="Cancel"
                                                variant="secondary"
                                                startIcon={false}
                                                endIcon={false}
                                                onClick={handleBack}
                                            />
                                            <CustomButton
                                                // type="Submit"
                                                text="Update"
                                                showText={true}
                                                startIcon={true}
                                                endIcon={false}
                                                iconImg={TickIcon}
                                                onClick={formik.handleSubmit}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <RoleInformationForm {...formik} mode={formMode} />
                            {formik?.values?.organisation &&
                                (loadingModules ? (
                                    <div className="flex justify-center items-center py-10">
                                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-solid  border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                                    </div>
                                ) : (
                                    formik?.values?.roleModules.length > 0 && (
                                        <RoleAccessForm
                                            values={formik.values}
                                            setFieldValue={formik.setFieldValue}
                                            mode={formMode}
                                        />
                                    )
                                ))}
                        </Form>
                    );
                }}
            </Formik>
            {isDeleteOpen && (
                <DeletePopup
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={confirmDelete}
                    title={`Are you sure you want to delete ?`}
                />
            )}
        </>
    );
};

export default EditViewRolePage;
