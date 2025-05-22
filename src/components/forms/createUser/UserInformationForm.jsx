import React, { useEffect, useState } from 'react';
import { CustomInputField, CustomDropDown } from "react-mui-tailwind";
// import { data } from 'autoprefixer';
// import EditableFieldWrapper from '../../../utils/EditableFieldWrapper';
import { getFESManager, getLoginMethod, getOrganisation, getUserRole, getBranch, getStatus, getCountry } from '../../../api/services/masterAPIs/createUserApi';

const UserInformationForm = ({ values, errors, touched, handleChange, handleBlur, setFieldValue, mode }) => {

    const isCreateMode = mode === "create";

    const [loginMethodOptions, setLoginMethodOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [organisationOptions, setOrganisationOptions] = useState([]);
    const [userRoleOptions, setUserRoleOptions] = useState([]);
    const [branchOptions, setBranchOptions] = useState([]);
    const [managerOptions, setManagerOptions] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [loginResult, statusResult, orgResult, userRoleResult, branchResult, managerResult, countryResult] = await Promise.allSettled([
                    getLoginMethod(),
                    getStatus(),
                    getOrganisation(),
                    getUserRole(),
                    getBranch(),
                    getFESManager(),
                    getCountry(),
                ]);

                setLoginMethodOptions(loginResult?.value?.data?.data || []);
                setStatusOptions(statusResult?.value?.data?.data || []);
                setOrganisationOptions(orgResult?.value?.data?.data || []);
                setUserRoleOptions(userRoleResult?.value?.data?.data || []);
                setBranchOptions(branchResult?.value?.data?.data || []);
                setManagerOptions(managerResult?.value?.data?.data || []);
                setCountryOptions(countryResult?.value?.data?.data || []);
            } catch (err) {
                console.error('Error loading dropdown data:', err);
            }
        };

        fetchDropdownData();
    }, []);

    return (
        <div className="form-section animate-fade-in ml-0 mb-6">
            <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
                User Information
            </h2>
            <div className="form-grid">
                <div className="form-field flex flex-row items-start">
                    <CustomInputField
                        // state={isEditable || isCreateMode ? "default" : "non-editable"}
                        label="First Name"
                        value={values?.userFirstName}
                        onChange={(value) => {
                            setFieldValue('userFirstName', value.target.value)
                        }}
                        onBlur={handleBlur}
                        placeholder="Enter first name"
                        hasError={touched.userFirstName && Boolean(errors.userFirstName)}
                        error={touched.userFirstName && errors.userFirstName}
                        className="w-full max-w-[calc(100%-40px)]"
                    />
                    {/* )}
          </EditableFieldWrapper> */}
                </div>

                <div className="form-field">
                    <CustomInputField
                        // state={isEditable || isCreateMode ? "default" : "non-editable"}
                        label="Last Name"
                        value={values?.userLastName}
                        onChange={(value) => {
                            setFieldValue('userLastName', value.target.value)
                        }}
                        placeholder="Enter last name"
                        onBlur={handleBlur}
                        hasError={touched.userLastName && Boolean(errors.userLastName)}
                        error={touched.userLastName && errors.userLastName}
                    />
                </div>

                <div className="form-field">
                    <CustomInputField
                        // state={isEditable || isCreateMode ? "default" : "non-editable"}
                        label="Email"
                        value={values?.userEmail}
                        onChange={(value) => {
                            setFieldValue('userEmail', value.target.value)
                        }}
                        placeholder="Enter email"
                        onBlur={handleBlur}
                        hasError={touched.userEmail && Boolean(errors.userEmail)}
                        error={touched.userEmail && errors.userEmail}
                    />
                </div>

                <div className="form-field">
                    <CustomInputField
                        // state={isEditable || isCreateMode ? "default" : "non-editable"}
                        label="Phone Number"
                        value={values?.userPhoneNumber}
                        showAsterisk={true}
                        onChange={(value) => {
                            setFieldValue('userPhoneNumber', value.target.value)
                        }}
                        placeholder="Enter phone number"
                        onBlur={handleBlur}
                        hasError={touched.userPhoneNumber && Boolean(errors.userPhoneNumber)}
                        error={touched.userPhoneNumber && errors.userPhoneNumber}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Login Method"
                        options={loginMethodOptions}
                        required={false}
                        placeHolder="Select"
                        value={loginMethodOptions?.find(option => option.id === values?.userLoginMethod) || ""}
                        // disabled={!isEditable && !isCreateMode}
                        onChange={(value) => {
                            // setFieldValue('priority', value.target.value);
                            // setSelectedPriorityOption(value?.target?.value);   // update local selected object
                            setFieldValue('userLoginMethod', value?.target?.value?.id); // update formik value
                        }}
                        onBlur={() => handleBlur({ target: { name: 'userLoginMethod' } })}
                        hasError={touched.userLoginMethod && Boolean(errors.userLoginMethod)}
                        errorMessage={touched.userLoginMethod && errors.userLoginMethod}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Status"
                        options={statusOptions}
                        required={true}
                        placeHolder="Select"
                        value={statusOptions?.find(option => option.id === values?.userStatus) || ""}
                        // value={isEditable ? selectedPriorityOption : (statusOptions?.find(option => option.id === values.priority) || "")}
                        // disabled={!isEditable && !isCreateMode}
                        onChange={(value) => {
                            // setFieldValue('priority', value.target.value);
                            // setSelectedPriorityOption(value?.target?.value);   // update local selected object
                            setFieldValue('userStatus', value?.target?.value?.id); // update formik value
                        }}
                        onBlur={() => handleBlur({ target: { name: 'userStatus' } })}
                        hasError={touched.userStatus && Boolean(errors.userStatus)}
                        errorMessage={touched.userStatus && errors.userStatus}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Organisation Name"
                        options={organisationOptions}
                        required={true}
                        placeHolder="Select"
                        value={organisationOptions?.find(option => option?.id === values?.userOrganisationName) || ""}
                        // value={isEditable ? selectedPriorityOption : (organisationOptions?.find(option => option.id === values.priority) || "")}
                        // disabled={!isEditable && !isCreateMode}
                        onChange={(value) => {
                            // setFieldValue('priority', value.target.value);
                            // setSelectedPriorityOption(value?.target?.value);   // update local selected object
                            setFieldValue('userOrganisationName', value?.target?.value?.id); // update formik value
                        }}
                        onBlur={() => handleBlur({ target: { name: 'userOrganisationName' } })}
                        hasError={touched.userOrganisationName && Boolean(errors.userOrganisationName)}
                        errorMessage={touched.userOrganisationName && errors.userOrganisationName}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Roles"
                        options={userRoleOptions}
                        required={true}
                        placeHolder="Select"
                        value={userRoleOptions?.find(option => option.id === values?.userRoles) || ""}
                        // value={isEditable ? selectedPriorityOption : (userRoleOptions?.find(option => option.id === values.priority) || "")}
                        // disabled={!isEditable && !isCreateMode}
                        onChange={(value) => {
                            // setFieldValue('priority', value.target.value);
                            // setSelectedPriorityOption(value?.target?.value);   // update local selected object
                            setFieldValue('userRoles', value?.target?.value?.id); // update formik value
                        }}
                        onBlur={() => handleBlur({ target: { name: 'userRoles' } })}
                        hasError={touched.userRoles && Boolean(errors.userRoles)}
                        errorMessage={touched.userRoles && errors.userRoles}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Branch"
                        options={branchOptions}
                        required={true}
                        placeHolder="Select"
                        value={branchOptions?.find(option => option.id === values?.userBranch) || ""}
                        // disabled={!isEditable && !isCreateMode}
                        onChange={(value) => {
                            setFieldValue('userBranch', value.target.value?.id);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'userBranch' } })}
                        hasError={touched.userBranch && Boolean(errors.userBranch)}
                        errorMessage={touched.userBranch && errors.userBranch}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Manager Reporting To"
                        options={managerOptions}
                        required={true}
                        placeHolder="Select"
                        value={managerOptions?.find(option => option.id === values?.userManagerReportTo) || ""}
                        // disabled={!isEditable && !isCreateMode}
                        onChange={(value) => {
                            setFieldValue('userManagerReportTo', value.target.value?.id);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'userManagerReportTo' } })}
                        hasError={touched.userManagerReportTo && Boolean(errors.userManagerReportTo)}
                        errorMessage={touched.userManagerReportTo && errors.userManagerReportTo}
                    />
                </div>

                <div className="form-field">
                    <CustomDropDown
                        label="Country Specialization"
                        options={countryOptions}
                        required={true}
                        placeHolder="Select"
                        value={countryOptions?.find(option => option.id === values?.countryId) || ""}
                        // disabled={!isEditable && !isCreateMode}
                        onChange={(value) => {
                            setFieldValue('countryId', value.target.value?.id);
                        }}
                        onBlur={() => handleBlur({ target: { name: 'countryId' } })}
                        hasError={touched.countryId && Boolean(errors.countryId)}
                        errorMessage={touched.countryId && errors.countryId}
                    />
                </div>

                {!isCreateMode && (
                    <div className="form-field">
                        <CustomInputField
                            // state={isEditable || isCreateMode ? "default" : "non-editable"}
                            label="User ID"
                            value={values?.userNumber}
                            showAsterisk={false}
                            onChange={(value) => {
                                setFieldValue('userNumber', value.target.value)
                            }}
                            placeholder="Enter contact center ID"
                            onBlur={handleBlur}
                            hasError={touched.userNumber && Boolean(errors.userNumber)}
                            error={touched.userNumber && errors.userNumber}
                        />
                    </div>
                )
                }
            </div>
        </div>
    );
};

export default UserInformationForm;