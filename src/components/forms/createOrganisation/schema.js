import * as Yup from 'yup';
import { optionalDropdown, optionalEmailField, optionalTenDigitNumber, requiredBooleanTrue, requiredDropdown, requiredEmailField, requiredMultiSelect, requiredStringField, requiredTenDigitNumber } from '../../../utils/validationUtils';

export const validationSchema = Yup.object({
  orgName: requiredStringField(),
  type: requiredStringField(),
  region: requiredDropdown(),
  business_mail: optionalEmailField(),
  mobileNumber: requiredTenDigitNumber(),
  admin_mail: requiredEmailField(),
  parent_org: requiredStringField(),
  service_enabled: requiredMultiSelect(),

  // Business Information
  gst_no: requiredStringField(),
  primary_poc: requiredTenDigitNumber(),
  poc_mail: requiredEmailField(),

  // Account Information
  add_account_info: Yup.array().of(
    Yup.object({
      name: requiredStringField(),
      account_id: requiredStringField(),
    })
  ),  

});