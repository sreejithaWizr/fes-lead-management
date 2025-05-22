import React, { useEffect, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import { CustomButton } from 'react-mui-tailwind';
import { createLead, getStatus } from '../../api/services/masterAPIs/createLeadApi';
import { useNavigate, useParams } from 'react-router-dom';
import LeftArrowIcon from "../../assets/arrow-left.svg";
import RightArrowIcon from "../../assets/arrow-right.svg";
import OrganisationBasicInfoForm from '../../components/forms/createOrganisation/orgBasicInfoForm';
import OrganisationAccountInfoForm from '../../components/forms/createOrganisation/orgAccountInfoForm';
import { validationSchema } from '../../components/forms/createOrganisation/schema';
import { createOrganisation, getOrganisationById, updateOrganisation } from '../../api/services/settingsAPI/organisationAPI';
import OrganisationDetailsHeader from '../../components/OrganisationDetailsHeader';
export const formRef = React.createRef();

const EditOrganisationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [orgData, setOrgData] = useState(null);
    const [initialValues, setInitialValues] = useState(null);


    useEffect(() => {
        const fetchOrganisation = async () => {
            try {
                const response = await getOrganisationById(id);
                setOrgData(response?.data);
                console.log("Org data fetched:", response?.data);
            } catch (err) {
                console.error("Failed to fetch org:", err);
            } finally {
                // setLoading(false);
            }
        };

        fetchOrganisation();
    }, [id]);


    const orgDetails = {
        initials: `${orgData?.orgName?.charAt(0) || ''}`,
        name: `${orgData?.orgName}`,
        status: orgData?.status,
        email: `${orgData?.business_mail}`,
        phone: `${orgData?.mobileNumber}`,
    };

    // JSON object to simulate prefilled data (could come from API)
    useEffect(() => {
        console.log("fatat", orgData)
        const fetchedOrgData = {
            // Basic Information
            orgName: orgData?.orgName,
            type: orgData?.type,
            // region: '',
            business_mail: orgData?.business_mail,
            mobileNumber: orgData?.mobileNumber,
            primary_admin_user_name: orgData?.primary_admin_user_name,
            admin_mail: orgData?.admin_mail,
            parent_org: orgData?.parent_org,
            service_enabled: orgData?.service_enabled || [],
            status: orgData?.status,
            notes: orgData?.notes,

            // Business Information
            street: orgData?.street,
            city: orgData?.city,
            state: orgData?.state,
            postal_code: orgData?.postal_code,
            country: orgData?.country,
            gst_no: orgData?.gst_no,
            primary_poc: orgData?.primary_poc,
            poc_mail: orgData?.poc_mail,
            poc_mobileNumber: orgData?.poc_mobileNumber,
        };

        // Simulate delay and set data
        setTimeout(() => {
            setInitialValues(fetchedOrgData);
        }, 100);
    }, [orgData]);

    const handleSubmit = async (values) => {
        console.log('Form submitted with values:', values);

        const payload = {
            id: +id,
            orgName: values?.orgName,
            type: values?.type,
            // region: values?.region?.name,
            business_mail: values?.business_mail,
            mobileNumber: values?.mobileNumber,
            primary_admin_user_name: values?.primary_admin_user_name,
            admin_mail: values?.admin_mail,
            parent_org: values?.parent_org,
            service_enabled: Array.isArray(values?.service_enabled)
                ? values.service_enabled
                : [],
            status: values?.status,
            notes: values?.notes,
            street: values?.street,
            city: values?.city,
            state: values?.state,
            country: values?.country,
            gst_no: values?.gst_no,
            primary_poc: values?.primary_poc,
            poc_mail: values?.poc_mail,
            poc_mobileNumber: values?.poc_mobileNumber,

            // add_account_info: values?.add_account_info?.map(info => ({
            //     name: info.name || null,
            //     account_id: info.account_id || null,
            // })),
        }

        try {
            const response = await updateOrganisation(id, payload);
            if (response?.data?.succeeded === true) {
                navigate("/settings")
                // alert("Updated")
            }
            else {
                alert("Updation Failed")
            }
            // alert("Created")
            // Optional: reset form or show toast
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };

    if (!initialValues) return <div>Loading...</div>;

    return (
        <div className="w-full h-full">
            <OrganisationDetailsHeader organisation={orgDetails} />
            <div className="w-full h-full rounded-md">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    innerRef={formRef}
                    enableReinitialize={true}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <OrganisationBasicInfoForm
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                mode="edit"
                            />

                            <OrganisationAccountInfoForm
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                mode="edit"
                            />

                        </form>
                    )}
                </Formik>
            </div>

        </div>
    );
};

export default EditOrganisationPage;