import * as Yup from 'yup';
import { optionalDropdown, optionalEmailField, optionalTenDigitNumber, requiredBooleanTrue, requiredDropdown, requiredEmailField, requiredMultiSelect, requiredStringField, requiredTenDigitNumber } from '../../../utils/validationUtils';

export const validationSchema = Yup.object({
  // Lead Information validation
  firstName: requiredStringField(),
  lastName: requiredStringField(),
  email: requiredEmailField(),
  secondaryEmail: optionalEmailField(),
  mobileNumber: requiredTenDigitNumber(),
  alternativeNumber: optionalTenDigitNumber(),
  whatsappNumber:optionalTenDigitNumber(),
  // leadOwner: requiredDropdown(),
  // leadStatusInfo: requiredDropdown(),
  priority: requiredDropdown(),
  teleCallerName: optionalDropdown(),
  agreeToReceiveBoolean: requiredBooleanTrue() ,
  // leadCreated: Yup.date()
  //   .required('Lead creation date is required')
  //   // .max(new Date(), 'Lead creation date cannot be in the future')
  //   .typeError('Lead creation date must be a valid date'),


  // Education validation
  highestQualification: requiredDropdown(),
  graduationYear: requiredDropdown(),
  fieldOfStudy: requiredDropdown(),
  cgpaGrade: Yup.string(),
  preferredDestination:requiredMultiSelect(),


  // Lead Status validation
  leadStatus: requiredDropdown(),
  category: requiredDropdown(),
  subCategory: requiredDropdown(),
  branch: requiredDropdown(),
  // counselor: requiredDropdown(),
  // notes:Yup.string().required("Test validation"),

  // Lead Source validation
  leadSource_1: requiredDropdown(),
  // leadSource_2: Yup.string(),
  // leadSource_3: Yup.string(),
  location_1: requiredDropdown(),
  // location_2: Yup.string().required('Required'),
  // referrerName: Yup.string().required('Required'),
  // referrerEmployeeId: Yup.string().required('Required'),
  // vertical: requiredDropdown(),
  // desiredProgram: requiredDropdown(),
  // internshipOption: Yup.string().required('Required'),
  // adName: Yup.string().required('Required'),
  // adCampaign: Yup.string().required('Required'),
  // leadForm: Yup.string().required('Required'),
  // ipAddress: Yup.string().required('Required'),
});