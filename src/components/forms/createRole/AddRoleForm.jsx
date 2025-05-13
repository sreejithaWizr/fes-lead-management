import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import RoleAccessTabs from './RoleAccessTab';

const roleSchema = Yup.object().shape({
  roleName: Yup.string().required('Required'),
  roleType: Yup.string().required('Required'),
  insertionMode: Yup.string().required('Required'),
  organisation: Yup.string().required('Required'),
  parentRole: Yup.string().required('Required'),
  childRole: Yup.string().required('Required'),
  description: Yup.string()
});

const AddRoleForm = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 to-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add new role</h2>

      <Formik
        initialValues={{
          roleName: '',
          roleType: '',
          insertionMode: '',
          organisation: '',
          parentRole: '',
          childRole: '',
          description: ''
        }}
        validationSchema={roleSchema}
        onSubmit={(values) => {
          console.log('Form submitted:', values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            {/* Roles Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Role Name', name: 'roleName', type: 'text' },
                { label: 'Role Type', name: 'roleType', type: 'select' },
                { label: 'Insertion Mode', name: 'insertionMode', type: 'select' },
                { label: 'Organisation', name: 'organisation', type: 'select' },
                { label: 'Parent Role', name: 'parentRole', type: 'select' },
                { label: 'Child Role', name: 'childRole', type: 'select' }
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block font-medium">{label}</label>
                  {type === 'select' ? (
                    <Field as="select" name={name} className="mt-1 w-full border p-2 rounded">
                      <option value="">Select</option>
                      <option value="option1">Option 1</option>
                    </Field>
                  ) : (
                    <Field name={name} type="text" className="mt-1 w-full border p-2 rounded" />
                  )}
                  {errors[name] && touched[name] && (
                    <div className="text-red-500 text-sm">{errors[name]}</div>
                  )}
                </div>
              ))}
              {/* Description */}
              <div className="md:col-span-3">
                <label className="block font-medium">Description</label>
                <Field as="textarea" name="description" className="mt-1 w-full border p-2 rounded" />
              </div>
            </div>

            {/* Role Access */}
            <RoleAccessTabs />

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button type="button" className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRoleForm;
