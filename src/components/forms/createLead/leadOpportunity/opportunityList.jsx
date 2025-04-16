import React, { useState } from 'react';
import { CustomButton, CustomInputField, CustomDropDown } from "react-mui-tailwind";
import EditIcon from '../../../../assets/edit.svg';
import EditOpportunityRow from './opportunityEdit';

const labelStyle = {
  fontSize: '11px',
  fontWeight: 700,
  color: '#858585',
};

const valueStyle = {
  fontSize: '16px',
  fontWeight: 700,
  color: '#17222B',
};

const LeadOpportunity = ({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const apiJson = [
    {
      countryName: "Canada",
      opportunityID: "ID001",
      owner: "Riyaz",
      intake: "2025",
      opportunityStatus: "Ready for Counsellor",
      opportunityCategory: "Interested",
      opportunitySubCatergory: "Contacted",
    },
    {
      countryName: "England",
      opportunityID: "ID002",
      owner: "Revathy",
      intake: "2025",
      opportunityStatus: "Inprogress",
      opportunityCategory: "Interested",
      opportunitySubCatergory: "Contacted",
    },
    {
      countryName: "Germany",
      opportunityID: "ID003",
      owner: "Adam John",
      intake: "2025",
      opportunityStatus: "Ready for Counsellor",
      opportunityCategory: "Interested",
      opportunitySubCatergory: "Contacted",
    }
  ];

  const getStatusColor = (status) => {
    if (status === "Ready for Counsellor") return "#14AE5C";
    if (status === "Inprogress") return "#FF8400";
    return "#17222B";
  };

  const handleEditClick = (data) => {
    setEditingId(data.opportunityID);
    setFormData({ ...data });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = (updatedData) => {
    console.log('Update payload:', formData, updatedData);
    // call API here
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  console.log("formData", formData)

  return (
    <div className="form-section animate-fade-in ml-0 mb-6">
      <h2 className="font-bold text-[19px] leading-[140%] tracking-[0%] text-[#17222B] font-[Proxima Nova] mb-4">
        Lead Opportunity
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {apiJson?.map((data) => {
          const isEditing = editingId === data.opportunityID;

          if (isEditing) {
            return (
              <EditOpportunityRow
                key={data.opportunityID}
                data={data}
                onCancel={handleCancel}
                onUpdate={handleUpdate}
              />
            );
          }

          return (
            <div
              key={data?.opportunityID}
              style={{
                display: 'grid',
                gridTemplateColumns: '0.9fr 0.9fr 1.1fr 0.6fr 1.2fr 1.2fr 1.2fr 0.6fr',
                gap: '16px',
                alignItems: 'start',
                padding: '16px',
                border: '1px solid #CBDBE4',
                borderRadius: '12px',
              }}
            >
              <div>
                <label style={labelStyle}>Country</label>
                <div style={valueStyle}>{data?.countryName}</div>
              </div>

              <div>
                <label style={labelStyle}>Opportunity ID</label>
                <div style={valueStyle}>{data?.opportunityID}</div>
              </div>

              <div>
                <label style={labelStyle}>Owner</label>
                <div style={valueStyle}>{data?.owner}</div>
              </div>

              <div>
                <label style={labelStyle}>Intake</label>
                <div style={valueStyle}>{data?.intake}</div>
              </div>

              <div>
                <label style={labelStyle}>Opportunity Status</label>
                <div style={{ ...valueStyle, color: getStatusColor(data?.opportunityStatus) }}>
                  {data?.opportunityStatus}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Opportunity Category</label>
                <div style={{ ...valueStyle, color: '#14AE5C' }}>{data?.opportunityCategory}</div>
              </div>

              <div>
                <label style={labelStyle}>Opportunity Sub Category</label>
                <div style={{ ...valueStyle, color: '#14AE5C' }}>{data?.opportunitySubCatergory}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', height: '100%' }}>
                <CustomButton
                  variant="icon"
                  iconImg={EditIcon}
                  endIcon={false}
                  showText={false}
                  onClick={() => handleEditClick(data)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadOpportunity;
