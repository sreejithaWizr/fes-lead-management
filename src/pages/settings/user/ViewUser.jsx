import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import UserInformationForm from '../../../components/forms/createUser/UserInformationForm';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomButton } from 'react-mui-tailwind';
import LeftArrowIcon from "../../../assets/arrow-left.svg";
import EditIcon from "../../../assets/edit-icon.svg";
import MailIcon from "../../../assets/sms.svg";
import PhoneIcon from "../../../assets/phone-icon.svg";
import { getUserById } from '../../../api/services/settingsAPI/userAPI';
import { getStatus } from '../../../api/services/masterAPIs/createUserApi';

export const formRef = React.createRef();

const ViewUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [initialValues, setInitialValues] = useState(null);
    const [statusOptions, setStatusOptions] = useState([]);

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

    // get the status of the user
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await getStatus();
                setStatusOptions(response?.data?.data || []);
            } catch (err) {
                console.error("Error fetching status options:", err);
            }
        };

        fetchStatus();
    }, []);

    const userStatusLabel = statusOptions.find(status => status.id === userData?.status_id)?.name || '';

    const userDetails = {
        initials: `${userData?.first_name?.charAt(0) || ''}${userData?.last_name?.charAt(0) || ''}`,
        name: `${userData?.first_name} ${userData?.last_name}`,
        status: userStatusLabel,
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

    const handleEdit = (userData) => {
        navigate(`/users/edit/${id}`);
    };

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <img
                        src={LeftArrowIcon}
                        alt="Back"
                        className="w-6 h-6 cursor-pointer"
                        onClick={handleCancel}
                    />
                    <h1 className="text-2xl font-bold text-[#17222B]">User Details</h1>
                </div>
                <div className='flex items-center gap-4'>
                    <CustomButton
                        text="Edit"
                        variant="secondary"
                        iconImg={EditIcon}
                        endIcon={false}
                        onClick={() => handleEdit(userData)}
                    />
                </div>
            </div>

            {/* Top Card: Avatar + Basic Info */}
            <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-[#030229B2] text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {userDetails?.initials}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-[#17222B]">{userDetails?.name}</h2>
                        {userStatusLabel === "Active" && (
                            <span className="bg-[#E6F4EE] text-[#14AE5C] text-xs font-semibold px-3 py-1 rounded-full border border-[#B6E3CE]">
                                Active
                            </span>
                        )}
                        {userStatusLabel === "Inactive" && (
                            <span className="bg-[#FFF3E6] text-[#FF8400] text-xs font-semibold px-3 py-1 rounded-full border border-[#FFB86B]">
                                Inactive
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                        <span className="flex items-center gap-1">
                            <img src={MailIcon} className="w-4 h-4" alt="Email" />
                            {userDetails?.email}
                        </span>
                        <span className="flex items-center gap-1">
                            <img src={PhoneIcon} className="w-4 h-4" alt="Phone" />
                            {userDetails?.phone}
                        </span>
                    </div>
                </div>
            </div>

            <Formik
                initialValues={initialValues}
                innerRef={formRef}
                enableReinitialize={true}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                }) => (
                    <form>
                        <UserInformationForm
                            values={initialValues}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            setFieldValue={setFieldValue}
                            mode='view'
                        />
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default ViewUserPage;