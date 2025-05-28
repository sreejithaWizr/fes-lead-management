import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useParams } from 'react-router-dom';
import OrganisationBasicInfoForm from '../../../components/forms/createOrganisation/orgBasicInfoForm';
import OrganisationAccountInfoForm from '../../../components/forms/createOrganisation/orgAccountInfoForm';
import { validationSchema } from '../../../components/forms/createOrganisation/schema';
import { getOrganisationById } from '../../../api/services/settingsAPI/organisationAPI';
import OrganisationDetailsHeader from '../../../components/OrganisationDetailsHeader';
export const formRef = React.createRef();

const OrganisationPageDetailView = () => {
    const { id } = useParams();
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


    if (!initialValues) return <div>Loading...</div>;

    return (
        <div className="w-full h-full">
            <OrganisationDetailsHeader organisation={orgDetails} id={id} mode="view" />
            <div className="w-full h-full rounded-md">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
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
                                mode="view"
                            />

                            <OrganisationAccountInfoForm
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                mode="view"
                            />

                        </form>
                    )}
                </Formik>
            </div>

        </div>
    );
};

export default OrganisationPageDetailView;