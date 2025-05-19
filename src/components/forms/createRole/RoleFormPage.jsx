import React from 'react';
import { Formik, Form } from 'formik';
import RoleInformationForm from '../createRole/RoleInformationForm';
import RoleAccessPermission from '../createRole/RoleAccessPermission';
import * as Yup from 'yup';
import {CustomButton} from 'react-mui-tailwind'
import { useNavigate } from 'react-router-dom';
import LeftArrowIcon from "../../../assets/arrow-left.svg";
import RightArrowIcon from "../../../assets/arrow-right.svg";
import RoleAccessForm from './RoleAccessForm';

const RoleFormPage = () => {

    const navigate = useNavigate();

    const roleSchema = Yup.object().shape({
        roleName: Yup.string().required('Required'),
        roleType: Yup.string().required('Required'),
        parentRole: Yup.string().required('Required'),
        copyRoleTemplte: Yup.string().required('Required'),
        insertionMode: Yup.string().required('Required'),
        organisation: Yup.string().required('Required'),
        hierarchyLevel: Yup.string().required('Required'),
        description: Yup.string()
    });

    const handleSubmit = (values) => {
        console.log(values);
        // alert(values)
        console.log("Final Payload to Submit:", JSON.stringify(values, null, 2));
  // You can post `values` to the API directly
    }

    const handleBack = () => {
        navigate("/settings?tab=Role+Management")
    }

    // const roleAPI = {
    //     roleModules: [
    //       {
    //         moduleID: 1,
    //         moduleName: "Lead Management Module",
    //         privilege: [
    //           {
    //             privilegeID: 1,
    //             fieldLevel: true,
    //             privilegeName: "Lead Information",
    //             fields: [
    //               {
    //                 fieldID: 1,
    //                 fieldName: "First Name",
    //                 view: true,
    //                 edit: true,
    //                 mask: true,
    //               },
    //               {
    //                 fieldID: 2,
    //                 fieldName: "Second Name",
    //                 view: true,
    //                 edit: true,
    //                 mask: true,
    //               },
    //             ],
    //           },
    //           {
    //             privilegeID: 6,
    //             fieldLevel: false,
    //             privilegeName: "Others",
    //             fields: [
    //               { fieldID: 12, fieldName: "Create Lead", view: true },
    //               { fieldID: 13, fieldName: "Bulk Transfer Option", view: true },
    //               { fieldID: 14, fieldName: "Bulk Upload Option", view: true },
    //             ],
    //           },
    //         ],
    //       },
    //       {
    //         moduleID: 2,
    //         moduleName: "Tech One students",
    //         privilege: [
    //           {
    //             privilegeID: 20,
    //             fieldLevel: false,
    //             privilegeName: "Tech Info Access",
    //             fields: [
    //               {
    //                 fieldID: 17,
    //                 fieldName: "Lead Dashboard",
    //                 view: true,
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   };

    const roleAPI = {
        roleModules: [
            {
                moduleID: 1,
                moduleName: "Lead Management Module",
                privilege: [
                    {
                        privilegeID: 1,
                        fieldLevel: true,
                        privilegeName: "Lead Information",
                        fields: [
                            {
                                fieldID: 1,
                                fieldName: "First Name",
                                view: true,
                                edit: true,
                                mask: false,
                            },
                            {
                                fieldID: 2,
                                fieldName: "Last Name",
                                view: true,
                                edit: true,
                                mask: true,
                            },
                        ],
                    },
                    {
                        privilegeID: 2,
                        fieldLevel: true,
                        privilegeName: "Education Qualification",
                        fields: [
                          {
                            fieldID: 3,
                            fieldName: "Education Qualification",
                            view: true,
                            edit: true,
                            mask: true,
                          },
                          {
                            fieldID: 4,
                            fieldName: "Graduation Year",
                            view: true,
                            edit: true,
                            mask: true,
                          },
                          {
                            fieldID: 5,
                            fieldName: "Field of Study",
                            view: true,
                            edit: true,
                            mask: true,
                          },
                          {
                            fieldID: 6,
                            fieldName: "CGPA/Grade",
                            view: true,
                            edit: true,
                            mask: true,
                          },
                          {
                            fieldID: 7,
                            fieldName: "Work Experience",
                            view: true,
                            edit: true,
                            mask: true,
                          }
                        ]
                      },
                    {
                        privilegeID: 6,
                        fieldLevel: false,
                        privilegeName: "Others",
                        fields: [
                            { fieldID: 12, fieldName: "Create Lead", view: true },
                            { fieldID: 13, fieldName: "Bulk Transfer Option", view: false },
                            { fieldID: 14, fieldName: "Bulk Upload Option", view: true },
                        ],
                    },
                ],
            },
            {
                moduleID: 2,
                moduleName: "Tech One students",
                privilege: [
                    {
                        privilegeID: 20,
                        fieldLevel: false,
                        privilegeName: "Tech Info Access",
                        fields: [
                            {
                                fieldID: 17,
                                fieldName: "Lead Dashboard",
                                view: true,
                            },
                        ],
                    },
                ],
            },
        ],
    };
    

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
                roleModules: roleAPI?.roleModules || [] 
                // access: initialAccess
            }}
            // validationSchema={roleSchema}
            onSubmit={(values) =>handleSubmit(values)}
        >
            {formik => (
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
                    {/* <RoleAccessPermission /> */}
                    <RoleAccessForm values={formik.values} setFieldValue={formik.setFieldValue}/>

                </Form>
            )}
        </Formik>
    );
};

export default RoleFormPage;
