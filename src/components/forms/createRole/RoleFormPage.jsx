import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import RoleInformationForm from '../createRole/RoleInformationForm';
import RoleAccessPermission from '../createRole/RoleAccessPermission';
import * as Yup from 'yup';
import { CustomButton } from 'react-mui-tailwind'
import { useNavigate } from 'react-router-dom';
import LeftArrowIcon from "../../../assets/arrow-left.svg";
import RightArrowIcon from "../../../assets/arrow-right.svg";
import RoleAccessForm from './RoleAccessForm';
import { getCopyRoleTemplate, getUserRole } from '../../../api/services/masterAPIs/createRoleAPI';
import { createRole, roleAccess } from '../../../api/services/settingsAPI/roleAPIs';
import { roleSchemaValidations } from './schema';

const RoleFormPage = () => {

    const navigate = useNavigate();

    const [loadingModules, setLoadingModules] = useState(false);

    const handleBack = () => {
        navigate("/settings?tab=Role+Management")
    }

    const handleSubmit = async (values) => {

        const payload = {
            role_name: values?.roleName,
            role_type_id: values?.roleType,
            parent_role_id: values?.parentRole,
            hierarchy_level: values?.hierarchyLevel,
            insertion_mode_id: values?.insertionMode,
            description: values?.description,
            org_id: values?.organisation,
            role_modules: values?.roleModules
        }

        console.log("payload", payload)

        try {
            const response = await createRole(payload);
            console.log('User created:', response.data);
            if (response?.data?.succeeded === true) {
                navigate("/settings?tab=Role+Management")
            }
        } catch (err) {
            console.error('Error creating user:', err);
        }
    }

    return (
        <Formik
            initialValues={{
                roleName: '',
                roleType: '',
                parentRole: '',
                copyRoleTemplte: '',
                insertionMode: '',
                organisation: '',
                hierarchyLevel: '',
                description: '',
                roleModules: []
            }}
            validationSchema={roleSchemaValidations}
            onSubmit={(values) => handleSubmit(values)}
        >
            {(formik) => {

                // Fetch data when organization changes
                useEffect(() => {
                    const fetchModules = async () => {
                        const selectedOrg = formik?.values?.organisation;
                        if (selectedOrg) {
                            setLoadingModules(true);
                            const data = await roleAccess(selectedOrg);
                            console?.log("data", data)
                            formik.setFieldValue('roleModules', data?.data?.data?.role_modules || []);
                            setLoadingModules(false);
                        } else {
                            formik.setFieldValue('roleModules', []);
                        }
                    };
                    fetchModules();
                }, [formik.values.organisation]);

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
                                    <h1
                                        className="font-proxima font-bold text-[28px] leading-[140%] align-middle text-[#17222B]">
                                        Add new role
                                    </h1>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <CustomButton text="Cancel" variant="secondary" startIcon={false} endIcon={false} onClick={handleBack} />
                                <CustomButton type="Submit" text="Submit" startIcon={false} endIcon={true} iconImg={RightArrowIcon} />
                            </div>
                        </div>
                        <RoleInformationForm {...formik} />
                        {/* {formik?.values?.organisation && formik?.values?.roleModules.length > 0 && (
                            <RoleAccessForm values={formik.values} setFieldValue={formik.setFieldValue} />
                        )} */}
                        {formik?.values?.organisation && (
                            loadingModules ? (
                                <div className="flex justify-center items-center py-10">
                                    <div 
                                    // className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-900"
                                    className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-solid  border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
   
                                    ></div>
                                </div>
                            ) : (
                                formik?.values?.roleModules.length > 0 && (
                                    <RoleAccessForm values={formik.values} setFieldValue={formik.setFieldValue} />
                                )
                            )
                        )}

                    </Form>
                )
            }}
        </Formik>
    );
};

export default RoleFormPage;
