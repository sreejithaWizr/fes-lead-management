import * as Yup from 'yup';
import { optionalDropdown, requiredDropdown, requiredEmailField, requiredStringField, requiredTenDigitNumber } from '../../../utils/validationUtils';

export const userValidationSchema = Yup.object({
    userFirstName: requiredStringField(),
    userLastName: requiredStringField(),
    userEmail: requiredEmailField(),
    userPhoneNumber: requiredTenDigitNumber(),
    userLoginMethod: optionalDropdown(),
    userStatus: requiredDropdown(),
    userOrganisationName: requiredDropdown(),
    userRoles: requiredDropdown(),
    userBranch: requiredDropdown(),
    userManagerReportTo: requiredDropdown(),
    countryId: requiredDropdown(),
});