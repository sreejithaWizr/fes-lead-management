import React, { useEffect, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import UserInformationForm from '../../../components/forms/createUser/UserInformationForm';
// import { validationSchema } from '../../../components/forms/createUser/schema';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomButton } from 'react-mui-tailwind';
import LeftArrowIcon from "../../../assets/arrow-left.svg";
import TickIcon from "../../../assets/tick.svg";
import { getUserById, updateUser } from '../../../api/services/settingsAPI/userAPI';

export const formRef = React.createRef();

const EditUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [initialValues, setInitialValues] = useState(null);

    // get user by id
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserById(id);
                setUserData(response?.data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            } finally {
                // setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const userDetails = {
        initials: `${userData?.first_name?.charAt(0) || ''}${userData?.last_name?.charAt(0) || ''}`,
        name: `${userData?.first_name} ${userData?.last_name}`,
        status: 'Active',
        // id: `${userData?.lead_number}`,
        email: `${userData?.email}`,
        phone: `${userData?.phone}`,
    };

    // JSON object to simulate prefilled data (could come from API)
    useEffect(() => {
        const fetchedUserData = {
            userFirstName: userData?.first_name || '',
            userLastName: userData?.last_name || '',
            userEmail: userData?.email || '',
            userPhoneNumber: userData?.phone || '',
            userLoginMethod: userData?.login_method_id || '',
            userStatus: userData?.status_id || '',
            userOrganisationName: userData?.org_id || '',
            userRoles: userData?.role_id || null,
            userBranch: userData?.branch_id || null,
            userManagerReportTo: userData?.manager_id || null,
            countryId: userData?.countryId || '',
            userNumber: userData?.user_number || '',
        };

        // Simulate delay and set data
        setTimeout(() => {
            setInitialValues(fetchedUserData);
        }, 1000);
    }, [userData]);

    const handleCancel = () => {
        navigate('/settings?tab=User+Management');
    };

    const handleFormSubmit = () => {
        if (formRef.current) {
            // Set all fields as touched to trigger validation
            formRef.current.setTouched(
                Object.keys(formRef.current.values).reduce((acc, key) => {
                    acc[key] = true;
                    return acc;
                }, {})
            );

            formRef.current.submitForm();
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        alert("User Updated.");

        const payload = {
            userFirstName: values?.userFirstName || '',
            userLastName: values?.userLastName || '',
            userEmail: values?.userEmail || '',
            userPhoneNumber: values?.userPhoneNumber || '',
            loginMethodId: values?.userLoginMethod || '',
            userStatus: values?.userStatus || '',
            orgId: values?.userOrganisationName || '',
            roleId: values?.userRoles || null,
            branchId: values?.userBranch || null,
            managerId: values?.userManagerReportTo,
            countryId: values?.countryId || '',
            userNumber: "user001",
        }

        try {
            const response = await updateUser(id, payload);
            console.log('User updated:', response.data);
            if (response?.data?.succeeded === true) {
                navigate("/settings?tab=User+Management")
            }
            // alert("Updated")
            // Optional: reset form or show toast
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };

    return (
        <div className="w-full">
            <div className="pb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img
                        src={LeftArrowIcon}
                        alt="FES Logo"
                        className="size-[24px] rounded-md cursor-pointer"
                        onClick={handleCancel}
                    />
                    <div className="flex items-center gap-2">
                        <h1
                            className="font-proxima font-bold text-[28px] leading-[140%] align-middle text-[#17222B]">
                            Edit user
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <CustomButton text="Cancel" variant="secondary" startIcon={false} endIcon={false} onClick={handleCancel} />
                    <CustomButton text="Update" startIcon={true} endIcon={false} iconImg={TickIcon} onClick={handleFormSubmit} />
                </div>
            </div>

            {initialValues && (
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}  // Needed to re-init values after API loads
                    // validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    innerRef={formRef}
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
                            {/* <ErrorObserver setTabErrors={setTabErrors} /> */}
                            {/* <div className="pb-2">
                            <div className="mb-4">
                                <div className="flex space-x-2">
                                    {tabs.map((tab) => (
                                        <div key={tab}>
                                            <CustomButton
                                                key={tab}
                                                text={tab}
                                                variant="chips"
                                                rounded="full"
                                                startIcon={false}
                                                endIcon={tabErrors[tab] || false}
                                                iconImg={tabErrors[tab] ? WarningIcon : undefined}
                                                onClick={() => setActiveTab(tab)}
                                                selected={activeTab === tab}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div> */}

                            {/* {(activeTab === 'All Info' || activeTab === 'Lead Information') && ( */}
                            <UserInformationForm
                                // userDetails={userData}
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
            )}
        </div>
    );
};

export default EditUserPage;