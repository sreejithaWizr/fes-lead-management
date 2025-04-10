import * as Yup from 'yup';

export const validationSchema = Yup.object({
  // Lead Information validation
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  secondaryEmail: Yup.string().email('Invalid email format').nullable(),
  mobileNumber: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits').required('Mobile number is required'),
  alternativeNumber: Yup.string().matches(/^[0-9]{10}$/, 'Alternative number must be exactly 10 digits').nullable(),
  whatsappNumber: Yup.string().matches(/^[0-9]{10}$/, 'WhatsApp number must be exactly 10 digits').nullable(),
  leadOwner: Yup.string().required("Lead Owner is required"),
  leadStatusInfo: Yup.string().required("Lead Status is required"),
  priority: Yup.string().required("Priority is required"),
  teleCallerName: Yup.string(),
  // leadCreated: Yup.date()
  //   .required('Lead creation date is required')
  //   // .max(new Date(), 'Lead creation date cannot be in the future')
  //   .typeError('Lead creation date must be a valid date'),


  // Education validation
  highestQualification: Yup.string().required('Highest Qualification is required'),
  graduationYear: Yup.string().required('Graduation year is required'),
  fieldOfStudy: Yup.string().required('Graduation year is required'),
  cgpaGrade: Yup.string(),


  // Lead Status validation
  leadStatus: Yup.string().required('Status is required'),
  category: Yup.string().required('Category is required'),
  subCategory: Yup.string().required('Subcategory is required'),
  branch: Yup.string().required('Branch is required'),
  counselor: Yup.string().required('Counselor is required'),
  // notes:Yup.string().required("Test validation"),

  // Lead Source validation
  leadSource_1: Yup.string().required('Required'),
  // leadSource_2: Yup.string(),
  // leadSource_3: Yup.string(),
  location_1: Yup.string().required('Required'),
  // location_2: Yup.string().required('Required'),
  // referrerName: Yup.string().required('Required'),
  // referrerEmployeeId: Yup.string().required('Required'),
  vertical: Yup.string().required('Required'),
  desiredProgram: Yup.string().required('Required'),
  // internshipOption: Yup.string().required('Required'),
  // adName: Yup.string().required('Required'),
  // adCampaign: Yup.string().required('Required'),
  // leadForm: Yup.string().required('Required'),
  // ipAddress: Yup.string().required('Required'),
});