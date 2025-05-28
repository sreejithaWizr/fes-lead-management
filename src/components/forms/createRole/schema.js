import * as Yup from "yup";
import {
  optionalDropdown,
  requiredDropdown,
  requiredStringField,
} from "../../../utils/validationUtils";

export const roleSchemaValidations = Yup.object().shape({
  roleName: requiredStringField().max(50, "Maximum 50 characters"),
  roleType: requiredDropdown(),
  parentRole:  requiredDropdown(),
  copyRoleTemplte: optionalDropdown(),
  insertionMode: requiredDropdown(),
  organisation:  requiredDropdown(),
  hierarchyLevel:  requiredDropdown(),
  description: Yup.string(),
});

// export const roleSchemaValidations = Yup.object().shape({
//   roleName: Yup.string().required("Required"),
//   roleType: Yup.string().required("Required"),
//   parentRole: Yup.string().required("Required"),
//   copyRoleTemplte: Yup.string(),
//   insertionMode: Yup.string().required("Required"),
//   organisation: Yup.string().required("Required"),
//   hierarchyLevel: Yup.string().required("Required"),
//   description: Yup.string(),
// });
