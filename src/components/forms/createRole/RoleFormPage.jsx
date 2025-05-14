// pages/RoleFormPage.tsx
import React from 'react';
import { Formik, Form } from 'formik';
import RoleInformationForm from '../createRole/RoleInformationForm';
import RoleAccessPermission from '../createRole/RoleAccessPermission';
import * as Yup from 'yup';
import {CustomButton} from 'react-mui-tailwind'
import { useNavigate } from 'react-router-dom';
import LeftArrowIcon from "../../../assets/arrow-left.svg";
import RightArrowIcon from "../../../assets/arrow-right.svg";

const initialAccess = {
    "Lead Management Module": {
        "Lead Form View Permission": {
            "Lead Information": {
                "First Name": false,
                "Last Name": false,
                "Status": false,
                "Email": false,
                "Secondary Email": false,
                "Mobile Number": false,
                "Alternative Number": false,
                "Whatsapp Number": false,
                "Priority": false,
                "Tele Caller": false,
            },
            "Education Qualification": {
                "Highest Qualification": false,
                "Graduation Year": false,
                "Field of Study ": false,
                "CGPA/Grade": false,
                "Work Experience": false,
                "Intake Year": false,
                "Intake Month": false,
                "Preferred Study Destination": false,
                "Other Countries": false,
                "Test Training": false,
                "Test Names": false
            },
            "Lead Status": {
                "Status": false,
                "Category": false,
                "Subcategory": false,
                "Branch": false,
                "Notes": false,
            },
            "Lead Source": {
                "Source 1": false,
                "Source 2": false,
                "Source 3": false,
                "Source 4": false,
                "Location 1": false,
                "Location 2": false,
                "Vertical": false,
                "Preferred Study Destination": false,
                "GCL ID": false,
                "ZC GAD": false,
                "Ad ID": false,
                "Ad Name": false,
                "Ad Campaign": false,
                "Key Identifier": false,
                "Campaign Type": false,
                "Referrer Name": false,
                "Referrer Email": false,
                "Referrer Employee ID": false,
                "Referrer Phone Number": false,
                "Lead Form": false,
                "User Agent": false,
                "Import Lead": false,
                "Invoke Blueprint": false,
                "Verse ID": false,
                "Desired Program ": false,
                "Internship Option": false,
                "Shortlisted Course ID": false,
                "Preferred Counsellor for FESTech1 Name": false,
                "Preferred Counsellor for FESTech1 Email Id": false
            },
            "Opportunity": {
                "Country": false,
                "Opportunity ID": false,
                "Counsellor": false,
                "Opportunity Status": false,
                "Preferred Intake": false,
            }
        },
        "Lead Form Edit Permission": {
            "Lead Information": {
                "First Name": false,
                "Last Name": false,
                "Status": false,
                "Email": false,
                "Secondary Email": false,
                "Mobile Number": false,
                "Alternative Number": false,
                "Whatsapp Number": false,
                "Priority": false,
                "Tele Caller": false,
            },
            "Education Qualification": {
                "Highest Qualification": false,
                "Graduation Year": false,
                "Field of Study ": false,
                "CGPA/Grade": false,
                "Work Experience": false,
                "Intake Year": false,
                "Intake Month": false,
                "Preferred Study Destination": false,
                "Other Countries": false,
                "Test Training": false,
                "Test Names": false
            },
            "Lead Status": {
                "Status": false,
                "Category": false,
                "Subcategory": false,
                "Branch": false,
                "Notes": false,
            },
            "Lead Source": {
                "Source 1": false,
                "Source 2": false,
                "Source 3": false,
                "Source 4": false,
                "Location 1": false,
                "Location 2": false,
                "Vertical": false,
                "Preferred Study Destination": false,
                "GCL ID": false,
                "ZC GAD": false,
                "Ad ID": false,
                "Ad Name": false,
                "Ad Campaign": false,
                "Key Identifier": false,
                "Campaign Type": false,
                "Referrer Name": false,
                "Referrer Email": false,
                "Referrer Employee ID": false,
                "Referrer Phone Number": false,
                "Lead Form": false,
                "User Agent": false,
                "Import Lead": false,
                "Invoke Blueprint": false,
                "Verse ID": false,
                "Desired Program ": false,
                "Internship Option": false,
                "Shortlisted Course ID": false,
                "Preferred Counsellor for FESTech1 Name": false,
                "Preferred Counsellor for FESTech1 Email Id": false
            },
            "Opportunity": {
                "Country": false,
                "Opportunity ID": false,
                "Counsellor": false,
                "Opportunity Status": false,
                "Preferred Intake": false,
            }
        }
    }
};

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
    }

    const handleBack = () => {
        navigate("/settings?tab=Role+Management")
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
                access: initialAccess
            }}
            validationSchema={roleSchema}
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
                    <RoleAccessPermission />

                </Form>
            )}
        </Formik>
    );
};

export default RoleFormPage;
