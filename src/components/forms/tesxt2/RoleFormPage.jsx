// pages/RoleFormPage.tsx
import React from 'react';
import { Formik, Form } from 'formik';
import RoleInformationForm from '../createRole/RoleInformationForm';
import RoleAccessPermission from './RoleAccessPermission';

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
                "Opportunity Status" : false,
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
                "Opportunity Status" : false,
                "Preferred Intake": false,
            }
        }
    }
};

const RoleFormPage = () => {
    return (
        <Formik
            initialValues={{
                firstName: '',
                roleType: '',
                access: initialAccess
            }}
            onSubmit={(values) => {
                console.log("Submitted Payload:", values);
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {formik => (
                <Form>
                    <RoleInformationForm {...formik} />
                    <RoleAccessPermission />
                    <div className="p-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default RoleFormPage;
