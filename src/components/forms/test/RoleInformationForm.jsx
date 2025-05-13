// File: RoleInformationForm.js
import React from 'react';
import { Field } from 'formik';

const RoleInformationForm = ({ values, setFieldValue }) => {
  return (
    <div style={{ marginBottom: 30 }}>
      <h3>Roles Information</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div>
          <label>Role Number*</label>
          <Field name="roleNumber" placeholder="Value" />
        </div>
        <div>
          <label>Role Type*</label>
          <Field name="roleType" as="select">
            <option value="">Select</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </Field>
        </div>
        <div>
          <label>Parent Role*</label>
          <Field name="parentRole" as="select">
            <option value="">Select</option>
            <option value="Admin">Admin</option>
            <option value="Team Lead">Team Lead</option>
          </Field>
        </div>
        <div>
          <label>Copy Role Template</label>
          <Field name="copyRoleTemplate" as="select">
            <option value="">Select</option>
          </Field>
        </div>
        <div>
          <label>Insertion Mode*</label>
          <Field name="insertionMode" as="select">
            <option value="">Select</option>
            <option value="Manual">Manual</option>
          </Field>
        </div>
        <div>
          <label>Organisation*</label>
          <Field name="organisation" as="select">
            <option value="">Select</option>
          </Field>
        </div>
        <div>
          <label>Hierarchy Level*</label>
          <Field name="hierarchyLevel" as="select">
            <option value="">Select</option>
          </Field>
        </div>
        <div>
          <label>Description</label>
          <Field name="description" placeholder="Type here" />
        </div>
      </div>
    </div>
  );
};

export default RoleInformationForm;
